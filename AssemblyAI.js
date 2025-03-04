const formElements = {
    name: document.getElementById('name'),
    email: document.getElementById('email'),
    phone: document.getElementById('phone'),
    service: document.getElementById('service'),
    satisfaction: document.getElementById('satisfaction'),
    recommend: document.getElementById('recommend'),
    comments: document.getElementById('comments')
};

// DOM elements
const startBtn = document.getElementById('startBtn');
const stopBtn = document.getElementById('stopBtn');
const resetBtn = document.getElementById('resetBtn');
const submitBtn = document.getElementById('submitBtn');
const status = document.getElementById('status');
const transcriptBox = document.getElementById('transcriptBox');
const interimText = document.getElementById('interimText');
const completionProgress = document.getElementById('completionProgress');
const completionText = document.getElementById('completionText');
const satisfactionMeter = document.getElementById('satisfactionMeter');
const recommendMeter = document.getElementById('recommendMeter');
const satisfactionValue = document.getElementById('satisfactionValue');
const recommendValue = document.getElementById('recommendValue');
const jsonPreview = document.getElementById('jsonPreview');
const apiKeyInput = document.getElementById('apiKeyInput');
const saveApiKeyBtn = document.getElementById('saveApiKey');
const systemMessage = document.getElementById('systemMessage');
const aiStatusIndicator = document.getElementById('aiStatusIndicator');
const aiStatusText = document.getElementById('aiStatusText');

let apiKey = localStorage.getItem('assemblyAI_api_key') || '';
let socket = null;
let mediaRecorder = null;
let audioContext = null;
let audioStream = null;
let isRecording = false;
let silenceTimer = null;
let silenceCount = 0;
const SILENCE_THRESHOLD = 5;

// Accumulated transcript for AI processing
let accumulatedTranscript = '';

// Check if API key is already saved
if (apiKey) {
    apiKeyInput.value = apiKey;
    startBtn.disabled = false;
    status.textContent = 'Status: Ready to listen';
    showSystemMessage('API key loaded from storage', 'success');
}

// Save API key
saveApiKeyBtn.addEventListener('click', function () {
    apiKey = apiKeyInput.value.trim();

    if (apiKey) {
        localStorage.setItem('assemblyAI_api_key', apiKey);
        startBtn.disabled = false;
        status.textContent = 'Status: Ready to listen';
        showSystemMessage('API key saved', 'success');
    } else {
        showSystemMessage('Please enter a valid API key', 'error');
    }
});

// Function to show system messages
function showSystemMessage(message, type = 'success') {
    systemMessage.textContent = message;
    systemMessage.style.display = 'block';

    if (type === 'error') {
        systemMessage.classList.add('error');
    } else {
        systemMessage.classList.remove('error');
    }

    // Auto-hide after 5 seconds
    setTimeout(() => {
        systemMessage.style.display = 'none';
    }, 5000);
}

// Initialize WebSocket connection to AssemblyAI
function initializeWebSocket() {
    if (socket) {
        socket.close();
        socket = null;
    }

    // Create a new WebSocket connection
    socket = new WebSocket(`wss://api.assemblyai.com/v2/realtime/ws?sample_rate=16000`);

    // Connection opened
    socket.onopen = function (event) {
        socket.send(JSON.stringify({
            token: apiKey,
            expires_in: 3600
        }));
        status.textContent = 'Status: Connected to speech recognition service';
    };

    // Listen for messages
    socket.onmessage = function (event) {
        const result = JSON.parse(event.data);

        if (result.message_type === 'SessionBegins') {
            status.textContent = 'Status: Session started, speak now...';
            resetSilenceTimer();
        } else if (result.message_type === 'PartialTranscript') {
            interimText.textContent = result.text || '';
        } else if (result.message_type === 'FinalTranscript') {
            if (result.text && result.text.trim()) {
                transcriptBox.innerHTML += '<p>' + result.text + '</p>';
                transcriptBox.scrollTop = transcriptBox.scrollHeight;

                // Add to accumulated transcript for better context
                accumulatedTranscript += ' ' + result.text;

                // Process with AI agent
                processWithAI(result.text, accumulatedTranscript);

                resetSilenceTimer();
            }
        } else if (result.message_type === 'Error') {
            console.error('AssemblyAI Error:', result);
            status.textContent = 'Error: ' + (result.error || 'Unknown error');
            showSystemMessage('Speech recognition error: ' + (result.error || 'Unknown error'), 'error');
        }
    };

    // Handle errors
    socket.onerror = function (error) {
        console.error('WebSocket Error:', error);
        status.textContent = 'Connection error with speech service';
        showSystemMessage('Connection error with speech service', 'error');
    };

    // Connection closed
    socket.onclose = function (event) {
        status.textContent = 'Status: Connection closed';
        if (event.code !== 1000) {
            showSystemMessage('Connection closed unexpectedly. Code: ' + event.code, 'error');
        }
    };
}

