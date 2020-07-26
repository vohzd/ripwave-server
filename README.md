# ripwave server

takes youtube urls, passes it to `youtube-dl`, then `ffmpeg` for conversion to mp3 and splitting into individual tracks

a front-end is here (URL pending) to intelligently gather the track timestamps for splitting albums

## usage
if trying locally, go to `./keys/youtube-api.example.js`, rename to `/keys/youtube-api.js` and put in your youtube api credentials
