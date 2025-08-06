const questions = [
    {
      question: "What is the capital of France?",
      answers: [
        { text: "Paris", correct: true },
        { text: "London", correct: false },
        { text: "Berlin", correct: false },
        { text: "Madrid", correct: false },
      ],
    },
    {
      question: "Which is the largest planet?",
      answers: [
        { text: "Mars", correct: false },
        { text: "Earth", correct: false },
        { text: "Jupiter", correct: true },
        { text: "Saturn", correct: false },
      ],
    },
    {
      question: "Who wrote 'Hamlet'?",
      answers: [
        { text: "Charles Dickens", correct: false },
        { text: "William Shakespeare", correct: true },
        { text: "Leo Tolstoy", correct: false },
        { text: "Mark Twain", correct: false },
      ],
    },
  ];
  
  const questionElement = document.getElementById("question");
  const answerButtons = document.getElementById("answer-buttons");
  const nextBtn = document.getElementById("next-btn");
  const scoreArea = document.getElementById("score-area");
  const scoreText = document.getElementById("score");
  
  let currentQuestionIndex = 0;
  let score = 0;
  
  function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextBtn.innerText = "Next";
    scoreArea.classList.add("hide");
    showQuestion();
  }
  
  function showQuestion() {
    resetState();
    const currentQuestion = questions[currentQuestionIndex];
    questionElement.innerText = currentQuestion.question;
  
    currentQuestion.answers.forEach((answer) => {
      const button = document.createElement("button");
      button.innerText = answer.text;
      button.classList.add("btn");
      if (answer.correct) {
        button.dataset.correct = true;
      }
      button.addEventListener("click", selectAnswer);
      answerButtons.appendChild(button);
    });
  }
  
  function resetState() {
    nextBtn.style.display = "none";
    while (answerButtons.firstChild) {
      answerButtons.removeChild(answerButtons.firstChild);
    }
  }
  
  function selectAnswer(e) {
    const selectedBtn = e.target;
    const correct = selectedBtn.dataset.correct === "true";
  
    if (correct) {
      selectedBtn.classList.add("correct");
      score++;
    } else {
      selectedBtn.classList.add("wrong");
    }
  
    Array.from(answerButtons.children).forEach((button) => {
      button.disabled = true;
      if (button.dataset.correct === "true") {
        button.classList.add("correct");
      }
    });
  
    nextBtn.style.display = "block";
  }
  
  function showScore() {
    resetState();
    questionElement.innerText = "Quiz Completed!";
    scoreText.innerText = `${score} / ${questions.length}`;
    scoreArea.classList.remove("hide");
    nextBtn.innerText = "Restart";
    nextBtn.style.display = "block";
  }
  
  nextBtn.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length - 1) {
      currentQuestionIndex++;
      showQuestion();
    } else {
      showScore();
    }
  });
  
  startQuiz();
