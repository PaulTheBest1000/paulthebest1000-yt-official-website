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

document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.getElementById('mode-toggle');
  const easterEgg = document.getElementById('easter-egg');

  // Load saved preference
  if(localStorage.getItem('mode') === 'dark') {
    document.body.classList.add('dark-mode');
    document.body.classList.remove('light-mode');
  } else {
    document.body.classList.add('light-mode');
    document.body.classList.remove('dark-mode');
  }

  // Update easter egg color
  function updateEasterEggColor() {
    if (!easterEgg) return;

    if (document.body.classList.contains('dark-mode')) {
        easterEgg.style.color = getComputedStyle(document.documentElement)
                                .getPropertyValue('--text-light').trim();
    } else {
        easterEgg.style.color = getComputedStyle(document.documentElement)
                                .getPropertyValue('--text-dark').trim();
    }
  }

  // Run on load
  updateEasterEggColor();

  // Toggle light/dark mode
  if (toggle) {
    toggle.addEventListener('click', () => {
      document.body.classList.toggle('dark-mode');
      document.body.classList.toggle('light-mode');
      localStorage.setItem('mode', document.body.classList.contains('dark-mode') ? 'dark' : 'light');

      // update easter egg color on toggle
      updateEasterEggColor();
    });
  }

  // Secret function
  window.showSecret = function() {
      alert('You found the secret! Now DM PaulTheBest1000 YT for your surprise!');
  };
});
