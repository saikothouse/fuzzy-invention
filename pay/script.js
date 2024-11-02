// Function to generate QR code
function generateQRCode(crypto) {
    const qrCodeElement = document.getElementById('qr-code');
    qrCodeElement.innerHTML = ''; // Clear previous QR code
    const qrCode = document.createElement('img');
    qrCode.src = `https://api.qrserver.com/v1/create-qr-code/?data=${crypto}&size=200x200`;
    qrCodeElement.appendChild(qrCode);
}

// Function to start a countdown timer
function startTimer(duration) {
    let timer = duration, minutes, seconds;
    const timerDisplay = document.getElementById('timer');

    const interval = setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

 minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        timerDisplay.textContent = `${minutes}:${seconds}`;

        if (--timer < 0) {
            clearInterval(interval);
            timerDisplay.textContent = 'Time\'s up!';
        }
    }, 1000);
}

// Handle cryptocurrency selection
document.addEventListener('click', (event) => {
    if (event.target.classList.contains('crypto-icon')) {
        const crypto = event.target.dataset.crypto;
        generateQRCode(crypto);
        startTimer(300); // Start a 5-minute timer
    }
});
