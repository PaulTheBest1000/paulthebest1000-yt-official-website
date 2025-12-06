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
