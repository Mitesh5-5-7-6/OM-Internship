const addQuestionBtn = document.getElementById("addQuestion");
const questionsContainer = document.getElementById("questionsContainer");
const quizForm = document.getElementById("quizForm");
const quizTitle = document.getElementById("quizTitle");

let questionCount = 0;

addQuestionBtn.onclick = function () {
    questionCount++;

    const questionDiv = document.createElement("div");
    questionDiv.className = "question-block";
    questionDiv.innerHTML = `
    <h3>Question ${questionCount}</h3>

    <label>Question Text:</label><br>
    <input type="text" class="question-text" required><br><br>

    <label>Points:</label><br>
    <input type="number" class="question-points" value="1" min="1" required><br><br>

    <label>Question Type:</label><br>
    <select class="question-type">
      <option value="short">Short Answer</option>
      <option value="long">Long Answer</option>
      <option value="radio">Multiple Choice (Single)</option>
      <option value="checkbox">Multiple Choice (Multiple)</option>
    </select><br><br>

    <div class="options-container" style="display: none;">
      <label>Options:</label><br>
      <div class="options-list"></div>
      <button type="button" class="add-option-btn">Add Option</button><br><br>
    </div>

    <label>Correct Answer:</label><br>
    <input type="text" class="correct-answer" required><br><br>

    <hr>
  `;

    questionsContainer.appendChild(questionDiv);

    const typeSelect = questionDiv.querySelector(".question-type");
    const correctInput = questionDiv.querySelector(".correct-answer");
    const optionsContainer = questionDiv.querySelector(".options-container");
    const optionsList = questionDiv.querySelector(".options-list");
    const addOptionBtn = questionDiv.querySelector(".add-option-btn");

    typeSelect.onchange = function () {
        const type = typeSelect.value;
        if (type === "radio" || type === "checkbox") {
            correctInput.disabled = false;
            correctInput.value = "";
            optionsContainer.style.display = "block";

            if (optionsList.children.length === 0) {
                addOption(type);
            }
        } else {
            correctInput.disabled = true;
            optionsContainer.style.display = "none";
            optionsList.innerHTML = "";
        }
    };

    addOptionBtn.onclick = function () {
        addOption(typeSelect.value);
    };

    function addOption(type) {
        const optionDiv = document.createElement("div");
        const optionType = type === "radio" ? "radio" : "checkbox";
        optionDiv.innerHTML = `
      <input type="${optionType}" name="option-${questionCount}">
      <input type="text" class="option-text" placeholder="Option text" required>
      <button type="button" class="remove-option">×</button>
    `;
        optionsList.appendChild(optionDiv);

        const removeBtn = optionDiv.querySelector(".remove-option");
        removeBtn.onclick = function () {
            optionsList.removeChild(optionDiv);
        };
    }

    typeSelect.onchange();
};

quizForm.onsubmit = function (e) {
    e.preventDefault();

    const quizData = {
        title: quizTitle.value,
        questions: []
    };

    const allQuestions = document.querySelectorAll(".question-block");

    allQuestions.forEach((block, index) => {
        const questionText = block.querySelector(".question-text").value;
        const points = block.querySelector(".question-points").value;
        const type = block.querySelector(".question-type").value;
        const correctAnswer = block.querySelector(".correct-answer").value;

        const options = [];
        const optionInputs = block.querySelectorAll(".option-text");
        optionInputs.forEach(opt => {
            options.push(opt.value);
        });

        quizData.questions.push({
            questionText,
            points,
            type,
            correctAnswer: (type === "radio" || type === "checkbox") ? correctAnswer : null,
            options: (type === "radio" || type === "checkbox") ? options : null
        });
    });

    localStorage.setItem("quizData", JSON.stringify(quizData));
    alert("Quiz saved to localStorage!");

    quizForm.reset();
    questionsContainer.innerHTML = "";
    questionCount = 0;

    window.location.href = "quizForm.html";
};
