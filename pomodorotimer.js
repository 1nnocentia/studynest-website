const timerDisplay = document.getElementById("timer");
const startBtn = document.getElementById("startBtn");
const resetBtn = document.getElementById("resetBtn");
const modeItems = document.querySelectorAll('.mode-item');
const sessionCounter = document.querySelector('.text-white small'); // Menambahkan referensi untuk menampilkan sesi

let durations = {
  pomodoro: 20 * 60,
  short: 5 * 60,
  long: 15 * 60
};

let currentMode = "pomodoro";
let timeLeft = durations[currentMode];
let countdown;
let isRunning = false;
let sessionsCompleted = 0; // Menambahkan variabel untuk menghitung sesi yang selesai

function updateDisplay() {
  let minutes = Math.floor(timeLeft / 60);
  let seconds = timeLeft % 60;
  timerDisplay.textContent = `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
}

function updateSessionCounter() {
  sessionCounter.textContent = `${sessionsCompleted}/5`; // Update tampilan sesi
}

function startTimer() {
  countdown = setInterval(() => {
    if (timeLeft <= 0) {
      clearInterval(countdown);
      isRunning = false;
      startBtn.textContent = "Start";
      sessionsCompleted++; // Increment jumlah sesi yang telah selesai
      updateSessionCounter(); // Update counter sesi

      // Jika 4 sesi Pomodoro selesai, ganti ke Long Break, jika belum, ganti ke Short Break
      if (sessionsCompleted % 5 === 0) {
        currentMode = 'long'; // Setelah 4 sesi pomodoro, ganti ke Long Break
      } else {
        currentMode = 'short'; // Ganti ke Short Break setelah 1 sesi Pomodoro
      }

      timeLeft = durations[currentMode]; // Set waktu untuk mode baru
      updateDisplay();
      new bootstrap.Modal(document.getElementById('doneModal')).show();
      return;
    }
    timeLeft--;
    updateDisplay();
  }, 1000);
}

startBtn.addEventListener("click", () => {
  if (!isRunning) {
    startTimer();
    isRunning = true;
    startBtn.textContent = "Pause";
  } else {
    clearInterval(countdown);
    isRunning = false;
    startBtn.textContent = "Start";
  }
});

resetBtn.addEventListener("click", () => {
  clearInterval(countdown);
  isRunning = false;
  sessionsCompleted = 0; // Reset sesi selesai
  timeLeft = durations[currentMode]; // Reset sesuai tab yang sedang aktif
  updateDisplay();
  updateSessionCounter();
  startBtn.textContent = "Start";
});


modeItems.forEach(item => {
  item.addEventListener("click", () => {
    modeItems.forEach(i => i.classList.remove("active"));
    item.classList.add("active");
    clearInterval(countdown);
    isRunning = false;
    currentMode = item.dataset.mode;
    timeLeft = durations[currentMode];
    updateDisplay();
    updateSessionCounter(); // Update counter sesi saat mode dipilih
    startBtn.textContent = "Start";
  });
});

// Initial display
updateDisplay();
updateSessionCounter(); // Inisialisasi counter sesi

