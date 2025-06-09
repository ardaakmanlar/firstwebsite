let count = 0;

const counterDisplay = document.getElementById("counter");
const increaseBtn = document.getElementById("increaseBtn");
const resetBtn = document.getElementById("resetBtn");

increaseBtn.onclick = function () {
  count++;
  counterDisplay.textContent = count;
};

resetBtn.onclick = function () {
  count = 0;
  counterDisplay.textContent = count;
};