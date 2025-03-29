// script.js

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js')
            .then((registration) => {
                console.log('Service Worker registered with scope:', registration.scope);
            })
            .catch((error) => {
                console.log('Service Worker registration failed:', error);
            });
    });
  }
  
  // main.js (or your script.js file)
  
  const startOfflineTime = new Date();
  startOfflineTime.setHours(12, 0, 0, 0); // Set 12:00 PM
  
  const endOfflineTime = new Date();
  endOfflineTime.setHours(19, 30, 0, 0); // Set 7:30 PM
  
  function checkOfflinePeriod() {
      const currentTime = new Date();
  
      // Check if the current time is between the offline start and end time
      if (currentTime >= startOfflineTime && currentTime <= endOfflineTime) {
          // Enable offline behavior
          enableOfflineMode();
      } else {
          // Disable offline behavior
          disableOfflineMode();
      }
  }
  
  function enableOfflineMode() {
      console.log("Website is in offline mode.");
      // Optionally, show a message or activate service worker's caching behavior
  }
  
  function disableOfflineMode() {
      console.log("Website is back online.");
      // Reset to normal behavior
  }
  
  // Check if the site should be offline immediately
  checkOfflinePeriod();
  
  // Optionally, check every minute
  setInterval(checkOfflinePeriod, 60000);
  
// Example: Highlight the active menu item on click
document.querySelectorAll('.menu a').forEach(link => {
    link.addEventListener('click', () => {
        document.querySelector('.menu a.active')?.classList.remove('active');
        link.classList.add('active');
    });
});

document.querySelectorAll('.menu li').forEach(item => {
    item.addEventListener('click', () => {
        const dropdown = item.querySelector('.dropdown');
        if (dropdown) {
            dropdown.classList.toggle('open');
        }
    });
});

// Toggle menu visibility on mobile
const menuToggle = document.querySelector('.menu-toggle');
const menu = document.querySelector('.menu');

menuToggle.addEventListener('click', () => {
    menu.classList.toggle('active');
});


// Handle Dropdown in Mobile
document.querySelectorAll('.menu li').forEach(item => {
    item.addEventListener('click', () => {
        const dropdown = item.querySelector('.dropdown');
        if (dropdown) {
            dropdown.classList.toggle('open');
            item.classList.toggle('active');
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

let playedSongs = [];

// Function to change the audio to a random file and update "Now Playing"
function playRandomMusic() {
    // Filter out the songs that have already been played
    const remainingSongs = musicFiles.filter(song => !playedSongs.includes(song.title));
    
    if (remainingSongs.length === 0) {
        // If all songs have been played, reset the playedSongs list
        playedSongs = [];
    }

    // Pick a random song from the remaining ones
    const randomIndex = Math.floor(Math.random() * remainingSongs.length);
    const selectedMusic = remainingSongs[randomIndex];

    // Update the playedSongs array
    playedSongs.push(selectedMusic.title);

    audioSource.src = selectedMusic.file;
    audio.load();  // Load the new audio file

    // Update "Now Playing" text with the music title
    nowPlaying.textContent = `Now Playing: ${selectedMusic.title}`;

    // Play the selected music
    audio.play();
}

// Add event listener to body to toggle play/pause when the user clicks anywhere
document.body.addEventListener('click', function() {
    if (audio.paused) {
        // If audio is paused, start a random song
        playRandomMusic();
    } else {
        // If audio is playing, pause it
        audio.pause();
    }
});

// When the music ends, pick another random song to play
audio.addEventListener('ended', function() {
    playRandomMusic();
});