// Start recording and streaming audio
async function startRecording() {
    try {
        // Get audio stream
        audioStream = await navigator.mediaDevices.getUserMedia({ audio: true });

        // Initialize WebSocket
        initializeWebSocket();

        // Create audio context
        audioContext = new (window.AudioContext || window.webkitAudioContext)();

        // Create media recorder
        mediaRecorder = new MediaRecorder(audioStream);

        // Set up audio processing
        const source = audioContext.createMediaStreamSource(audioStream);
        const processor = audioContext.createScriptProcessor(4096, 1, 1);

        source.connect(processor);
        processor.connect(audioContext.destination);

        processor.onaudioprocess = function (e) {
            // Only send audio if connection is established and recording is active
            if (socket && socket.readyState === WebSocket.OPEN && isRecording) {
                // Downsample to 16kHz (AssemblyAI expects 16kHz)
                const inputData = e.inputBuffer.getChannelData(0);

                // Convert to 16-bit PCM
                const pcmData = convertFloatTo16BitPCM(inputData);

                // Send audio data
                if (socket.readyState === WebSocket.OPEN) {
                    socket.send(pcmData);
                }
            }
        };

        // Start recording
        mediaRecorder.start();
        isRecording = true;
        status.textContent = 'Status: Recording...';
        startBtn.disabled = true;
        stopBtn.disabled = false;
        silenceCount = 0;
        accumulatedTranscript = '';

    } catch (error) {
        console.error('Error starting recording:', error);
        status.textContent = 'Error: Could not access microphone';
        showSystemMessage('Could not access microphone. ' + error.message, 'error');
    }
}

// Convert audio data to the format expected by AssemblyAI
function convertFloatTo16BitPCM(float32Array) {
    const output = new Int16Array(float32Array.length);
    for (let i = 0; i < float32Array.length; i++) {
        const s = Math.max(-1, Math.min(1, float32Array[i]));
        output[i] = s < 0 ? s * 0x8000 : s * 0x7FFF;
    }
    return output.buffer;
}

// Stop recording
function stopRecording() {
    if (isRecording) {
        isRecording = false;

        if (mediaRecorder) {
            mediaRecorder.stop();
        }

        if (audioStream) {
            audioStream.getTracks().forEach(track => track.stop());
        }

        if (socket && socket.readyState === WebSocket.OPEN) {
            socket.send(JSON.stringify({ terminate_session: true }));
            socket.close();
        }

        status.textContent = 'Status: Recording stopped';
        startBtn.disabled = false;
        stopBtn.disabled = true;

        // If auto-stop due to silence, submit the form
        if (silenceCount >= SILENCE_THRESHOLD) {
            status.textContent = 'Status: Auto-submitting after silence detection';
            submitForm();
        }
    }
}

// Process transcript with AI to determine form fields
async function processWithAI(transcript, fullContext) {
    // Indicate AI is processing
    aiStatusIndicator.classList.add('active');
    aiStatusText.textContent = 'AI Assistant: Processing...';

    try {
        // In a real application, you would call an AI service API here
        // This is a simplified example that simulates AI processing

        // Simple rule-based processing for demonstration purposes
        // In a real application, you would use a more sophisticated NLP approach
        processTranscript(transcript);

        // Simulate a more intelligent processing using the accumulated context
        simulateAIProcessing(fullContext);

        // Update the form visualization
        updateVisualization();

        // Reset AI status
        setTimeout(() => {
            aiStatusIndicator.classList.remove('active');
            aiStatusText.textContent = 'AI Assistant: Ready';
        }, 1000);

    } catch (error) {
        console.error('AI processing error:', error);
        aiStatusIndicator.classList.remove('active');
        aiStatusText.textContent = 'AI Assistant: Error processing';
        showSystemMessage('Error during AI processing: ' + error.message, 'error');
    }
}

