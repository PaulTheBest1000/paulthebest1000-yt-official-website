document.getElementById('setAlarm').addEventListener('click', () => {
    let timeLimit = document.getElementById('timeLimit').value;
    let timeUnit = document.getElementById('timeUnit').value;
    let alarmFile = document.getElementById('alarmFile').files[0];
  
    if (timeLimit && alarmFile) {
      // Convert the time limit to minutes based on the selected unit
      let timeLimitInMinutes;
      if (timeUnit === 'seconds') {
        timeLimitInMinutes = timeLimit / 60; // Convert seconds to minutes
      } else if (timeUnit === 'minutes') {
        timeLimitInMinutes = timeLimit; // Already in minutes
      } else if (timeUnit === 'hours') {
        timeLimitInMinutes = timeLimit * 60; // Convert hours to minutes
      }
  
      let reader = new FileReader();
      reader.onload = function(event) {
        // Send settings to background.js
        chrome.runtime.sendMessage(
          {
            action: 'setAlarm',
            timeLimit: timeLimitInMinutes,
            alarmSound: event.target.result, // Send the alarm sound data URL
          },
          (response) => {
            // Ensure the response has the 'status' property
            if (response && response.status) {
              alert(response.status);  // Show success message
            } else {
              alert('Error: Alarm could not be set.');
            }
          }
        );
      };
  
      reader.readAsDataURL(alarmFile); // Convert the file to a data URL
    } else {
      alert('Please provide a time limit and an alarm sound.');
    }
  });
  
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'playAlarmSound') {
      let audio = new Audio(message.alarmSound);
      audio.play();  // Play the alarm sound
    }
  });
  