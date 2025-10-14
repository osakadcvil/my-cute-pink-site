// Ambil elemen-elemen dari DOM
const playlistItems = document.querySelectorAll('#playlist li');
const audio = document.getElementById('audio');
const playPauseBtn = document.getElementById('playPauseBtn');
const nextBtn = document.getElementById('nextBtn');
const prevBtn = document.getElementById('prevBtn');
const progressBar = document.getElementById('progressBar');
const currentTimeText = document.getElementById('currentTime');
const durationText = document.getElementById('duration');
const volumeControl = document.getElementById('volumeControl');

let currentTrack = 0;
let isPlaying = false;

// ✅ Pastikan semua elemen ada sebelum dipakai
if (audio && playlistItems.length > 0) {

  // 🎵 Fungsi Memutar Lagu
  function playSong(index) {
    const selected = playlistItems[index];
    if (!selected) return;
    const src = selected.dataset.src;
    if (!src) return;

    audio.src = src;
    audio.play();
    isPlaying = true;
    playPauseBtn.textContent = '⏸ Pause';
    highlightPlaying(index);
  }

  // 🔁 Fungsi Menandai Lagu Aktif
  function highlightPlaying(index) {
    playlistItems.forEach((item, i) => {
      item.classList.toggle('active', i === index);
    });
  }

  // ▶️ ⏸️ Play / Pause
  playPauseBtn.addEventListener('click', () => {
    if (!audio.src) {
      playSong(currentTrack);
    } else if (isPlaying) {
      audio.pause();
      isPlaying = false;
      playPauseBtn.textContent = '▶️ Play';
    } else {
      audio.play();
      isPlaying = true;
      playPauseBtn.textContent = '⏸ Pause';
    }
  });

  // ⏭️ Next
  nextBtn.addEventListener('click', () => {
    currentTrack = (currentTrack + 1) % playlistItems.length;
    playSong(currentTrack);
  });

  // ⏮️ Previous
  prevBtn.addEventListener('click', () => {
    currentTrack = (currentTrack - 1 + playlistItems.length) % playlistItems.length;
    playSong(currentTrack);
  });

  // 🔊 Volume Control
  volumeControl.addEventListener('input', () => {
    audio.volume = volumeControl.value;
  });

  // ⏱️ Update Progress Bar
  audio.addEventListener('timeupdate', () => {
    if (audio.duration) {
      progressBar.max = audio.duration;
      progressBar.value = audio.currentTime;
      currentTimeText.textContent = formatTime(audio.currentTime);
      durationText.textContent = formatTime(audio.duration);
    }
  });

  // Geser progress bar untuk ubah posisi lagu
  progressBar.addEventListener('input', () => {
    audio.currentTime = progressBar.value;
  });

  // Auto-next lagu setelah selesai
  audio.addEventListener('ended', () => {
    currentTrack = (currentTrack + 1) % playlistItems.length;
    playSong(currentTrack);
  });

  // Klik lagu dari playlist
  playlistItems.forEach((item, index) => {
    item.addEventListener('click', () => {
      currentTrack = index;
      playSong(currentTrack);
    });
  });
}

// 🔤 Format waktu (misal: 1:45)
function formatTime(seconds) {
  if (isNaN(seconds)) return '0:00';
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
}
// 🌸 Fade-in saat scroll
const fadeEls = document.querySelectorAll('.fade-in');
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
});
fadeEls.forEach(el => observer.observe(el));

// 💖 Floating hearts background
const heartsContainer = document.createElement('div');
heartsContainer.classList.add('hearts');
document.body.appendChild(heartsContainer);

setInterval(() => {
  const heart = document.createElement('div');
  heart.classList.add('heart');
  heart.textContent = ['💖','💗','💞','💘','💝'][Math.floor(Math.random() * 5)];
  heart.style.left = Math.random() * 100 + 'vw';
  heart.style.animationDuration = 4 + Math.random() * 3 + 's';
  heartsContainer.appendChild(heart);
  setTimeout(() => heart.remove(), 7000);
}, 900);
