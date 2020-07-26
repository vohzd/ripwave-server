/*
 *
 * THIS USES EXEC, BUT TRYING SPAWN FOR THE REASONS OUTLINED HERE>>>
 * https://stackoverflow.com/questions/42012342/running-ffmpeg-via-nodejs-error
 *
 */

const { spawn }     = require("child_process");

const path          = require("path");
const rootDir       = path.resolve();

async function convertToMp3(fileName, id){
  console.log("SERVICE: convertToMp3")

  return new Promise((resolve, reject) => {
    console.log(fileName)

    /*
     * create input/output paths according to taste
     */


    const audioOutputPath = `${rootDir}/data/converted/${id}.mp3`;
    //const videoPath = `${rootDir}/data/downloaded/${fileName}`;
    const videoPath = `C:/dev/ripwave/data/downloaded/${fileName}`

    console.log("AUDIO PATH")
    console.log(audioOutputPath)
    console.log("VIDEO PATH")
    console.log(videoPath)

    /*
     * the args ffmpeg takes
     * final command looks something like this;
     * ffmpeg -i INPUTVIDEO.mkv -f mp3 OUTPUTAUDIO.mp3
     */

    const args = [
      "-i", videoPath, "-f", "mp3", audioOutputPath
    ];

    /*
     * execute the command
     */
    const cmd = spawn("ffmpeg", args);

    /*
     * listen to success/fail/completion
     */

    cmd.stdout.on("data", (data) => {
      console.log("DATA")
      console.log(data)
    });

    // errors will arrive as a buffer otherwise...
    cmd.stderr.setEncoding("utf8")
    cmd.stderr.on("data", (err) => {
      console.log("ERROR")
      console.log(err)
    });

    cmd.on("close", () => {
      console.log("CLOSED");
    });

  });
}

module.exports = {
  convertToMp3
}
