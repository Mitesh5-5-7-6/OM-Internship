const addQuizBtn = document.getElementById("addQuizBtn");
const quizContainer = document.getElementById("quizContainer");
const noQuizMessage = document.getElementById("noQuizMessage");

addQuizBtn.onclick = function () {
    window.location.href = "addQuestion.html";
};

const savedQuiz = localStorage.getItem("quizData");

if (savedQuiz) {
    const quiz = JSON.parse(savedQuiz);
    noQuizMessage.style.display = "none";

    const form = document.createElement("form");
    form.id = "quizForm";

    const title = document.createElement("h2");
    title.textContent = quiz.title;
    form.appendChild(title);

    quiz.questions.forEach((q, index) => {
        const qDiv = document.createElement("div");

        const label = document.createElement("label");
        label.textContent = `Q${index + 1}: ${q.questionText} (${q.points} pts)`;
        qDiv.appendChild(label);
        qDiv.appendChild(document.createElement("br"));

        if (q.type === "short" || q.type === "long") {
            const input = document.createElement("input");
            input.type = "text";
            input.name = `q${index}`;
            input.required = true;
            qDiv.appendChild(input);
        }

        if (q.type === "radio" || q.type === "checkbox") {
            q.options.forEach((opt, i) => {
                const optDiv = document.createElement("div");
                optDiv.className = "createMultiple"

                const input = document.createElement("input");
                input.type = q.type;
                input.name = `q${index}`;
                input.value = opt;

                if (q.type === "checkbox") {
                    input.name = `q${index}[]`;
                }

                const optLabel = document.createElement("label");
                optLabel.textContent = opt;

                optDiv.appendChild(input);
                optDiv.appendChild(optLabel);
                qDiv.appendChild(optDiv);
            });
        }

        qDiv.appendChild(document.createElement("hr"));
        form.appendChild(qDiv);
    });

    const submitBtn = document.createElement("button");
    submitBtn.textContent = "Submit Quiz";
    submitBtn.type = "submit";
    form.appendChild(submitBtn);

    quizContainer.appendChild(form);

    form.onsubmit = function (e) {
        e.preventDefault();

        let score = 0;

        quiz.questions.forEach((q, i) => {
            const name = `q${i}`;
            let userAnswer = "";

            if (q.type === "short" || q.type === "long") {
                const input = form.querySelector(`[name="${name}"]`);
                userAnswer = input.value.trim().toLowerCase();
                if (userAnswer === q.correctAnswer.trim().toLowerCase()) {
                    score += parseInt(q.points);
                }
            }

            if (q.type === "radio") {
                const selected = form.querySelector(`input[name="${name}"]:checked`);
                if (selected && selected.value.trim().toLowerCase() === q?.correctAnswer?.trim().toLowerCase()) {
                    score += parseInt(q.points);
                }
            }

            if (q.type === "checkbox") {
                const selected = Array.from(form.querySelectorAll(`input[name="${name}[]"]:checked`)).map(opt => opt.value);
                const correct = Array.isArray(q.correctAnswer) ? q.correctAnswer : [q.correctAnswer];
                if (arraysEqualIgnoreOrder(selected, correct)) {
                    score += parseInt(q.points);
                }
            }
        });

        alert(`Quiz Submitted!\nYour Score: ${score}`);
    };
}

function arraysEqualIgnoreOrder(a, b) {
    if (a.length !== b.length) return false;
    return a.sort().toString() === b.sort().toString();
}