// Encryption System
const CORRECT_CODE = "BlessingPro";
let attempts = 0;
const MAX_ATTEMPTS = 3;

// Initialize encryption system
document.addEventListener('DOMContentLoaded', function() {
    const submitBtn = document.getElementById('submit-code');
    const codeInput = document.getElementById('decryption-code');
    
    submitBtn.addEventListener('click', validateCode);
    
    // Enter key support
    codeInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            validateCode();
        }
    });
});

// Validate decryption code
function validateCode() {
    const userCode = document.getElementById('decryption-code').value.trim();
    attempts++;
    
    if (userCode === CORRECT_CODE) {
        // Correct code - restore system
        correctCodeEntered();
    } else {
        // Wrong code - punishment
        wrongCodeEntered();
    }
}

// Correct code handler
function correctCodeEntered() {
    // Stop timer
    clearInterval(timerInterval);
    
    // Play success sound
    const audio = document.getElementById('alert-sound');
    audio.pause();
    
    // Show success effects
    document.body.classList.add('correct-code');
    
    // Update terminal
    addTerminalLog(">> DECRYPTION CODE ACCEPTED");
    addTerminalLog(">> INITIATING SYSTEM RESTORATION");
    
    // Show restored screen after delay
    setTimeout(() => {
        document.getElementById('main-screen').style.display = 'none';
        document.getElementById('restored-screen').style.display = 'block';
        
        // Start close countdown
        startCloseCountdown();
        
        // Exit fullscreen
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }
    }, 2000);
}

// Wrong code handler
function wrongCodeEntered() {
    // Visual feedback
    document.body.classList.add('wrong-code');
    setTimeout(() => {
        document.body.classList.remove('wrong-code');
    }, 1000);
    
    // Reduce time
    timeLeft -= 15;
    if (timeLeft < 0) timeLeft = 0;
    document.getElementById('timer').textContent = timeLeft;
    
    // Update terminal
    addTerminalLog(`>> WRONG CODE (Attempt ${attempts}/${MAX_ATTEMPTS})`);
    addTerminalLog(">> ENCRYPTION REINFORCED");
    
    // Clear input
    document.getElementById('decryption-code').value = '';
    
    // Max attempts reached
    if (attempts >= MAX_ATTEMPTS) {
        addTerminalLog(">> MAX ATTEMPTS REACHED");
        addTerminalLog(">> ACTIVATING PERMANENT LOCK");
        document.getElementById('decryption-code').disabled = true;
        document.getElementById('submit-code').disabled = true;
        timeLeft = 10;
    }
}

// Close countdown
function startCloseCountdown() {
    let closeTime = 5;
    const closeTimerElement = document.getElementById('close-timer');
    
    const closeInterval = setInterval(() => {
        closeTime--;
        closeTimerElement.textContent = closeTime;
        
        if (closeTime <= 0) {
            clearInterval(closeInterval);
            closeApplication();
        }
    }, 1000);
}

// Close application
function closeApplication() {
    // Try to close window
    if (window.close) {
        window.close();
    } else {
        // Fallback for browsers that block window.close()
        document.body.innerHTML = `
            <div class="closing-screen">
                <h1>Application Closed</h1>
                <p>You can now close this tab</p>
            </div>
        `;
    }
}
