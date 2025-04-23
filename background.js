chrome.runtime.onInstalled.addListener(() => {
  console.log("PC Usage Alarm Extension Installed");
});

chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === 'usage_alarm') {
    chrome.notifications.create({
      type: 'basic',
      iconUrl: 'icon.png',
      title: 'PC Usage Time Up!',
      message: 'Your time limit has been reached. Please take a break.',
      priority: 2
    });

    // Retrieve the alarm sound from chrome.storage.local
    chrome.storage.local.get('alarmSound', (result) => {
      if (result.alarmSound) {
        // Send the alarm sound data to the popup or content script
        chrome.runtime.sendMessage({
          action: 'playAlarmSound',
          alarmSound: result.alarmSound
        });
      }
    });

    // Optionally repeat the warning if an interval is set
    chrome.storage.local.get('warnInterval', (result) => {
      let warnInterval = result.warnInterval;
      if (warnInterval) {
        setInterval(() => {
          chrome.storage.local.get('alarmSound', (result) => {
            if (result.alarmSound) {
              chrome.runtime.sendMessage({
                action: 'playAlarmSound',
                alarmSound: result.alarmSound
              });
            }
          });
        }, warnInterval * 60 * 1000); // Warn every X minutes
      }
    });

    // Open a new window for the alarm dialog
    chrome.windows.create({
      url: 'alarm.html',
      type: 'popup',
      width: 400,
      height: 300
    });
  }
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'setAlarm') {
    let timeLimit = message.timeLimit;
    let alarmSound = message.alarmSound;
    let warnInterval = message.warnInterval;

    // Store the alarm sound and warn interval in chrome storage
    chrome.storage.local.set({ 'alarmSound': alarmSound, 'warnInterval': warnInterval }, () => {
      // Set the alarm with the calculated delay
      chrome.alarms.create('usage_alarm', { delayInMinutes: timeLimit });

      // Respond that the alarm was set successfully
      sendResponse({ status: 'Alarm set successfully!' });
    });

    return true; // Ensures the async response is properly handled
  }
});
