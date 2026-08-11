const songs = [
    {
        name: "Dekhne_Walon_Ne_Udit_Narayan.mp3",
        artist: "Playing Now",
        file: "Dekhne_Walon_Ne_Udit_Narayan.mp3"
    },

    {
        name: "Hum_Tumko_Nigah_me.mp3",
        artist: "Playing Now",
        file: "Hum_Tumko_Nigah_me.mp3"
    },

    {
        name: "Kumar_Sanu_Hit_Songs_90s_Superhit.mp3",
        artist: "Playing Now",
        file: "Kumar_Sanu_Hit_Songs_90s_Superhit.mp3"
    }
];


let currentSong = 0;

const audio = document.getElementById("audio");
const playButton = document.getElementById("play");
const nextButton = document.getElementById("next");
const previousButton = document.getElementById("previous");

const songName = document.getElementById("songName");
const artist = document.getElementById("artist");

const progress = document.getElementById("progress");
const currentTime = document.getElementById("currentTime");
const duration = document.getElementById("duration");


// SONG LOAD
function loadSong(index) {

    currentSong = index;

    audio.src = songs[index].file;

    songName.textContent = songs[index].name;

    artist.textContent = songs[index].artist;

}


// PLAY
function playSong() {

    audio.play();

    playButton.textContent = "⏸";

}


// PAUSE
function pauseSong() {

    audio.pause();

    playButton.textContent = "▶";

}


// PLAY / PAUSE BUTTON
playButton.addEventListener("click", () => {

    if (audio.paused) {

        playSong();

    } else {

        pauseSong();

    }

});


// NEXT
nextButton.addEventListener("click", () => {

    currentSong++;

    if (currentSong >= songs.length) {

        currentSong = 0;

    }

    loadSong(currentSong);

    playSong();

});


// PREVIOUS
previousButton.addEventListener("click", () => {

    currentSong--;

    if (currentSong < 0) {

        currentSong = songs.length - 1;

    }

    loadSong(currentSong);

    playSong();

});


// PROGRESS
audio.addEventListener("timeupdate", () => {

    if (audio.duration) {

        let percent =
            (audio.currentTime / audio.duration) * 100;

        progress.value = percent;

        currentTime.textContent =
            formatTime(audio.currentTime);

        duration.textContent =
            formatTime(audio.duration);

    }

});


// PROGRESS BAR CLICK
progress.addEventListener("input", () => {

    if (audio.duration) {

        audio.currentTime =
            (progress.value / 100) * audio.duration;

    }

});


// SONG FINISH → NEXT SONG
audio.addEventListener("ended", () => {

    currentSong++;

    if (currentSong >= songs.length) {

        currentSong = 0;

    }

    loadSong(currentSong);

    playSong();

});


// TIME FORMAT
function formatTime(time) {

    if (isNaN(time)) {

        return "0:00";

    }

    let minutes = Math.floor(time / 60);

    let seconds = Math.floor(time % 60);

    if (seconds < 10) {

        seconds = "0" + seconds;

    }

    return minutes + ":" + seconds;

}


// FIRST SONG
loadSong(0);
