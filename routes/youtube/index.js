const express                             = require("express");
const router                              = express.Router();

const { errorHandler }                    = require("../../helpers/errorHandler.js");

const {
  retreiveChannel,
  retreiveChannelPlaylists,
  retreiveVideo
}                                         = require("../../services/youtube-api/index.js");

const {
  downloadVideo
}                                         = require("../../services/youtube-dl/index.js");

const {
  convertToMp3
}                                         = require("../../services/ffmpeg/index.js");

router.get("/youtube/video/:id" , async (req, res) => {
  try {
    const data = await retreiveVideo(req.params.id);
    return res.send(data);
  }
  catch (e){ return errorHandler(res, e); }
});

router.get("/youtube/download/:id" , async (req, res) => {
  try {
    const id = req.params.id;
    const { fileName } = await downloadVideo(id);
    await convertToMp3(fileName, id);
    return res.send("success");

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
