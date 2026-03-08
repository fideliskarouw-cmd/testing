// Mobile Detection and Fullscreen
function initializeHack() {
    // Deteksi perangkat mobile
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    if (isMobile) {
        // Auto fullscreen
        document.addEventListener('click', function() {
            if (document.documentElement.requestFullscreen) {
                document.documentElement.requestFullscreen();
            } else if (document.documentElement.webkitRequestFullscreen) {
                document.documentElement.webkitRequestFullscreen();
            } else if (document.documentElement.msRequestFullscreen) {
                document.documentElement.msRequestFullscreen();
            }
        });
        
        // Auto-download file terenkripsi
        setTimeout(() => {
            downloadEncryptedFile();
        }, 3000);
    }
    
    // Start efek suara
    playAlertSound();
    
    // Start countdown
    startCountdown();
}

// Download file terenkripsi
function downloadEncryptedFile() {
    // Membuat file ZIP dummy terenkripsi
    const encryptedContent = "This is an encrypted ZIP file. Password: BlessingPro\n\n" +
                           "Your files have been encrypted by bl3ssing.\n" +
                           "Enter the password to decrypt.";
    
    const blob = new Blob([encryptedContent], { type: 'application/zip' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Encrypted_Files.zip';
    link.style.display = 'none';
    document.body.appendChild(link);
    
    // Auto click setelah 2 detik
    setTimeout(() => {
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
        
        // Update terminal
        addTerminalLog(">> Encrypted file downloaded to device");
    }, 2000);
}

// Play alert sound
function playAlertSound() {
    const audio = document.getElementById('alert-sound');
    audio.volume = 0.3;
    audio.play().catch(e => console.log("Audio play failed:", e));
}

// Countdown timer
let timeLeft = 60;
let timerInterval;

function startCountdown() {
    const timerElement = document.getElementById('timer');
    
    timerInterval = setInterval(() => {
        timeLeft--;
        timerElement.textContent = timeLeft;
        
        // Update terminal setiap 10 detik
        if (timeLeft % 10 === 0) {
            addTerminalLog(`>> ${timeLeft} seconds remaining`);
        }
        
        // Efek saat waktu hampir habis
        if (timeLeft <= 10) {
            document.body.classList.add('critical-time');
        }
        
        // Waktu habis
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            triggerDataDestruction();
        }
    }, 1000);
}

// Data destruction effect
function triggerDataDestruction() {
    addTerminalLog(">> TIME EXPIRED");
    addTerminalLog(">> INITIATING DATA DESTRUCTION");
    
    document.body.innerHTML = `
        <div class="destruction-screen">
            <h1 class="destruction-glitch">💀 DATA DESTROYED 💀</h1>
            <p class="destruction-text">All files have been permanently deleted</p>
            <p class="destruction-sub">bl3ssing was here</p>
        </div>
    `;
}

// Add log to terminal
function addTerminalLog(message) {
    const terminal = document.getElementById('terminal-output');
    const log = document.createElement('p');
    log.textContent = message;
    terminal.appendChild(log);
    terminal.scrollTop = terminal.scrollHeight;
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', initializeHack);
