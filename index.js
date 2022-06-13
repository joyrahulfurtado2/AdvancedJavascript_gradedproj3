let TIME_LIMIT = 60;

let quotes_array = [
  "You can totally do this.",
  "Don't tell people your plans. Show them your results. ",
  "No pressure, no diamonds. Thomas Carlyle.",
  "We can do anything we want to if we stick to it long enough. Helen Keller.",
  "Stay foolish to stay sane.",
  "When nothing goes right, go left.",
  "Try Again. Fail again. Fail better.",
  "Impossible is for the unwilling.",
  "There is no saint without a past, no sinner without a future.",
  "Good things happen to those who hustle.",
];

let timerText = document.querySelector(".curr_time");
let accuracyText = document.querySelector(".curr_accuracy");
let errorText = document.querySelector(".curr_errors");
let cpmText = document.querySelector(".curr_cpm");
let wpmText = document.querySelector(".curr_wpm");
let quoteText = document.querySelector(".quote");
let inputArea = document.querySelector(".input_area");
let restartButton = document.querySelector(".restart_btn");
let cpmGroup = document.querySelector(".cpm");
let wpmGroup = document.querySelector(".wpm");
let errorGroup = document.querySelector(".errors");
let accuracyGroup = document.querySelector(".accuracy");

let timeLeft = TIME_LIMIT;
let timeElapsed = 0;
let totalErrors = 0;
let errors = 0;
let accuracy = 0;
let characterTyped = 0;
let currentQuote = "";
let quoteNo = 0;
let timer = null;

function updateQuote() {
  quoteText.textContent = null;
  currentQuote = quotes_array[quoteNo];

  currentQuote.split("").forEach((char) => {
    const charSpan = document.createElement("span");
    charSpan.innerText = char;
    quoteText.appendChild(charSpan);
  });

  if (quoteNo < quotes_array.length - 1) quoteNo++;
  else quoteNo = 0;
}

function processCurrentText() {
  curr_input = inputArea.value;
  curr_input_array = curr_input.split("");

  characterTyped++;

  errors = 0;

  quoteSpanArray = quoteText.querySelectorAll("span");
  quoteSpanArray.forEach((char, index) => {
    let typedChar = curr_input_array[index];

    if (typedChar == null) {
      char.classList.remove("correct_char");
      char.classList.remove("incorrect_char");
    } else if (typedChar === char.innerText) {
      char.classList.add("correct_char");
      char.classList.remove("incorrect_char");
    } else {
      char.classList.add("incorrect_char");
      char.classList.remove("correct_char");

      errors++;
    }
  });

  errorText.textContent = totalErrors + errors;

  let correctCharacters = characterTyped - (totalErrors + errors);
  let accuracyVal = (correctCharacters / characterTyped) * 100;
  accuracyText.textContent = Math.round(accuracyVal);

  if (curr_input.length == currentQuote.length) {
    updateQuote();

    totalErrors += errors;

    inputArea.value = "";
  }
}

function updateTimer() {
  if (timeLeft > 0) {
    timeLeft--;
    timeElapsed++;
    timerText.textContent = timeLeft + "s";
  } else {
    finishGame();
  }
}

function finishGame() {
  clearInterval(timer);

  inputArea.disabled = true;
  quoteText.textContent = "Click on restart to start a new game.";
  restartButton.style.display = "block";

  cpm = Math.round((characterTyped / timeElapsed) * 60);
  wpm = Math.round((characterTyped / 5 / timeElapsed) * 60);

  cpmText.textContent = cpm;
  wpmText.textContent = wpm;

  cpmGroup.style.display = "block";
  wpmGroup.style.display = "block";
}

function startGame() {
  resetValues();
  updateQuote();
  clearInterval(timer);
  timer = setInterval(updateTimer, 1000);
}

function resetValues() {
  timeLeft = TIME_LIMIT;
  errors = 0;
  timeElapsed = 0;
  cpmGroup.style.display = "none";
  wpmGroup.style.display = "none";
  accuracy = 0;
  totalErrors = 0;
  quoteNo = 0;
  characterTyped = 0;
  quoteText.textContent = "Click on the area below to start the game.";
  inputArea.value = "";
  inputArea.disabled = false;
  restartButton.style.display = "none";
  accuracyText.textContent = 100;
  timerText.textContent = timeLeft + "s";
  errorText.textContent = 0;
}
