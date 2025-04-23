const audio = document.getElementById('alarmAudio');
chrome.storage.local.get('alarmSound', (result) => {
  if (result.alarmSound) {
    audio.src = result.alarmSound;
    audio.play();
  }
});

function dismissAlarm() {
  audio.pause();
  window.close();
}

function snoozeAlarm() {
  audio.pause();
  chrome.runtime.sendMessage({ action: 'snoozeAlarm', minutes: 5 });
  window.close();
}