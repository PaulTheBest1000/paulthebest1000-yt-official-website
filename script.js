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

document.addEventListener("DOMContentLoaded", function () {
    const morseDict = {
        'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.', 'F': '..-.',
        'G': '--.', 'H': '....', 'I': '..', 'J': '.---', 'K': '-.-', 'L': '.-..',
        'M': '--', 'N': '-.', 'O': '---', 'P': '.--.', 'Q': '--.-', 'R': '.-.',
        'S': '...', 'T': '-', 'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-',
        'Y': '-.--', 'Z': '--..', '1': '.----', '2': '..---', '3': '...--',
        '4': '....-', '5': '.....', '6': '-....', '7': '--...', '8': '---..',
        '9': '----.', '0': '-----', ' ': '/'
    };

    const textToMorse = (text) => {
        return text.toUpperCase().split('').map(char => morseDict[char] || '?').join(' ');
    };

    const generateMorseAudio = (morseCode, callback) => {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const sampleRate = 44100;
        const dotDuration = 0.1; // seconds
        const dashDuration = 3 * dotDuration;
        const silenceDuration = 0.1;
        
        let audioBuffer = [];
        
        const createTone = (duration) => {
            let length = Math.floor(sampleRate * duration);
            let buffer = new Float32Array(length);
            for (let i = 0; i < length; i++) {
                buffer[i] = Math.sin(2 * Math.PI * 800 * i / sampleRate);
            }
            return buffer;
        };

        morseCode.split('').forEach(symbol => {
            if (symbol === '.') {
                audioBuffer.push(...createTone(dotDuration));
            } else if (symbol === '-') {
                audioBuffer.push(...createTone(dashDuration));
            }
            audioBuffer.push(...new Float32Array(Math.floor(sampleRate * silenceDuration)));
        });

        let audioData = new Float32Array(audioBuffer);
        let audioBlob = new Blob([new DataView(float32ToWav(audioData, sampleRate))], { type: "audio/wav" });
        
        callback(audioBlob);
    };

    function float32ToWav(float32Array, sampleRate) {
        let buffer = new ArrayBuffer(44 + float32Array.length * 2);
        let view = new DataView(buffer);
        let writeString = (offset, string) => [...string].forEach((char, i) => view.setUint8(offset + i, char.charCodeAt(0)));

        writeString(0, 'RIFF');
        view.setUint32(4, 32 + float32Array.length * 2, true);
        writeString(8, 'WAVE');
        writeString(12, 'fmt ');
        view.setUint32(16, 16, true);
        view.setUint16(20, 1, true);
        view.setUint16(22, 1, true);
        view.setUint32(24, sampleRate, true);
        view.setUint32(28, sampleRate * 2, true);
        view.setUint16(32, 2, true);
        view.setUint16(34, 16, true);
        writeString(36, 'data');
        view.setUint32(40, float32Array.length * 2, true);

        let offset = 44;
        for (let i = 0; i < float32Array.length; i++) {
            let sample = Math.max(-1, Math.min(1, float32Array[i]));
            view.setInt16(offset, sample < 0 ? sample * 0x8000 : sample * 0x7FFF, true);
            offset += 2;
        }

        return buffer;
    }

    document.getElementById("convertBtn").addEventListener("click", function () {
        let inputText = document.getElementById("inputText").value.trim();
        let conversionType = document.getElementById("conversionType").value;
        let output = "";

        if (conversionType === "textToMorse") {
            output = textToMorse(inputText);
        } else if (conversionType === "textToMorseAudio") {
            let morseCode = textToMorse(inputText);
            generateMorseAudio(morseCode, function(audioBlob) {
                let downloadBtn = document.getElementById("downloadBtn");
                let url = URL.createObjectURL(audioBlob);

                // Show download button and set up the download link
                downloadBtn.href = url;
                downloadBtn.download = "morse_audio.wav";
                downloadBtn.style.display = "block";
            });
            output = "🔊 Morse audio generated! Click download.";
        } else if (conversionType === "morseToText") {
            output = morseToText(inputText); // Implement morseToText if needed
        }

        document.getElementById("outputText").value = output;
    });
});