// Simulated AI processing
function simulateAIProcessing(context) {
    // This function simulates what a real AI model like GPT or Claude would do
    // In a real implementation, you would make API calls to those services

    // Email extraction with more sophisticated pattern recognition
    if (!formElements.email.value) {
        const emailPattern = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/i;
        const match = context.match(emailPattern);
        if (match) {
            highlightField('email');
            formElements.email.value = match[0];
        }
    }

    // Try to extract a name if not already filled
    if (!formElements.name.value) {
        // Look for patterns like "I am [name]" or "my name is [name]"
        const namePatterns = [
            /my name is (\w+\s+\w+)/i,
            /I am (\w+\s+\w+)/i,
            /I'm (\w+\s+\w+)/i,
            /call me (\w+\s+\w+)/i
        ];

        for (const pattern of namePatterns) {
            const match = context.match(pattern);
            if (match && match[1]) {
                highlightField('name');
                formElements.name.value = match[1];
                break;
            }
        }
    }

    // Service inference based on context
    if (!formElements.service.value) {
        const serviceKeywords = {
            'consultation': ['consult', 'advice', 'guidance', 'meeting', 'discuss'],
            'installation': ['install', 'setup', 'configured', 'deployed', 'set up'],
            'repair': ['repair', 'fix', 'broken', 'damaged', 'not working'],
            'support': ['support', 'help', 'assistance', 'troubleshoot'],
            'training': ['train', 'learn', 'taught', 'education', 'class']
        };

        // Count keyword matches for each service
        const scores = {};
        for (const [service, keywords] of Object.entries(serviceKeywords)) {
            scores[service] = 0;
            for (const keyword of keywords) {
                const regex = new RegExp('\\b' + keyword + '\\b', 'i');
                if (regex.test(context)) {
                    scores[service]++;
                }
            }
        }

        // Find service with highest score
        let bestService = '';
        let highestScore = 0;
        for (const [service, score] of Object.entries(scores)) {
            if (score > highestScore) {
                highestScore = score;
                bestService = service;
            }
        }

        // Set service if we have a clear winner
        if (bestService && highestScore > 1) {
            highlightField('service');
            formElements.service.value = bestService;
        }
    }

    // Sentiment analysis for satisfaction and recommendation
    if (!formElements.satisfaction.value || !formElements.recommend.value) {
        const positiveWords = ['great', 'excellent', 'amazing', 'good', 'fantastic', 'helpful', 'satisfied', 'happy', 'pleased'];
        const negativeWords = ['bad', 'poor', 'terrible', 'awful', 'unhappy', 'disappointed', 'frustrating', 'useless'];

        let positiveCount = 0;
        let negativeCount = 0;

        // Count positive and negative words
        for (const word of positiveWords) {
            const regex = new RegExp('\\b' + word + '\\b', 'i');
            const matches = context.match(new RegExp(regex, 'g'));
            if (matches) {
                positiveCount += matches.length;
            }
        }

        for (const word of negativeWords) {
            const regex = new RegExp('\\b' + word + '\\b', 'i');
            const matches = context.match(new RegExp(regex, 'g'));
            if (matches) {
                negativeCount += matches.length;
            }
        }

        // Calculate sentiment score (1-5)
        let sentimentScore = 3; // Neutral starting point

        if (positiveCount > 0 || negativeCount > 0) {
            // Calculate weighted score
            const total = positiveCount + negativeCount;
            const ratio = (positiveCount / total) || 0;

            // Convert to 1-5 scale
            sentimentScore = Math.round(1 + ratio * 4);
        }

        // Set values if not already set
        if (!formElements.satisfaction.value) {
            highlightField('satisfaction');
            formElements.satisfaction.value = sentimentScore;
            satisfactionMeter.value = sentimentScore;
            satisfactionValue.textContent = sentimentScore;
        }

        if (!formElements.recommend.value) {
            // Recommendation usually correlates with satisfaction
            const recommendScore = Math.max(1, Math.min(5, sentimentScore + (Math.random() > 0.5 ? 0 : (Math.random() > 0.5 ? 1 : -1))));

            highlightField('recommend');
            formElements.recommend.value = recommendScore;
            recommendMeter.value = recommendScore;
            recommendValue.textContent = recommendScore;
        }
    }
}

