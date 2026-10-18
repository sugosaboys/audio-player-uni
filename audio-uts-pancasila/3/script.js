const audio = document.getElementById("myAudio");
const playpauseAudio = document.getElementById("playpauseAudio");
const playpauseimg = document.getElementById("playpauseimg");
const rangeAudio = document.getElementById("rangeAudio");
const currentTimeDisplay = document.getElementById("currentTimeDisplay");
const durationDisplay = document.getElementById("durationDisplay");

updateSong();

playpauseAudio.addEventListener("click",() => {
    if(!audio.paused){
        audio.pause();
        playpauseimg.src = "../play-buttton.png"
    }else{
        audio.play();
        playpauseimg.src = "../pause.png"
    }
});

function formatTime(seconds) {
    if (isNaN(seconds)) return "0:00";
    let min = Math.floor(seconds / 60);
    let sec = Math.floor(seconds % 60);
    return `${min}:${sec < 10 ? '0' : ''}${sec}`;
}

function updateSong() {
    audio.onloadedmetadata = function() {
        rangeAudio.value = 0;
        rangeAudio.max = audio.duration;  
        durationDisplay.innerText = formatTime(audio.duration);
    };
};

rangeAudio.addEventListener("input", () => {
    audio.currentTime = rangeAudio.value;
});

audio.addEventListener("timeupdate", () => {
    rangeAudio.value = audio.currentTime;
    currentTimeDisplay.innerText = formatTime(audio.currentTime);
});

function moveSlider() {
    rangeAudio.value = audio.currentTime;
};

setInterval(moveSlider, 1000);