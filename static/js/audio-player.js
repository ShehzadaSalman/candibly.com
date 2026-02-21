document.addEventListener("DOMContentLoaded", function () {
  const audioPlayer = document.querySelector(".audio-player-card");
  const playBtn = audioPlayer.querySelector(".play-btn");
  const playIcon = playBtn.querySelector("i");
  const progressBar = audioPlayer.querySelector(".progress");
  const timeDisplay = audioPlayer.querySelector(".time-display");
  const waveSegments = audioPlayer.querySelectorAll(".wave-segment");

  // Audio file
  const audio = new Audio("/static/appointment-booking-recording.mp3");
  let isPlaying = false;

  // Update progress bar and time display
  audio.addEventListener("timeupdate", function () {
    const progress = (audio.currentTime / audio.duration) * 100;
    progressBar.style.width = `${progress}%`;

    // Update time display
    const currentTime = formatTime(audio.currentTime);
    const duration = formatTime(audio.duration);
    timeDisplay.textContent = `${currentTime} / ${duration}`;
  });

  // Toggle play/pause
  playBtn.addEventListener("click", function () {
    if (isPlaying) {
      audio.pause();
      playIcon.classList.remove("fa-pause");
      playIcon.classList.add("fa-play");
      audioPlayer.classList.remove("playing");
    } else {
      audio.play();
      playIcon.classList.remove("fa-play");
      playIcon.classList.add("fa-pause");
      audioPlayer.classList.add("playing");
    }
    isPlaying = !isPlaying;
  });

  // Click on progress bar to seek
  const progressContainer = audioPlayer.querySelector(".progress-container");
  progressContainer.addEventListener("click", function (e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;
    audio.currentTime = (clickX / width) * duration;
  });

  // Audio ended
  audio.addEventListener("ended", function () {
    playIcon.classList.remove("fa-pause");
    playIcon.classList.add("fa-play");
    audioPlayer.classList.remove("playing");
    isPlaying = false;
    progressBar.style.width = "0%";
    timeDisplay.textContent = `0:00 / ${formatTime(audio.duration)}`;
  });

  // Format time (seconds to MM:SS)
  function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    seconds = Math.floor(seconds % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  }

  // Initialize time display
  audio.addEventListener("loadedmetadata", function () {
    timeDisplay.textContent = `0:00 / ${formatTime(audio.duration)}`;
  });

  // Add animation delays to wave segments
  waveSegments.forEach((segment, index) => {
    segment.style.setProperty("--i", index);
  });
});
