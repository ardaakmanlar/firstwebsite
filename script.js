let state = "countdown";
let timerDisplay = document.getElementById("timer");
let button = document.getElementById("clickButton");
let statusMsg = document.getElementById("statusMessage");

let clicked = false;

function formatTime(ms) {
  let totalSeconds = Math.floor(ms / 1000);
  let hours = Math.floor(totalSeconds / 3600);
  let minutes = Math.floor((totalSeconds % 3600) / 60);
  let seconds = totalSeconds % 60;
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function startCountdown(duration, onComplete) {
  let endTime = Date.now() + duration;
  let interval = setInterval(() => {
    let remaining = endTime - Date.now();
    if (remaining <= 0) {
      clearInterval(interval);
      timerDisplay.textContent = "00:00:00";
      onComplete();
    } else {
      timerDisplay.textContent = formatTime(remaining);
    }
  }, 1000);
}

function startClickWindow() {
  state = "clickWindow";
  clicked = false;
  button.disabled = false;
  button.style.display = "inline-block";
  statusMsg.textContent = "Click the button within 10 minutes or lose!";

  startCountdown(10 * 60 * 1000, () => {
    if (!clicked) {
      statusMsg.textContent = "⛔ Game Over! You didn't click in time.";
      button.disabled = true;
    } else {
      statusMsg.textContent = "✅ You survived! Restarting 24-hour timer.";
      button.style.display = "none";
      setTimeout(() => {
        statusMsg.textContent = "";
        startAlarmCycle();
      }, 2000);
    }
  });
}

button.onclick = () => {
  if (state === "clickWindow" && !clicked) {
    clicked = true;
    button.disabled = true;
    statusMsg.textContent = "🟢 You clicked in time!";
    button.style.display = "none";
  }
};

function startAlarmCycle() {
  state = "countdown";
  button.style.display = "none";
  statusMsg.textContent = "24-hour countdown started.";

  // Gerçek kullanım (24 saat):
  //startCountdown(24 * 60 * 60 * 1000, startClickWindow);

  // Test için (30 saniye sonra başlar):
   startCountdown(30 * 1000, startClickWindow);
}

// Programı başlat:
startAlarmCycle();