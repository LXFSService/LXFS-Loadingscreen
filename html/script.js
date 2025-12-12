const musicToggleBtn = document.getElementById('music-toggle');
const backgroundMusic = document.getElementById('background-music');
const progressBar = document.getElementById('progress-bar');
const currentTimeElem = document.getElementById('current-time');
const durationElem = document.getElementById('duration');

let musicPlaying = false;

// ✔ Musik ist von Anfang an leise
backgroundMusic.volume = 0.1;

musicToggleBtn.addEventListener('click', () => {
    if (musicPlaying) {
        backgroundMusic.pause();
        musicToggleBtn.textContent = '🎵 Musik aus';
    } else {
        // ✔ Musik wird mit leiser Lautstärke gestartet
        backgroundMusic.volume = 0.1;
        backgroundMusic.play();
        musicToggleBtn.textContent = '🎵 Musik an';
    }
    musicPlaying = !musicPlaying;
});

backgroundMusic.addEventListener('loadedmetadata', () => {
    progressBar.max = backgroundMusic.duration;
    durationElem.textContent = formatTime(backgroundMusic.duration);
});

backgroundMusic.addEventListener('timeupdate', () => {
    progressBar.value = backgroundMusic.currentTime;
    currentTimeElem.textContent = formatTime(backgroundMusic.currentTime);
});

progressBar.addEventListener('input', () => {
    backgroundMusic.currentTime = progressBar.value;
});

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? '0' + secs : secs}`;
}
