const timerDisplay = {
    days: document.getElementById('days'),
    hours: document.getElementById('hours'),
    minutes: document.getElementById('minutes'),
    seconds: document.getElementById('seconds')
};

const countdownInput = document.getElementById('countdownInput');
const startButton = document.getElementById('startButton');
let countdownInterval;

function updateTimer(endTime) {
    const now = new Date().getTime();
    const distance = endTime - now;

    if (distance < 0) {
        clearInterval(countdownInterval);
        alert('Countdown finished!');
        return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    timerDisplay.days.textContent = String(days).padStart(2, '0');
    timerDisplay.hours.textContent = String(hours).padStart(2, '0');
    timerDisplay.minutes.textContent = String(minutes).padStart(2, '0');
    timerDisplay.seconds.textContent = String(seconds).padStart(2, '0');
}

function startCountdown() {
    const countdownDate = new Date(countdownInput.value).getTime();
    localStorage.setItem('countdown', countdownDate);

    clearInterval(countdownInterval);
    updateTimer(countdownDate);
    countdownInterval = setInterval(() => updateTimer(countdownDate), 1000);
}

function loadCountdown() {
    const savedCountdown = localStorage.getItem('countdown');
    if (savedCountdown) {
        countdownInput.value = new Date(parseInt(savedCountdown)).toISOString().slice(0, 16);
        startCountdown();
    }
}

startButton.addEventListener('click', startCountdown);
window.addEventListener('load', loadCountdown);
