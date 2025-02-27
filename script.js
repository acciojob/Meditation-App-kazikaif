//your JS code here. If required.
const app = document.getElementById('app');
const video = document.querySelector('.video');
const playButton = document.querySelector('.play');
const timeDisplay = document.querySelector('.time-display');
const soundPicker = document.querySelectorAll('.sound-picker button');
const timeSelect = document.querySelectorAll('.time-select button');

let isPlaying = false;
let duration = 600;
let timer;

const audio = new Audio('Sounds/beach.mp3');

playButton.addEventListener('click', () => {
    if (isPlaying) {
        audio.pause();
        video.pause();
        clearInterval(timer);
        playButton.textContent = 'Play';
    } else {
        audio.play();
        video.play();
        startTimer();
        playButton.textContent = 'Pause';
    }
    isPlaying = !isPlaying;
});

soundPicker.forEach(button => {
    button.addEventListener('click', function () {
        video.src = this.getAttribute('data-video');
        audio.src = this.getAttribute('data-sound');
        if (isPlaying) {
            audio.play();
            video.play();
        }
    });
});

timeSelect.forEach(button => {
    button.addEventListener('click', function () {
        duration = parseInt(this.id === 'smaller-mins' ? 120 : this.id === 'medium-mins' ? 300 : 600);
        timeDisplay.textContent = `${Math.floor(duration / 60)}:00`;
    });
});

function startTimer() {
    clearInterval(timer);
    timer = setInterval(() => {
        duration--;
        const minutes = Math.floor(duration / 60);
        const seconds = duration % 60;
        timeDisplay.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
        
        if (duration <= 0) {
            audio.pause();
            video.pause();
            clearInterval(timer);
            playButton.textContent = 'Play';
            isPlaying = false;
        }
    }, 1000);
}
