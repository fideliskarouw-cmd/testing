// Additional Visual Effects
document.addEventListener('DOMContentLoaded', function() {
    // Random glitch effects
    setInterval(createRandomGlitch, 3000);
    
    // Matrix rain effect in background
    createMatrixEffect();
    
    // Terminal typing effect
    simulateTyping();
});

// Random glitch effect
function createRandomGlitch() {
    const glitchTypes = ['text-glitch', 'color-shift', 'position-shift'];
    const randomType = glitchTypes[Math.floor(Math.random() * glitchTypes.length)];
    
    switch(randomType) {
        case 'text-glitch':
            document.body.classList.add('text-glitch');
            setTimeout(() => document.body.classList.remove('text-glitch'), 100);
            break;
            
        case 'color-shift':
            document.body.classList.add('color-glitch');
            setTimeout(() => document.body.classList.remove('color-glitch'), 200);
            break;
            
        case 'position-shift':
            document.body.style.transform = 'translate(2px, -2px)';
            setTimeout(() => document.body.style.transform = 'translate(0, 0)', 50);
            break;
    }
}

// Matrix rain effect
function createMatrixEffect() {
    const container = document.querySelector('.container');
    const chars = "01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン";
    
    for (let i = 0; i < 20; i++) {
        const drop = document.createElement('div');
        drop.className = 'matrix-drop';
        drop.style.left = Math.random() * 100 + 'vw';
        drop.style.animationDelay = Math.random() * 5 + 's';
        drop.style.opacity = Math.random() * 0.3 + 0.1;
        
        let content = '';
        for (let j = 0; j < 20; j++) {
            content += chars[Math.floor(Math.random() * chars.length)];
        }
        drop.textContent = content;
        
        container.appendChild(drop);
    }
}

// Terminal typing simulation
function simulateTyping() {
    const terminal = document.getElementById('terminal-output');
    const logs = [
        ">> Scanning device memory...",
        ">> Personal files identified...",
        ">> Encryption algorithm: AES-256",
        ">> Establishing remote connection...",
        ">> Connection established with bl3ssing server",
        ">> Ready for decryption code input"
    ];
    
    let currentLog = 0;
    
    function typeNextLog() {
        if (currentLog < logs.length) {
            const log = document.createElement('p');
            log.textContent = logs[currentLog];
            terminal.appendChild(log);
            terminal.scrollTop = terminal.scrollHeight;
            currentLog++;
            
            setTimeout(typeNextLog, Math.random() * 2000 + 1000);
        }
    }
    
    // Start typing after initial logs
    setTimeout(typeNextLog, 4000);
}

// Add CSS for matrix effect
const matrixStyle = document.createElement('style');
matrixStyle.textContent = `
    .matrix-drop {
        position: fixed;
        top: -50px;
        color: #00ff00;
        font-size: 14px;
        font-family: 'Courier New', monospace;
        pointer-events: none;
        z-index: -1;
        animation: matrix-fall linear infinite;
    }
    
    @keyframes matrix-fall {
        0% {
            transform: translateY(-100px);
            opacity: 0;
        }
        10% {
            opacity: 1;
        }
        90% {
            opacity: 1;
        }
        100% {
            transform: translateY(100vh);
            opacity: 0;
        }
    }
    
    .text-glitch * {
        text-shadow: 2px 0 #ff0000, -2px 0 #0000ff !important;
    }
    
    .color-glitch {
        filter: hue-rotate(90deg) !important;
    }
`;
document.head.appendChild(matrixStyle);
