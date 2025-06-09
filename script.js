const flowerImage = document.getElementById("flowerImage");
const streakText = document.getElementById("streak");
const waterButton = document.getElementById("waterButton");
const statusMessage = document.getElementById("statusMessage");

let streak = Number(localStorage.getItem("streak")) || 0;
let lastWateredDay = localStorage.getItem("lastWateredDay") || "";

function getTodayDate() {
  return new Date().toISOString().slice(0, 10);
}

function updateUI() {
  streakText.textContent = `Streak: ${streak} gün`;
  flowerImage.src = `https://source.unsplash.com/featured/?flower&t=${Date.now()}`;
  statusMessage.textContent = "Bugünün sulaması yapıldı!";
  localStorage.setItem("streak", streak);
  localStorage.setItem("lastWateredDay", getTodayDate());
}

waterButton.onclick = () => {
  const today = getTodayDate();

  if (lastWateredDay === today) {
    statusMessage.textContent = "Bugün zaten sulama yaptın!";
    return;
  }

  const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
  if (lastWateredDay === yesterday) {
    streak += 1;
  } else {
    streak = 1;
  }

  lastWateredDay = today;
  updateUI();
};

window.onload = () => {
  streak = Number(localStorage.getItem("streak")) || 0;
  lastWateredDay = localStorage.getItem("lastWateredDay") || "";
  streakText.textContent = `Streak: ${streak} gün`;
  flowerImage.src = `https://source.unsplash.com/featured/?flower&t=${Date.now()}`;
};
