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

  const musicFiles = [ 
    { title: 'Panzerlied - German Military March [Music Box]', file: 'PanzerliedGerman Military March [Music Box].mp3' },
    { title: 'Erika - German Military March Music Box', file: 'yt1s.com - ErikaGerman Military March Music Box.mp3' },
    { title: 'Westerwaldlied - German Military Song Music Box', file: 'yt1s.com - WesterwaldliedGerman Military Song Music Box.mp3' }
];

const audio = document.getElementById('background-music');
const audioSource = document.getElementById('audio-source');
const nowPlaying = document.getElementById('now-playing');
const playBtn = document.getElementById('play-btn');
const pauseBtn = document.getElementById('pause-btn');
const nextBtn = document.getElementById('next-btn');
const prevBtn = document.getElementById('prev-btn');
const playlist = document.getElementById('playlist');

let currentIndex = 0;

// Load a song by index
function loadMusic(index) {
    const song = musicFiles[index];
    audioSource.src = song.file;
    audio.load();
    nowPlaying.textContent = `Now Playing: ${song.title}`;
}

// Play music
function playMusic() {
    audio.play().catch(err => console.log("Autoplay blocked:", err));
}

// Pause music
function pauseMusic() {
    audio.pause();
}

// Next track
function nextMusic() {
    currentIndex = (currentIndex + 1) % musicFiles.length;
    loadMusic(currentIndex);
    playMusic();
}

// Previous track
function prevMusic() {
    currentIndex = (currentIndex - 1 + musicFiles.length) % musicFiles.length;
    loadMusic(currentIndex);
    playMusic();
}

// Auto-play next when current ends
audio.addEventListener('ended', nextMusic);

// Attach button events
playBtn.addEventListener('click', playMusic);
pauseBtn.addEventListener('click', pauseMusic);
nextBtn.addEventListener('click', nextMusic);
prevBtn.addEventListener('click', prevMusic);

// Build playlist UI
musicFiles.forEach((song, index) => {
    const li = document.createElement('li');
    li.textContent = song.title;
    li.style.cursor = 'pointer';
    li.addEventListener('click', () => {
        currentIndex = index;
        loadMusic(currentIndex);
        playMusic();
    });
    playlist.appendChild(li);
});

// Load first track on startup
window.addEventListener('DOMContentLoaded', () => {
    loadMusic(currentIndex);
});
