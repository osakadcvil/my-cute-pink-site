// 🌷 Ambil elemen-elemen dari DOM
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

// ✅ Pastikan elemen-elemen ada sebelum digunakan
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

  // 🔁 Menandai Lagu Aktif
  function highlightPlaying(index) {
    playlistItems.forEach((item, i) => {
      item.classList.toggle('active', i === index);
    });
  }

  // ▶️ / ⏸️ Tombol Play & Pause
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

  // ⏭️ Tombol Next
  nextBtn.addEventListener('click', () => {
    currentTrack = (currentTrack + 1) % playlistItems.length;
    playSong(currentTrack);
  });

  // ⏮️ Tombol Previous
  prevBtn.addEventListener('click', () => {
    currentTrack = (currentTrack - 1 + playlistItems.length) % playlistItems.length;
    playSong(currentTrack);
  });

  // 🔊 Kontrol Volume
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

  // Geser progress bar
  progressBar.addEventListener('input', () => {
    audio.currentTime = progressBar.value;
  });

  // Auto-next lagu
  audio.addEventListener('ended', () => {
    currentTrack = (currentTrack + 1) % playlistItems.length;
    playSong(currentTrack);
  });

  // Klik langsung pada playlist
  playlistItems.forEach((item, index) => {
    item.addEventListener('click', () => {
      currentTrack = index;
      playSong(currentTrack);
    });
  });
}

// 🔤 Format waktu (contoh: 1:45)
function formatTime(seconds) {
  if (isNaN(seconds)) return '0:00';
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
}

// 🌸 Fade-in saat elemen muncul
const fadeEls = document.querySelectorAll('.fade-in');
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target); // berhenti mengamati setelah terlihat
    }
  });
});
fadeEls.forEach(el => observer.observe(el));

// 💖 Floating Hearts Background
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
