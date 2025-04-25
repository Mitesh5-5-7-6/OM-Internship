// Main script for quizForm.html

document.addEventListener('DOMContentLoaded', function () {
    // DOM Elements
    const addQuizBtn = document.getElementById('addQuizBtn');
    const quizListContainer = document.getElementById('quizListContainer');
    const quizList = document.getElementById('quizList');
    const noQuizMessage = document.getElementById('noQuizMessage');
    const activeQuizContainer = document.getElementById('activeQuizContainer');
    const quizForm = document.getElementById('quizForm');
    const questionsContainer = document.getElementById('questionsContainer');
    const resultsContainer = document.getElementById('resultsContainer');
    const backToQuizzesBtn = document.getElementById('backToQuizzes');

    // Initialize the application
    init();

    // Event Listeners
    addQuizBtn.addEventListener('click', navigateToAddQuestion);
    quizForm.addEventListener('submit', handleQuizSubmit);
    backToQuizzesBtn.addEventListener('click', showQuizList);

    // Functions
    function init() {
        // Load quizzes from localStorage
        loadQuizzes();
    }

    function navigateToAddQuestion() {
        // Navigate to the add question page
        window.location.href = 'addQuestion.html';
    }

    function loadQuizzes() {
        // Get quizzes from localStorage
        const quizzes = getQuizzesFromStorage();

        // Clear quiz list
        quizList.innerHTML = '';

        // Show or hide "no quiz" message
        if (quizzes.length === 0) {
            noQuizMessage.style.display = 'block';
            quizList.style.display = 'none';
        } else {
            noQuizMessage.style.display = 'none';
            quizList.style.display = 'block';

            // Populate quiz list
            quizzes.forEach((quiz, index) => {
                const quizItem = createQuizItem(quiz, index);
                quizList.appendChild(quizItem);
            });
        }
    }

    function createQuizItem(quiz, index) {
        const quizItem = document.createElement('div');
        quizItem.className = 'quiz-item';
        quizItem.dataset.index = index;

        const title = document.createElement('h3');
        title.textContent = quiz.title;

        const meta = document.createElement('div');
        meta.className = 'quiz-meta';
        meta.textContent = `${quiz.questions.length} questions | ${getTotalPoints(quiz)} points`;

        quizItem.appendChild(title);
        quizItem.appendChild(meta);

        // Add click event to open the quiz
        quizItem.addEventListener('click', () => openQuiz(index));

        return quizItem;
    }

    function getTotalPoints(quiz) {
        return quiz.questions.reduce((total, question) => total + parseInt(question.points), 0);
    }

    function openQuiz(index) {
        // Get the quiz data
        const quizzes = getQuizzesFromStorage();
        const quiz = quizzes[index];

        if (!quiz) return;

        // Set quiz title
        document.getElementById('quizTitle').textContent = quiz.title;

        // Set quiz description if exists
        const descElement = document.getElementById('quizDescription');
        descElement.textContent = quiz.description || '';
        descElement.style.display = quiz.description ? 'block' : 'none';

        // Clear and populate questions container
        questionsContainer.innerHTML = '';
        quiz.questions.forEach((question, qIndex) => {
            const questionElement = createQuestionElement(question, qIndex);
            questionsContainer.appendChild(questionElement);
        });

        // Store current quiz index for submission
        quizForm.dataset.quizIndex = index;

        // Show quiz container, hide other containers
        quizListContainer.style.display = 'none';
        activeQuizContainer.style.display = 'block';
        resultsContainer.style.display = 'none';
    }

    function createQuestionElement(question, index) {
        const questionDiv = document.createElement('div');
        questionDiv.className = 'quiz-question';
        questionDiv.dataset.index = index;

        // Question text
        const questionText = document.createElement('div');
        questionText.className = 'question-text';
        questionText.textContent = `${index + 1}. ${question.text}`;

        // Question points
        const questionPoints = document.createElement('div');
        questionPoints.className = 'question-points';
        questionPoints.textContent = `Points: ${question.points}`;

        // Answer input based on question type
        const answerInput = createAnswerInput(question, index);

        // Append elements
        questionDiv.appendChild(questionText);
        questionDiv.appendChild(questionPoints);
        questionDiv.appendChild(answerInput);

        return questionDiv;
    }

    function createAnswerInput(question, index) {
        const answerContainer = document.createElement('div');
        answerContainer.className = 'answer-input-container';

        switch (question.type) {
            case 'short':
                const shortInput = document.createElement('input');
                shortInput.type = 'text';
                shortInput.name = `answer_${index}`;
                shortInput.className = 'answer-input';
                shortInput.required = true;
                answerContainer.appendChild(shortInput);
                break;

            case 'long':
                const longInput = document.createElement('textarea');
                longInput.name = `answer_${index}`;
                longInput.className = 'answer-input';
                longInput.rows = 4;
                longInput.required = true;
                answerContainer.appendChild(longInput);
                break;

            case 'radio':
                question.options.forEach((option, optIndex) => {
                    const optionContainer = document.createElement('div');
                    optionContainer.className = 'radio-option';

                    const radioInput = document.createElement('input');
                    radioInput.type = 'radio';
                    radioInput.name = `answer_${index}`;
                    radioInput.id = `answer_${index}_${optIndex}`;
                    radioInput.value = optIndex.toString();
                    radioInput.required = true;

                    const label = document.createElement('label');
                    label.htmlFor = `answer_${index}_${optIndex}`;
                    label.textContent = option.text;

                    optionContainer.appendChild(radioInput);
                    optionContainer.appendChild(label);
                    answerContainer.appendChild(optionContainer);
                });
                break;

            case 'checkbox':
                question.options.forEach((option, optIndex) => {
                    const optionContainer = document.createElement('div');
                    optionContainer.className = 'checkbox-option';

                    const checkboxInput = document.createElement('input');
                    checkboxInput.type = 'checkbox';
                    checkboxInput.name = `answer_${index}_${optIndex}`;
                    checkboxInput.id = `answer_${index}_${optIndex}`;
                    checkboxInput.value = 'true';

                    const label = document.createElement('label');
                    label.htmlFor = `answer_${index}_${optIndex}`;
                    label.textContent = option.text;

                    optionContainer.appendChild(checkboxInput);
                    optionContainer.appendChild(label);
                    answerContainer.appendChild(optionContainer);
                });
                break;
        }

        return answerContainer;
    }

    function handleQuizSubmit(event) {
        event.preventDefault();

        // Get quiz index and quiz data
        const quizIndex = parseInt(quizForm.dataset.quizIndex);
        const quizzes = getQuizzesFromStorage();
        const quiz = quizzes[quizIndex];

        if (!quiz) return;

        // Collect user answers
        const userAnswers = [];
        quiz.questions.forEach((question, index) => {
            switch (question.type) {
                case 'short':
                case 'long':
                    const textInput = document.querySelector(`[name="answer_${index}"]`);
                    userAnswers.push({
                        questionIndex: index,
                        answer: textInput.value
                    });
                    break;

                case 'radio':
                    const selectedRadio = document.querySelector(`[name="answer_${index}"]:checked`);
                    userAnswers.push({
                        questionIndex: index,
                        answer: selectedRadio ? parseInt(selectedRadio.value) : -1
                    });
                    break;

                case 'checkbox':
                    const checkboxAnswers = [];
                    question.options.forEach((_, optIndex) => {
                        const checkbox = document.querySelector(`[name="answer_${index}_${optIndex}"]:checked`);
                        if (checkbox) {
                            checkboxAnswers.push(optIndex);
                        }
                    });
                    userAnswers.push({
                        questionIndex: index,
                        answer: checkboxAnswers
                    });
                    break;
            }
        });

        // Calculate results
        const results = calculateResults(quiz, userAnswers);

        // Display results
        displayResults(quiz, userAnswers, results);
    }

    function calculateResults(quiz, userAnswers) {
        let totalPoints = 0;
        let earnedPoints = 0;
        let correctAnswers = 0;

        userAnswers.forEach(userAnswer => {
            const question = quiz.questions[userAnswer.questionIndex];
            const points = parseInt(question.points);
            totalPoints += points;

            let isCorrect = false;

            switch (question.type) {
                case 'short':
                case 'long':
                    // Case-insensitive comparison for text answers
                    isCorrect = userAnswer.answer.trim().toLowerCase() === question.correctAnswer.trim().toLowerCase();
                    break;

                case 'radio':
                    // Check if selected option index matches correct option index
                    const correctOptionIndex = question.options.findIndex(opt => opt.isCorrect);
                    isCorrect = userAnswer.answer === correctOptionIndex;
                    break;

                case 'checkbox':
                    // Get indices of all correct options
                    const correctIndices = question.options
                        .map((opt, index) => opt.isCorrect ? index : -1)
                        .filter(index => index !== -1);

                    // Check if user selected exactly the correct options (no more, no less)
                    isCorrect =
                        userAnswer.answer.length === correctIndices.length &&
                        correctIndices.every(index => userAnswer.answer.includes(index));
                    break;
            }

            if (isCorrect) {
                earnedPoints += points;
                correctAnswers++;
            }
        });

        const percentage = totalPoints > 0 ? Math.round((earnedPoints / totalPoints) * 100) : 0;

        return {
            totalPoints,
            earnedPoints,
            correctAnswers,
            totalQuestions: quiz.questions.length,
            percentage
        };
    }

    function displayResults(quiz, userAnswers, results) {
        // Update score display
        document.querySelector('.score-percentage').textContent = `${results.percentage}%`;
        document.getElementById('correctAnswers').textContent = results.correctAnswers;
        document.getElementById('totalQuestions').textContent = results.totalQuestions;
        document.getElementById('totalPoints').textContent = `${results.earnedPoints}/${results.totalPoints}`;

        // Generate question review
        const reviewContainer = document.getElementById('questionReview');
        reviewContainer.innerHTML = '';

        userAnswers.forEach(userAnswer => {
            const question = quiz.questions[userAnswer.questionIndex];
            const reviewQuestion = document.createElement('div');
            reviewQuestion.className = 'review-question';

            // Question text
            const questionText = document.createElement('div');
            questionText.className = 'question-text';
            questionText.textContent = `${userAnswer.questionIndex + 1}. ${question.text}`;

            // User answer
            const userAnswerDiv = document.createElement('div');
            userAnswerDiv.className = 'user-answer';
            userAnswerDiv.innerHTML = `<strong>Your answer:</strong> ${formatAnswer(question, userAnswer.answer)}`;

            // Correct answer
            const correctAnswerDiv = document.createElement('div');
            correctAnswerDiv.className = 'correct-answer';
            correctAnswerDiv.innerHTML = `<strong>Correct answer:</strong> ${formatCorrectAnswer(question)}`;

            // Result (correct/incorrect)
            const resultDiv = document.createElement('div');

            // Calculate if answer is correct
            let isCorrect = false;
            switch (question.type) {
                case 'short':
                case 'long':
                    isCorrect = userAnswer.answer.trim().toLowerCase() === question.correctAnswer.trim().toLowerCase();
                    break;
                case 'radio':
                    const correctOptionIndex = question.options.findIndex(opt => opt.isCorrect);
                    isCorrect = userAnswer.answer === correctOptionIndex;
                    break;
                case 'checkbox':
                    // Get indices of all correct options
                    const correctIndices = question.options
                        .map((opt, index) => opt.isCorrect ? index : -1)
                        .filter(index => index !== -1);

                    // Check if user selected exactly the correct options
                    isCorrect =
                        userAnswer.answer.length === correctIndices.length &&
                        correctIndices.every(index => userAnswer.answer.includes(index));
                    break;
            }

            resultDiv.className = `review-result ${isCorrect ? 'review-correct' : 'review-incorrect'}`;
            resultDiv.innerHTML = `<strong>${isCorrect ? 'Correct' : 'Incorrect'}</strong> (${isCorrect ? question.points : 0}/${question.points} points)`;

            // Append all elements to the review question div
            reviewQuestion.appendChild(questionText);
            reviewQuestion.appendChild(userAnswerDiv);
            reviewQuestion.appendChild(correctAnswerDiv);
            reviewQuestion.appendChild(resultDiv);

            // Add to review container
            reviewContainer.appendChild(reviewQuestion);
        });

        // Show results container, hide other containers
        quizListContainer.style.display = 'none';
        activeQuizContainer.style.display = 'none';
        resultsContainer.style.display = 'block';
    }

    function formatAnswer(question, answer) {
        switch (question.type) {
            case 'short':
            case 'long':
                return answer || '<em>No answer provided</em>';

            case 'radio':
                return answer >= 0 && answer < question.options.length
                    ? question.options[answer].text
                    : '<em>No answer selected</em>';

            case 'checkbox':
                if (!answer || answer.length === 0) {
                    return '<em>No options selected</em>';
                }
                return answer.map(index => question.options[index].text).join(', ');
        }
    }

    function formatCorrectAnswer(question) {
        switch (question.type) {
            case 'short':
            case 'long':
                return question.correctAnswer;

            case 'radio':
                const correctOption = question.options.find(opt => opt.isCorrect);
                return correctOption ? correctOption.text : '<em>No correct answer defined</em>';

            case 'checkbox':
                const correctOptions = question.options.filter(opt => opt.isCorrect);
                if (correctOptions.length === 0) {
                    return '<em>No correct answers defined</em>';
                }
                return correctOptions.map(opt => opt.text).join(', ');
        }
    }

    function showQuizList() {
        // Show quiz list, hide other containers
        quizListContainer.style.display = 'block';
        activeQuizContainer.style.display = 'none';
        resultsContainer.style.display = 'none';
    }

    // Helper functions for localStorage
    function getQuizzesFromStorage() {
        const quizzesJSON = localStorage.getItem('quizzes');
        return quizzesJSON ? JSON.parse(quizzesJSON) : [];
    }
});