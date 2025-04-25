// Script for addQuestion.html

document.addEventListener('DOMContentLoaded', function () {
    // DOM Elements
    const quizCreationForm = document.getElementById('quizCreationForm');
    const questionsContainer = document.getElementById('questionsContainer');
    const addQuestionBtn = document.getElementById('addQuestionBtn');
    const publishQuizBtn = document.getElementById('publishQuizBtn');
    const cancelBtn = document.getElementById('cancelBtn');

    // Templates
    const questionTemplate = document.getElementById('questionTemplate');
    const optionTemplate = document.getElementById('optionTemplate');

    // Counter for question numbering
    let questionCounter = 0;

    // Initialize
    init();

    // Event Listeners
    addQuestionBtn.addEventListener('click', addNewQuestion);
    publishQuizBtn.addEventListener('click', publishQuiz);
    cancelBtn.addEventListener('click', cancelQuizCreation);

    // Functions
    function init() {
        // Clear any existing questions
        const noQuestionsMessage = document.querySelector('.no-questions-message');
        if (noQuestionsMessage) {
            noQuestionsMessage.style.display = 'block';
        }

        // Add first question automatically for better UX
        addNewQuestion();
    }

    function addNewQuestion() {
        // Hide the "no questions" message if it exists
        const noQuestionsMessage = document.querySelector('.no-questions-message');
        if (noQuestionsMessage) {
            noQuestionsMessage.style.display = 'none';
        }

        // Clone the question template
        const newQuestion = questionTemplate.content.cloneNode(true);

        // Update question number
        questionCounter++;
        newQuestion.querySelector('.question-number').textContent = questionCounter;

        // Add event listeners to the new question
        setupQuestionEvents(newQuestion);

        // Add the new question to the container
        questionsContainer.appendChild(newQuestion);

        // Update the question type behavior
        const questionTypeSelect = questionsContainer.lastElementChild.querySelector('.question-type');
        handleQuestionTypeChange({ target: questionTypeSelect });
    }

    function setupQuestionEvents(questionElement) {
        // Delete button event
        const deleteBtn = questionElement.querySelector('.delete-question-btn');
        deleteBtn.addEventListener('click', function (e) {
            const questionCard = e.target.closest('.question-card');

            // Confirm deletion
            if (confirm('Are you sure you want to delete this question?')) {
                questionCard.remove();

                // Update question numbers
                updateQuestionNumbers();

                // Show "no questions" message if all questions are deleted
                if (questionsContainer.children.length === 0) {
                    const noQuestionsMessage = document.querySelector('.no-questions-message');
                    if (noQuestionsMessage) {
                        noQuestionsMessage.style.display = 'block';
                    }
                }
            }
        });

        // Question type change event
        const questionTypeSelect = questionElement.querySelector('.question-type');
        questionTypeSelect.addEventListener('change', handleQuestionTypeChange);

        // Add option button event
        const addOptionBtn = questionElement.querySelector('.add-option-btn');
        addOptionBtn.addEventListener('click', function (e) {
            const optionsContainer = e.target.previousElementSibling;
            addNewOption(optionsContainer);
        });
    }

    function handleQuestionTypeChange(e) {
        const questionType = e.target.value;
        const questionCard = e.target.closest('.question-card');
        const answerOptionsContainer = questionCard.querySelector('.answer-options-container');
        const correctAnswerContainer = questionCard.querySelector('.correct-answer-container');
        const correctAnswerInput = questionCard.querySelector('.correct-answer-input');

        // Show/hide elements based on question type
        switch (questionType) {
            case 'short':
            case 'long':
                // For text answers, show correct answer input, hide options
                answerOptionsContainer.style.display = 'none';
                correctAnswerContainer.style.display = 'block';
                correctAnswerInput.style.display = 'block';
                break;

            case 'radio':
            case 'checkbox':
                // For multiple choice, show options, hide correct answer input
                answerOptionsContainer.style.display = 'block';
                correctAnswerContainer.style.display = 'block';
                correctAnswerInput.style.display = 'none';

                // If there are no options yet, add some default ones
                const optionsContainer = answerOptionsContainer.querySelector('.answer-options');
                if (optionsContainer.children.length === 0) {
                    // Add 2 default options
                    addNewOption(optionsContainer);
                    addNewOption(optionsContainer);
                }

                // Update the checkbox/radio behavior for correct answer selection
                const optionCheckboxes = optionsContainer.querySelectorAll('.correct-option-checkbox');
                optionCheckboxes.forEach(checkbox => {
                    // For radio buttons, only one can be selected
                    if (questionType === 'radio') {
                        checkbox.type = 'radio';
                        checkbox.name = `correct_option_${questionCounter}`;
                    } else {
                        checkbox.type = 'checkbox';
                        checkbox.name = `correct_option_${questionCounter}_${Array.from(optionCheckboxes).indexOf(checkbox)}`;
                    }
                });
                break;
        }
    }

    function addNewOption(optionsContainer) {
        // Clone the option template
        const newOption = optionTemplate.content.cloneNode(true);

        // Setup option events
        setupOptionEvents(newOption);

        // Add the new option to the container
        optionsContainer.appendChild(newOption);

        // Update the correct answer checkbox/radio type
        const questionCard = optionsContainer.closest('.question-card');
        const questionType = questionCard.querySelector('.question-type').value;
        const questionIndex = Array.from(questionsContainer.children).indexOf(questionCard);

        const optionCheckbox = newOption.querySelector('.correct-option-checkbox');
        if (questionType === 'radio') {
            optionCheckbox.type = 'radio';
            optionCheckbox.name = `correct_option_${questionIndex + 1}`;
        } else {
            optionCheckbox.type = 'checkbox';
            optionCheckbox.name = `correct_option_${questionIndex + 1}_${optionsContainer.children.length - 1}`;
        }
    }

    function setupOptionEvents(optionElement) {
        // Delete button event
        const deleteBtn = optionElement.querySelector('.delete-option-btn');
        deleteBtn.addEventListener('click', function (e) {
            const optionGroup = e.target.closest('.option-group');
            const optionsContainer = optionGroup.parentElement;

            // Don't delete if it's the last option
            if (optionsContainer.children.length <= 1) {
                alert('You need at least one option for this question type.');
                return;
            }

            // Remove the option
            optionGroup.remove();
        });
    }

    function updateQuestionNumbers() {
        const questionCards = questionsContainer.querySelectorAll('.question-card');
        questionCounter = questionCards.length;

        questionCards.forEach((card, index) => {
            card.querySelector('.question-number').textContent = index + 1;
        });
    }

    function publishQuiz(e) {
        e.preventDefault();

        // Validate form
        if (!validateQuizForm()) {
            return;
        }

        // Collect quiz data
        const quizData = collectQuizData();

        // Save to localStorage
        saveQuizToStorage(quizData);

        // Navigate back to quiz list
        window.location.href = 'quizForm.html';
    }

    function validateQuizForm() {
        // Check quiz title
        const quizTitle = document.getElementById('quizTitle').value.trim();
        if (!quizTitle) {
            alert('Please enter a quiz title.');
            return false;
        }

        // Check if there are any questions
        if (questionsContainer.children.length === 0) {
            alert('Please add at least one question to your quiz.');
            return false;
        }

        // Validate each question
        const questionCards = questionsContainer.querySelectorAll('.question-card');
        let isValid = true;

        questionCards.forEach((card, index) => {
            // Check question text
            const questionText = card.querySelector('.question-text').value.trim();
            if (!questionText) {
                alert(`Question ${index + 1} needs text.`);
                isValid = false;
                return;
            }

            // Check question points (should be > 0)
            const points = parseInt(card.querySelector('.question-points').value);
            if (isNaN(points) || points <= 0) {
                alert(`Question ${index + 1} needs valid points (greater than 0).`);
                isValid = false;
                return;
            }

            // Check question type specific validation
            const questionType = card.querySelector('.question-type').value;

            switch (questionType) {
                case 'short':
                case 'long':
                    const correctAnswer = card.querySelector('.correct-answer').value.trim();
                    if (!correctAnswer) {
                        alert(`Question ${index + 1} needs a correct answer.`);
                        isValid = false;
                    }
                    break;

                case 'radio':
                case 'checkbox':
                    // Check options
                    const options = card.querySelectorAll('.option-text');
                    let allOptionsHaveText = true;

                    options.forEach((option, optIndex) => {
                        if (!option.value.trim()) {
                            alert(`Question ${index + 1}, Option ${optIndex + 1} needs text.`);
                            allOptionsHaveText = false;
                            isValid = false;
                        }
                    });

                    if (!allOptionsHaveText) return;

                    // Check if at least one correct answer is selected
                    const correctOptions = card.querySelectorAll('.correct-option-checkbox:checked');
                    if (correctOptions.length === 0) {
                        alert(`Question ${index + 1} needs at least one correct answer selected.`);
                        isValid = false;
                    }
                    break;
            }
        });

        return isValid;
    }

    function collectQuizData() {
        const quizTitle = document.getElementById('quizTitle').value.trim();
        const quizDescription = document.getElementById('quizDescription').value.trim();
        const questions = [];

        // Collect questions data
        const questionCards = questionsContainer.querySelectorAll('.question-card');
        questionCards.forEach(card => {
            const questionText = card.querySelector('.question-text').value.trim();
            const points = parseInt(card.querySelector('.question-points').value);
            const questionType = card.querySelector('.question-type').value;

            const questionData = {
                text: questionText,
                points: points,
                type: questionType
            };

            // Collect answer data based on question type
            switch (questionType) {
                case 'short':
                case 'long':
                    questionData.correctAnswer = card.querySelector('.correct-answer').value.trim();
                    break;

                case 'radio':
                case 'checkbox':
                    const options = [];
                    const optionElements = card.querySelectorAll('.option-group');

                    optionElements.forEach(optElement => {
                        const optionText = optElement.querySelector('.option-text').value.trim();
                        const isCorrect = optElement.querySelector('.correct-option-checkbox').checked;

                        options.push({
                            text: optionText,
                            isCorrect: isCorrect
                        });
                    });

                    questionData.options = options;
                    break;
            }

            questions.push(questionData);
        });

        return {
            title: quizTitle,
            description: quizDescription,
            questions: questions,
            createdAt: new Date().toISOString()
        };
    }

    function saveQuizToStorage(quizData) {
        // Get existing quizzes
        const existingQuizzes = getQuizzesFromStorage();

        // Add new quiz
        existingQuizzes.push(quizData);

        // Save back to localStorage
        localStorage.setItem('quizzes', JSON.stringify(existingQuizzes));
    }

    function getQuizzesFromStorage() {
        const quizzesJSON = localStorage.getItem('quizzes');
        return quizzesJSON ? JSON.parse(quizzesJSON) : [];
    }

    function cancelQuizCreation() {
        if (confirm('Are you sure you want to cancel? All your quiz data will be lost.')) {
            window.location.href = 'quizForm.html';
        }
    }
});