// Basic transcript processing (similar to original implementation)
function processTranscript(transcript) {
    const text = transcript.toLowerCase();

    // Form fields and their corresponding keywords/phrases for speech recognition
    const formFields = {
        'name': ['name', 'name is', 'my name is', 'call me', 'I am'],
        'email': ['email', 'email is', 'my email is', 'contact me at', 'reach me at', '@'],
        'phone': ['phone', 'phone is', 'my phone is', 'phone number', 'my number is', 'call me at'],
        'service': {
            'consultation': ['consultation', 'consulting', 'consultant'],
            'installation': ['installation', 'install', 'setup', 'set up'],
            'repair': ['repair', 'fixed', 'repaired'],
            'support': ['support', 'technical support', 'tech support', 'helped me'],
            'training': ['training', 'trained', 'teaching', 'learned']
        },
        'satisfaction': ['satisfaction', 'satisfied', 'rate', 'give', 'score'],
        'recommend': ['recommend', 'recommendation', 'refer', 'suggestion', 'likely to recommend'],
        'comments': ['comment', 'feedback', 'say', 'suggest', 'additional', 'like to add']
    };

    // Process name
    for (const keyword of formFields.name) {
        if (text.includes(keyword)) {
            const index = text.indexOf(keyword) + keyword.length;
            let name = transcript.slice(index).trim();
            // Remove trailing punctuation or filler words
            name = name.replace(/[,.!?].*$/, '').trim();

            if (name && name !== 'undefined') {
                highlightField('name');
                formElements.name.value = name;
            }
        }
    }

    // Process email
    if (text.includes('@')) {
        const emailPattern = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/;
        const match = transcript.match(emailPattern);
        if (match) {
            highlightField('email');
            formElements.email.value = match[0];
        }
    } else {
        for (const keyword of formFields.email) {
            if (text.includes(keyword)) {
                const index = text.indexOf(keyword) + keyword.length;
                let email = transcript.slice(index).trim();
                // Remove trailing punctuation or filler words
                email = email.replace(/[,.!?].*$/, '').trim();

                if (email && email !== 'undefined') {
                    highlightField('email');
                    formElements.email.value = email;
                }
            }
        }
    }

    // Process phone
    for (const keyword of formFields.phone) {
        if (text.includes(keyword)) {
            const index = text.indexOf(keyword) + keyword.length;
            let phone = transcript.slice(index).trim();
            // Remove trailing punctuation or filler words
            phone = phone.replace(/[,.!?].*$/, '').trim();

            // Try to extract just the digits
            const phoneDigits = phone.replace(/\D/g, '');
            if (phoneDigits.length >= 7) {
                highlightField('phone');
                formElements.phone.value = phoneDigits;
            } else if (phone && phone !== 'undefined') {
                highlightField('phone');
                formElements.phone.value = phone;
            }
        }
    }

    // Process service
    for (const service in formFields.service) {
        for (const keyword of formFields.service[service]) {
            if (text.includes(keyword)) {
                highlightField('service');
                formElements.service.value = service;
                break;
            }
        }
    }

    // Process satisfaction rating
    for (const keyword of formFields.satisfaction) {
        if (text.includes(keyword)) {
            // Look for numbers 1-5 in the text
            const ratingPatterns = [
                /\bone\b/i, /\btwo\b/i, /\bthree\b/i, /\bfour\b/i, /\bfive\b/i,
                /\b1\b/, /\b2\b/, /\b3\b/, /\b4\b/, /\b5\b/
            ];

            for (let i = 0; i < ratingPatterns.length; i++) {
                if (ratingPatterns[i].test(text)) {
                    const rating = (i % 5) + 1; // Convert to 1-5
                    highlightField('satisfaction');
                    formElements.satisfaction.value = rating;
                    satisfactionMeter.value = rating;
                    satisfactionValue.textContent = rating;
                    break;
                }
            }
        }
    }

    // Process recommendation rating
    for (const keyword of formFields.recommend) {
        if (text.includes(keyword)) {
            // Look for numbers 1-5 in the text
            const ratingPatterns = [
                /\bone\b/i, /\btwo\b/i, /\bthree\b/i, /\bfour\b/i, /\bfive\b/i,
                /\b1\b/, /\b2\b/, /\b3\b/, /\b4\b/, /\b5\b/
            ];

            for (let i = 0; i < ratingPatterns.length; i++) {
                if (ratingPatterns[i].test(text)) {
                    const rating = (i % 5) + 1; // Convert to 1-5
                    highlightField('recommend');
                    formElements.recommend.value = rating;
                    recommendMeter.value = rating;
                    recommendValue.textContent = rating;
                    break;
                }
            }
        }
    }

    // Process additional comments
    for (const keyword of formFields.comments) {
        if (text.includes(keyword)) {
            const index = text.indexOf(keyword) + keyword.length;
            let comments = transcript.slice(index).trim();
            // Remove trailing punctuation or filler words
            comments = comments.replace(/[,.!?].*$/, '').trim();

            if (comments && comments !== 'undefined') {
                highlightField('comments');
                let existingComments = formElements.comments.value;
                if (existingComments) {
                    formElements.comments.value = existingComments + ' ' + comments;
                } else {
                    formElements.comments.value = comments;
                }
            }
        }
    }

    updateVisualization();
}

