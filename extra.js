const workerURL = "https://yt-proxy.paulandsam1000.workers.dev/"; // Your Worker URL

fetch(workerURL)
  .then(response => response.json())
  .then(data => {
    if (data.error) {
      console.error("Worker error:", data.error);
      document.getElementById('count').textContent = "Error fetching data";
      document.getElementById('channel-caption').textContent = "Couldn’t fetch channel info!";
      return;
    }

    // Update subscriber count
    const countEl = document.getElementById('count');
    if (countEl) {
      countEl.textContent = `${data.subscriberCount} Subscribers`;
    }

    // Update channel image
    const img = document.getElementById('channel-image');
    if (img) {
      img.src = data.thumbnail;
      img.alt = data.title;
    }

    // Update caption
    const caption = document.getElementById('channel-caption');
    if (caption) {
      caption.textContent = `This is what ${data.title} looks like right now!`;
    }
  })

const audio = document.getElementById('background-music');
const audioSource = document.getElementById('audio-source');
const nowPlaying = document.getElementById('now-playing');
const fileSize = document.getElementById('file-size');

const playBtn = document.getElementById('play-btn');
const pauseBtn = document.getElementById('pause-btn');
const nextBtn = document.getElementById('next-btn');
const prevBtn = document.getElementById('prev-btn');

const categorySelect = document.getElementById('music-category');

// Update Play/Pause button states
function updateButtonStates() {
    playBtn.disabled = !audio.paused;
    pauseBtn.disabled = audio.paused;
}

let musicFiles = [];
let currentIndex = 0;

async function loadMusicFiles(category = 'production') {
    if (typeof category !== 'string') {
        category = 'production';
    }

    try {
        const response = await fetch('music.json');
        const data = await response.json();

        if (!Array.isArray(data[category])) {
            console.error(`Music category "${category}" was not found in music.json.`);
            return;
        }

        musicFiles = data[category].map(file => ({
            title: file.split('/').pop().replace(/\.mp3$/i, ''),
            file: file
        }));

        currentIndex = 0;

        if (musicFiles.length > 0) {
            loadMusic(currentIndex);
        }

        updateButtonStates();
    } catch (error) {
        console.error('Could not load music:', error);
    }
}

categorySelect.addEventListener('change', () => {
    audio.pause();
    loadMusicFiles(categorySelect.value);
});

window.addEventListener('DOMContentLoaded', () => {
    loadMusicFiles('production');
});

// Get and display the file size
async function updateFileSize(file) {
    try {
        const response = await fetch(file, { method: 'HEAD' });
        const size = response.headers.get('Content-Length');

        if (size) {
            const bytes = Number(size);
            const mb = (bytes / (1024 * 1024)).toFixed(2);

            fileSize.textContent = `File Size: ${mb} MB`;
        } else {
            fileSize.textContent = 'File Size: Unknown';
        }
    } catch (error) {
        console.error('Could not get file size:', error);
        fileSize.textContent = 'File Size: Unknown';
    }
}

// Load a song by index
function loadMusic(index) {
    const song = musicFiles[index];

    audioSource.src = song.file;
    audio.load();

    nowPlaying.textContent = `Now Playing: ${song.title}`;

    updateFileSize(song.file);

    updateButtonStates();
}

// Play music
function playMusic() {
    audio.play().catch(err => {
        console.log("Autoplay blocked:", err);
    });
}

// Pause music
function pauseMusic() {
    audio.pause();
}

// Next track
function nextMusic() {
    if (musicFiles.length === 0) return;

    currentIndex = (currentIndex + 1) % musicFiles.length;
    loadMusic(currentIndex);
    playMusic();
}

// Previous track
function prevMusic() {
    if (musicFiles.length === 0) return;

    currentIndex =
        (currentIndex - 1 + musicFiles.length) % musicFiles.length;

    loadMusic(currentIndex);
    playMusic();
}

// Update buttons when audio starts/stops
audio.addEventListener('play', updateButtonStates);
audio.addEventListener('pause', updateButtonStates);

// Auto play next when current ends
audio.addEventListener('ended', () => {
    updateButtonStates();
    nextMusic();
});

// Attach button events
playBtn.addEventListener('click', playMusic);
pauseBtn.addEventListener('click', pauseMusic);
nextBtn.addEventListener('click', nextMusic);
prevBtn.addEventListener('click', prevMusic);
