// server.js (Node.js with Express)
const express = require('express');
const fetch = require('node-fetch');
const app = express();

const apiKey = 'AIzaSyC2lr9udYtnmq9a2gGT9WX9YSajEnt_C3c';  // API key here
const channelId = 'UCe4H2F2AWwItE23ookYaGag';  // Channel ID here

app.get('/get-subscriber-count', async (req, res) => {
  try {
    const response = await fetch(`https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${channelId}&key=${apiKey}`);
    const data = await response.json();
    const subscriberCount = data.items[0].statistics.subscriberCount;
    res.json({ subscriberCount });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching data' });
  }
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
