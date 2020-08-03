const express                             = require("express");
const router                              = express.Router();

const { errorHandler }                    = require("../helpers/errorHandler.js");

const {
  retreiveChannel,
  retreiveChannelPlaylists,
  retreiveVideo
}                                         = require("../services/youtube-api/index.js");

const {
  downloadVideo
}                                         = require("../services/youtube-dl/index.js");

const {
  convertToMp3,
  splitMp3
}                                         = require("../services/ffmpeg/index.js");

router.get("/youtube/video/:id" , async (req, res) => {
  /*
   * Gets metadata about a youtube video using the official api
   */
  try {
    const data = await retreiveVideo(req.params.id);
    return res.send(data);
  }
  catch (e){ return errorHandler(res, e) }
});

router.get("/youtube/download/:id" , async (req, res) => {
  /*
   * downloads a youtube ID to a video file using youtube-dl
   * the file is saved to data/downloaded/ID.FILEEXT
   */
  try {
    const id = req.params.id;
    const { fileName } = await downloadVideo(id);
    return res.send({ fileName });
  }
  catch (e){ return errorHandler(res, e) }
});

router.post("/convert/mp3" , async (req, res) => {
  /*
   * converts a file on disk to mp3 using ffmpeg
   * the file is saved to data/converted/ID.mp3
   */
  try {
    const fileName = req.body.fileName;
    const { audioFile } = await convertToMp3(fileName);
    return res.send({ audioFile });
  }
  catch (e){
    console.log(e)
    return errorHandler(res, e);
  }
});

router.post("/split/mp3" , async (req, res) => {
  /*
   * uses ffmpeg to split an mp3 into chunks according to timestamps
   * the file is saved to data/converted/ID.mp3
   */
  try {

    /*
    const fileName = req.body.fileName;
    const { audioFile } = await convertToMp3(fileName);
    return res.send({ audioFile });*/

    console.log("whassup")
    console.log(req.body);

    splitMp3(req.body);
  }
  catch (e){
    console.log(e)
    return errorHandler(res, e);
  }
});


/*
// refer to this:
// https://developers.google.com/youtube/v3/docs/playlistItems/list

// workflow for all videos channels -> playlists -> platlistItems -> video
router.get("/youtube/channel/:id" , async (req, res) => {

  console.log("inside channel req...");
  console.log(req.params)
  //console.log(req.params.id)
  const { data } = await retreiveChannelPlaylists(req.params.id);
  console.log(data);

  res.send({
    "success": true
  });

});
*/



module.exports = router;
