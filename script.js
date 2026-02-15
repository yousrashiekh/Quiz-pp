// VARIABLES
let current = 0;
let score = 0;
let time = 20;
let timer;

const correct = [0, 2, 0, 2, 0];

const questions = [
  "Which keyword is block-scoped in JavaScript?",
  "Which one is NOT a JavaScript data type?",
  "What does DOM stand for?",
  "Which JavaScript method removes the last element from an array?",
  "Which CSS property controls the text size?"
];

const options = [
  ["let", "var", "const", "static"],
  ["Boolean", "String", "Integer", "Undefined"],
  ["Document Object Model", "Data Object Management", "Digital Ordinance Model", "Desktop Oriented Mode"],
  ["shift()", "splice()", "pop()", "slice()"],
  ["font-size", "text-style", "text-size", "font-style"]
];

// START QUIZ
function startQuiz() {
  document.getElementById("start").style.display = "none";
  document.getElementById("quiz").style.display = "block";
  showQuestion();
  timer = setInterval(countdown, 1000);
}

// SHOW QUESTION
function showQuestion() {
  document.getElementById("question").innerText = questions[current];
  document.getElementById("qnum").innerText = `Question ${current + 1} / ${questions.length}`;

  const indicator = document.getElementById("indicator");
  indicator.style.background = "lightgray";

  document.querySelectorAll(".options button").forEach((btn, i) => {
    btn.innerText = options[current][i];
    btn.disabled = false;
    btn.style.backgroundColor = "";  //reset button color
  });

  time = 20;
  document.getElementById("time").innerText = time + "s";
}

// CHECK ANSWER
function answer(choice) {
  const buttons = document.querySelectorAll(".options button");
  buttons.forEach((btn) => btn.disabled = true);

  const indicator = document.getElementById("indicator");

  if (choice === correct[current]) {
    buttons[choice].style.backgroundColor = "green";
    indicator.style.background = "linear-gradient(90deg,#9b9685,#65c368)";
    // green gradient
    score++;
  } else {
    buttons[choice].style.backgroundColor = "red";
    buttons[correct[current]].style.backgroundColor = "green";
    indicator.style.background = "linear-gradient(90deg,#a9892c,#f44336)"; // red gradient
  }


  current++;//current question index increase
  setTimeout(() => {
    if (current < questions.length) showQuestion();
    else endQuiz();
  }, 700);
}

// TIMER
function countdown() {
  time--;
  document.getElementById("time").innerText = time + "s";

  if (time <= 0) {
    const buttons = document.querySelectorAll(".options button");
    buttons[correct[current]].style.backgroundColor = "green";
    buttons.forEach(btn => btn.disabled = true);

    const indicator = document.getElementById("indicator");
    indicator.style.background = "linear-gradient(to right, #7bb426, #be8282)"; // red gradient

    current++;
    setTimeout(() => {
      if (current < questions.length) showQuestion();
      else endQuiz();
    }, 700);

    time = 20;
  }
}

// END QUIZ
function endQuiz() {
  clearInterval(timer);
  document.getElementById("quiz").style.display = "none";
  document.getElementById("result").style.display = "block";

  document.getElementById("final-score").innerText =
    `You answered ${score} out of ${questions.length} correctly`;

  const title = document.getElementById("final-title");
  const msg = document.getElementById("final-msg");

  if (score === questions.length) {
    title.innerText = "🏆 Perfect Score!";
    msg.innerText = "Amazing! All correct!";
  } else if (score >= Math.ceil(questions.length / 2)) {
    title.innerText = "🎯 Well Done!";
    msg.innerText = "Good job! Keep practicing!";
  } else {
    title.innerText = "💡 Keep Trying!";
    msg.innerText = "Try again to improve!";
  }
}


