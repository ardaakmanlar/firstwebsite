const timerDisplay = document.getElementById("timer");
const button = document.getElementById("clickButton");
const statusMsg = document.getElementById("statusMessage");

let state = localStorage.getItem('state') || 'countdown';
let endTime = Number(localStorage.getItem('endTime')) || Date.now() + 24 * 60 * 60 * 1000;
let clicked = localStorage.getItem('clicked') === 'true';

// Süre formatlama
function formatTime(ms) {
  let totalSeconds = Math.floor(ms / 1000);
  let hours = Math.floor(totalSeconds / 3600);
  let minutes = Math.floor((totalSeconds % 3600) / 60);
  let seconds = totalSeconds % 60;
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

// Sayacı başlatma
function startCountdown(onComplete) {
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

// Alarm döngüsünü başlat
function startAlarmCycle() {
  state = "countdown";
  clicked = false;
  button.style.display = "none";
  button.disabled = false;
  statusMsg.textContent = "24-hour countdown started.";
  endTime = Date.now() +  60 * 1000;
  localStorage.setItem('state', state);
  localStorage.setItem('endTime', endTime);
  localStorage.setItem('clicked', clicked);
  startCountdown(startClickWindow);
}

// 10 dk'lık tıklama süresini başlat
function startClickWindow() {
  state = "clickWindow";
  clicked = false;
  button.style.display = "inline-block";
  button.disabled = false;
  statusMsg.textContent = "Click the button within 10 minutes or lose!";
  endTime = Date.now() + 10 * 1000;
  localStorage.setItem('state', state);
  localStorage.setItem('endTime', endTime);
  localStorage.setItem('clicked', clicked);
  
  startCountdown(() => {
    if (!clicked) {
      statusMsg.textContent = "⛔ Game Over! You didn't click in time.";
      button.disabled = true;
    } else {
      statusMsg.textContent = "✅ You survived! Restarting 24-hour timer.";
      button.style.display = "none";
      setTimeout(startAlarmCycle, 2000);
    }
  });
}

// Butona tıklanma işlemi
button.onclick = () => {
  if (state === "clickWindow" && !clicked) {
    clicked = true;
    localStorage.setItem('clicked', clicked);
    statusMsg.textContent = "🟢 You clicked in time!";
    button.style.display = "none";
  }
};

// Sayfa açılınca önceki durumu yükleme
window.onload = () => {
  if (state === "countdown") {
    statusMsg.textContent = "24-hour countdown continues.";
    button.style.display = "none";
    startCountdown(startClickWindow);
  } else if (state === "clickWindow") {
    if (clicked) {
      statusMsg.textContent = "🟢 You clicked! Next alarm soon.";
      button.style.display = "none";
      setTimeout(startAlarmCycle, 2000);
    } else {
      button.style.display = "inline-block";
      statusMsg.textContent = "Click the button within remaining time!";
      startCountdown(() => {
        if (!clicked) {
          statusMsg.textContent = "⛔ Game Over! You didn't click in time.";
          button.disabled = true;
        }
      });
    }
  }
};
