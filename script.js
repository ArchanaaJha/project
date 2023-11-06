const questionText = document.getElementById("question-text");
const optionsContainer = document.getElementById("options-container");
const nextButton = document.getElementById("next-button");
const resultContainer = document.getElementById("result-container");
const scoreDisplay = document.getElementById("score");

let currentQuestionIndex = 0;
let score = 0;
let questions = [];

// Fetch questions from the JSON file
fetch("questions.json")
  .then((response) => response.json())
  .then((data) => {
    questions = data;
    startQuiz();
  });

function startQuiz() {
  resultContainer.style.display = "none";
  loadQuestion(currentQuestionIndex);
}

function loadQuestion(index) {
  if (index < questions.length) {
    questionText.textContent = questions[index].question;
    optionsContainer.innerHTML = "";

    for (const option of questions[index].options) {
      const optionElement = document.createElement("div");
      optionElement.textContent = option;
      optionElement.className = "option";
      optionElement.addEventListener("click", () => checkAnswer(option));
      optionsContainer.appendChild(optionElement);
    }
  } else {
    endQuiz();
  }
}

function checkAnswer(selectedOption) {
  if (selectedOption === questions[currentQuestionIndex].answer) {
    score++;
  }
  currentQuestionIndex++;
  loadQuestion(currentQuestionIndex);
}

function endQuiz() {
  questionText.textContent = "Quiz completed!";
  optionsContainer.innerHTML = "";
  resultContainer.style.display = "block";
  scoreDisplay.textContent = score;
}

nextButton.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length) {
    loadQuestion(currentQuestionIndex);
  }
});

// Start the quiz when the page loads
window.onload = startQuiz;
