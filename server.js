const express = require('express');
const ytdl = require('ytdl-core');
const cors = require('cors');

const app = express();
app.use(cors());

app.get('/download', async (req, res) => {
  const { videoId } = req.query;
  if (!videoId) return res.status(400).send('Missing videoId');

  try {
    const url = `https://www.youtube.com/watch?v=${videoId}`;
    res.header('Content-Disposition', 'attachment; filename="video.mp4"');
    ytdl(url, {
      format: 'mp4',
      quality: 'highestvideo'
    }).pipe(res);
  } catch (e) {
    res.status(500).send('Error: ' + e.message);
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