// Highlights a field to show it's been updated
function highlightField(fieldName) {
    const field = formElements[fieldName];
    field.classList.add('highlight');
    setTimeout(() => {
        field.classList.remove('highlight');
    }, 1500);
}

// Updates visualization based on form completion
function updateVisualization() {
    // Calculate completion percentage
    let filledFields = 0;
    let totalFields = 0;

    for (const field in formElements) {
        totalFields++;
        if (formElements[field].value) {
            filledFields++;
        }
    }

    const completionPercentage = Math.round((filledFields / totalFields) * 100);
    completionProgress.style.width = completionPercentage + '%';
    completionText.textContent = completionPercentage + '% Complete';

    // Update meters
    if (formElements.satisfaction.value) {
        satisfactionMeter.value = formElements.satisfaction.value;
        satisfactionValue.textContent = formElements.satisfaction.value;
    }

    if (formElements.recommend.value) {
        recommendMeter.value = formElements.recommend.value;
        recommendValue.textContent = formElements.recommend.value;
    }

    // Update JSON preview
    const formData = {};
    for (const field in formElements) {
        formData[field] = formElements[field].value;
    }
    jsonPreview.textContent = JSON.stringify(formData, null, 2);

    // Auto-submit if form is complete
    if (completionPercentage === 100 && isRecording) {
        status.textContent = 'Status: Form complete, stopping recording';
        stopRecording();
    }
}

// Reset silence timer
function resetSilenceTimer() {
    clearTimeout(silenceTimer);
    silenceCount = 0;

    silenceTimer = setTimeout(function checkSilence() {
        silenceCount++;

        if (silenceCount >= SILENCE_THRESHOLD) {
            // 5 seconds of silence, auto-stop
            status.textContent = 'Status: Silence detected, stopping recording';
            stopRecording();
        } else {
            // Not enough silence yet, check again in 1 second
            silenceTimer = setTimeout(checkSilence, 1000);
        }
    }, 1000);
}

// Reset the form
function resetForm() {
    for (const field in formElements) {
        formElements[field].value = '';
    }

    satisfactionMeter.value = 0;
    recommendMeter.value = 0;
    satisfactionValue.textContent = '-';
    recommendValue.textContent = '-';

    transcriptBox.innerHTML = '<p>Transcript will appear here...</p>';
    interimText.textContent = '';
    completionProgress.style.width = '0%';
    completionText.textContent = '0% Complete';
    jsonPreview.textContent = '{ }';

    accumulatedTranscript = '';

    status.textContent = 'Status: Form reset';
    showSystemMessage('Form has been reset', 'success');
}

// Submit the form
function submitForm() {
    // Calculate completion percentage
    let filledFields = 0;
    let totalFields = 0;

    for (const field in formElements) {
        totalFields++;
        if (formElements[field].value) {
            filledFields++;
        }
    }

    const completionPercentage = Math.round((filledFields / totalFields) * 100);

    if (completionPercentage < 50) {
        status.textContent = 'Status: Form is incomplete';
        showSystemMessage('Please fill out more fields before submitting', 'error');
        return;
    }

    // In a real application, you would send the form data to a server
    // For this demo, we'll just show a success message
    status.textContent = 'Status: Form submitted successfully';
    showSystemMessage('Form submitted successfully!', 'success');

    // Disable the submit button to prevent multiple submissions
    submitBtn.disabled = true;

    // In a real application, you might redirect the user or show a confirmation page
    setTimeout(() => {
        // Re-enable submit after 3 seconds for demo purposes
        submitBtn.disabled = false;
    }, 3000);
}

// Event listeners
startBtn.addEventListener('click', startRecording);
stopBtn.addEventListener('click', stopRecording);
resetBtn.addEventListener('click', resetForm);
submitBtn.addEventListener('click', submitForm);

// Check for browser compatibility
if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
    status.textContent = 'Error: Browser does not support audio recording';
    startBtn.disabled = true;
    showSystemMessage('Your browser does not support audio recording. Please use Chrome, Firefox, or Edge.', 'error');
}