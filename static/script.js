let audioPlayer = null;
let audioUrl = '';

document.getElementById('synthesizeBtn').addEventListener('click', async () => {
    const text = document.getElementById('inputText').value;
    const voice = document.getElementById('voice').value;
    const pitchValue = parseInt(document.getElementById('pitch').value);
    const rateValue = parseInt(document.getElementById('rate').value);

    const pitch = (pitchValue >= 0 ? '+' : '') + pitchValue + "Hz";
    const rate = (rateValue >= 0 ? '+' : '') + rateValue + "%";

    const response = await fetch('/synthesize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, voice, pitch, rate })
    });

    const data = await response.json();

    if (response.ok) {
        audioUrl = data.audio_url + "?t=" + new Date().getTime();

        if (audioPlayer) {
            audioPlayer.pause();
            audioPlayer = null;
            document.getElementById('synthesizeBtn').innerText = 'Play';
            return;
        }

        audioPlayer = new Audio(audioUrl);
        audioPlayer.play();
        document.getElementById('synthesizeBtn').innerText = 'Stop';

        audioPlayer.addEventListener('ended', () => {
            audioPlayer = null;
            document.getElementById('synthesizeBtn').innerText = 'Play';
        });
    } else {
        // Handle errors
        if (data.error.includes("No audio was received")) {
            showNotification("No audio was received. Please verify that your parameters are correct and choose a model for your language.");
        } else {
            showNotification(data.error);
        }
    }
});

document.getElementById('downloadBtn').addEventListener('click', () => {
    if (audioUrl) {
        const link = document.createElement('a');
        link.href = audioUrl;
        link.download = 'output_audio.mp3';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    } else {
        alert('Play the audio first to download it!');
    }
});

document.getElementById('pitch').addEventListener('input', function() {
    document.getElementById('pitchValue').innerText = this.value + "Hz";
});

document.getElementById('rate').addEventListener('input', function() {
    document.getElementById('rateValue').innerText = this.value + "%";
});

const maxChars = 5000;

const inputText = document.getElementById('inputText');
const charCount = document.getElementById('charCount');
const maxCharsSpan = document.getElementById('maxChars');
const synthesizeBtn = document.getElementById('synthesizeBtn');
const warningMessage = document.getElementById('warningMessage');

inputText.addEventListener('input', () => {
    const currentLength = inputText.value.length;
    charCount.textContent = currentLength;

    if (currentLength > maxChars) {
        charCount.classList.add('exceeded');
        maxCharsSpan.classList.add('exceeded');
        warningMessage.style.display = 'inline';
        synthesizeBtn.disabled = true;
    } else {
        charCount.classList.remove('exceeded');
        maxCharsSpan.classList.remove('exceeded');
        warningMessage.style.display = 'none';
        synthesizeBtn.disabled = false;
    }
});

charCount.textContent = inputText.value.length;

function showNotification(message) {
    let notification = document.getElementById('notification');
    if (!notification) {
        notification = document.createElement('div');
        notification.id = 'notification';
        notification.className = 'notification';
        document.body.appendChild(notification);
    }

    notification.textContent = message;

    setTimeout(() => {
        notification.classList.add('show');
        notification.classList.remove('hide');
    }, 10);

    setTimeout(() => {
        notification.classList.add('hide');
        setTimeout(() => {
            notification.classList.remove('show');
        }, 250);
    }, 4000);
}
