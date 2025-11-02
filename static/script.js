let timeoutId = null;
let isActive = false;
let timeLimit = 5;
let countdown = 0;
let countdownInterval = null;

const editor = document.getElementById('editor');
const startBtn = document.getElementById('startBtn');
const timeLimitInput = document.getElementById('timeLimit');
const timerDisplay = document.getElementById('timer');
const wordCount = document.getElementById('wordCount');
const charCount = document.getElementById('charCount');

startBtn.addEventListener('click', startWriting);
editor.addEventListener('input', handleTyping);

function startWriting() {
    timeLimit = parseInt(timeLimitInput.value);
    isActive = true;
    editor.disabled = false;
    editor.value = '';
    editor.focus();
    editor.classList.remove('danger');
    
    startBtn.textContent = 'Writing...';
    startBtn.disabled = true;
    timeLimitInput.disabled = true;
    
    updateStats();
    resetTimer();
}

function handleTyping() {
    if (!isActive) return;
    
    updateStats();
    resetTimer();
}

function resetTimer() {
    clearTimeout(timeoutId);
    clearInterval(countdownInterval);
    
    countdown = timeLimit;
    updateTimerDisplay();
    editor.classList.remove('danger');
    timerDisplay.classList.remove('warning');
    
    countdownInterval = setInterval(() => {
        countdown--;
        updateTimerDisplay();
        
        if (countdown <= 2) {
            editor.classList.add('danger');
            timerDisplay.classList.add('warning');
        }
        
        if (countdown <= 0) {
            clearInterval(countdownInterval);
        }
    }, 1000);
    
    timeoutId = setTimeout(() => {
        destroyText();
    }, timeLimit * 1000);
}

function updateTimerDisplay() {
    if (isActive) {
        timerDisplay.textContent = `${countdown}s remaining`;
    }
}

function destroyText() {
    if (!isActive) return;
    
    editor.value = '';
    editor.classList.remove('danger');
    timerDisplay.classList.remove('warning');
    timerDisplay.textContent = '💥 Your work has been destroyed!';
    
    setTimeout(() => {
        endSession();
    }, 2000);
}

function endSession() {
    isActive = false;
    editor.disabled = true;
    startBtn.textContent = 'Start Writing';
    startBtn.disabled = false;
    timeLimitInput.disabled = false;
    timerDisplay.textContent = 'Ready to start';
    
    clearTimeout(timeoutId);
    clearInterval(countdownInterval);
    
    updateStats();
}

function updateStats() {
    const text = editor.value;
    const words = text.trim() ? text.trim().split(/\s+/).length : 0;
    const chars = text.length;
    
    wordCount.textContent = words;
    charCount.textContent = chars;
}
