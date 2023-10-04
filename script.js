const inputContainer = document.getElementById("input-container");
const CountdownForm = document.getElementById("CountdownForm");
const dateEL = document.getElementById("date-picker");

const countDownEl = document.getElementById("countdown");
const countDownElTitle = document.getElementById("countdown-title");
const countDownBtn = document.getElementById("countdown-button");
const timeElements = document.querySelectorAll("span");
const completeEl = document.getElementById("complete");
const completeInfoEl = document.getElementById("complete-info");
const completeBtn = document.getElementById("complete-button");

const today = new Date().toISOString().split("T")[0];
dateEL.setAttribute("min", today);

const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;

let countDownValue = new Date();

let countDownTitle = "";
let countDownDate = "";
let countDownActive;
let savedCountDown;

function updateDom() {
  countDownActive = setInterval(() => {
    const now = new Date().getTime();
    const distance = countDownValue - now;
    const days = Math.floor(distance / day);
    const hours = Math.floor((distance % day) / hour);
    const minutes = Math.floor((distance % hour) / minute);
    const seconds = Math.floor((distance % minute) / second);

    inputContainer.hidden = true;
    if (distance < 0) {
      completeEl.hidden = false;
      countDownEl.hidden = true;
      completeInfoEl.textContent = `${countDownTitle} was completed on ${countDownDate}`;
    } else {
      countDownElTitle.textContent = `${countDownTitle}`;
      timeElements[0].textContent = `${days}`;
      timeElements[1].textContent = `${hours}`;
      timeElements[2].textContent = `${minutes}`;
      timeElements[3].textContent = `${seconds}`;
      countDownEl.hidden = false;
    }
  }, second);
}

function updatCountDown(e) {
  console.log(e);
  e.preventDefault();
  countDownTitle = e.srcElement[0].value;
  countDownDate = e.srcElement[1].value;
  savedCountDown = {
    title: countDownTitle,
    date: countDownDate,
  };
  localStorage.setItem("countDown", JSON.stringify(savedCountDown));
  if (!countDownDate || !countDownTitle) {
    alert("Please fill both Date and Title to proceed further");
  } else {
    countDownValue = new Date(countDownDate).getTime();
    updateDom();
  }
}

function reset() {
  clearInterval(countDownActive);
  countDownTitle = "";
  countDownDate = "";
  localStorage.removeItem("countDown");
  inputContainer.hidden = false;
  countDownEl.hidden = true;
  completeEl.hidden = true;
}

function restorePreviousCountDown() {
  if (localStorage.getItem("countDown")) {
    inputContainer.hidden = true;
    savedCountDown = JSON.parse(localStorage.getItem("countDown"));
    countDownTitle = savedCountDown.title;
    countDownDate = savedCountDown.date;
    countDownValue = new Date(countDownDate).getTime();
    updateDom();
  }
}

CountdownForm.addEventListener("submit", updatCountDown);
countDownBtn.addEventListener("click", reset);
completeBtn.addEventListener("click", reset);

restorePreviousCountDown();
