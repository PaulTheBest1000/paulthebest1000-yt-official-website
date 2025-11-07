// script.js

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('service-worker.js')
            .then((registration) => {
                console.log('Service Worker registered with scope:', registration.scope);
            })
            .catch((error) => {
                console.log('Service Worker registration failed:', error);
            });
    });
  }
  
  // main.js (or your script.js file)

  // You don’t need to manually handle beforeinstallprompt anymore!
  window.addEventListener('beforeinstallprompt', (e) => {
    console.log('beforeinstallprompt event fired');
    // Do NOT call e.preventDefault()
    // Chrome will automatically show the install banner
  });

  // Select the hamburger button and menu
  const menuToggle = document.querySelector('.menu-toggle');
  const menu = document.querySelector('.menu');

  // Toggle the 'active' class on click
  menuToggle.addEventListener('click', () => {
    menu.classList.toggle('active');
  });

  // Optional: Toggle dropdowns on mobile when clicking a parent item
  const menuItems = document.querySelectorAll('.menu-item > a');

  menuItems.forEach(item => {
    item.addEventListener('click', (e) => {
      if (window.innerWidth <= 768) {
        e.preventDefault(); // Prevent default link behavior
        const parentLi = item.parentElement;
        parentLi.classList.toggle('active');
      }
    });
  });
  
// Function to update the time
function updateTime() {
    const timeElement = document.getElementById('time');
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    timeElement.innerHTML = `Current Time: ${hours}:${minutes}:${seconds}`;
}

// Function to update the calendar date
function updateCalendar() {
    const calendarElement = document.getElementById('calendar');
    const now = new Date();
    const day = now.getDate();
    const month = now.getMonth() + 1; // months are 0-indexed
    const year = now.getFullYear();
    const dayOfWeek = now.toLocaleString('default', { weekday: 'long' });

    calendarElement.innerHTML = `Today: ${dayOfWeek}, ${month}/${day}/${year}`;
}

setInterval(updateTime, 1000); // Keep updating time every second
setInterval(updateCalendar, 60000); // Update calendar every minute (60000 ms)

// Initialize the time and calendar display
updateTime();
updateCalendar();

function showMessage() {
    alert('This website is made by PaulTheBest1000™');
}

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

    // Replace with your actual API Key and Channel ID
    const apiKey = 'AIzaSyC2lr9udYtnmq9a2gGT9WX9YSajEnt_C3c'; // Replace with your API key
    const channelId = 'UCe4H2F2AWwItE23ookYaGag'; // Replace with your YouTube Channel ID

    fetch(`https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics&id=${channelId}&key=${apiKey}`)
    .then(response => response.json())
    .then(data => {
      const channel = data.items[0];
      const snippet = channel.snippet;
      const stats = channel.statistics;

      // Update subscriber count
      document.getElementById('count').textContent = `${stats.subscriberCount} Subscribers`;

      // Update channel image
      const img = document.getElementById('channel-image');
      img.src = snippet.thumbnails.high.url;
      img.alt = snippet.title;

      // Update caption with channel name
      document.getElementById('channel-caption').textContent = `This is what ${snippet.title} looks like right now!`;
    })
    .catch(error => {
      console.error('Error fetching channel data:', error);
      document.getElementById('count').textContent = 'Error fetching data';
      document.getElementById('channel-caption').textContent = 'Couldn’t fetch mech details!';
    });
    