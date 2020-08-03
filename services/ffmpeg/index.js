const { spawn }     = require("child_process");

const path          = require("path");
const rootDir       = path.resolve();

async function convertToMp3(fileName){
  console.log("SERVICE: convertToMp3")

  return new Promise((resolve, reject) => {

    /*
     * create input/output paths according to taste
     */
    const id = fileName.split(".")[0];
    const audioOutputPath = `${rootDir}/data/converted/${id}.mp3`;
    const videoPath = `${rootDir}/data/downloaded/${fileName}`;

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
     * for some crazy reason, ffmpeg only logs to stderr
     * https://stackoverflow.com/questions/35169650/differentiate-between-error-and-standard-terminal-log-with-ffmpeg-nodejs
     * https://trac.ffmpeg.org/ticket/5880
     */
    cmd.stderr.setEncoding("utf8")
    cmd.stderr.on("data", (output) => {
      console.log(output)
    });

    // inform whomever called this its done
    cmd.on("close", () => {
      console.log("FINISHED")
      resolve({ audioFile: audioOutputPath })
    });

  });
}

async function splitMp3(details){

  //ffmpeg
  console.log("SERVICE: splitMp3")
  console.log("OH HAI")
  console.log(details)

  /*
   * the args ffmpeg takes
   * final command looks something like this;
   * ffmpeg -i BIG_FILE -acodec copy -ss START_TIME -to END_TIME LITTLE_FILE
   */

   /*

  const args = [
    "-i", `${rootDir}/data/converted/${details.id}.mp3`, "-acodec", "copy", "-ss", details.tracks[0].start, "-to", details.tracks[1].start, `${rootDir}/data/split/${details.tracks[0].name}.mp3`
  ];*/


   details.tracks.forEach((track, i) => {
     const args = [
       "-i", `${rootDir}/data/converted/${details.id}.mp3`, "-acodec", "copy", "-ss", details.tracks[i].start, "-to", details.tracks[i].end, `${rootDir}/data/split/${details.tracks[i].name}.mp3`
     ]
     console.log(args)
     //const cmd = spawn("ffmpeg", args);
   });


  /*
   * execute the command
   */



  cmd.stdout.setEncoding("utf8")
  cmd.stdout.on("data", (data) => {
    console.log("DATA")
    console.log(data)
  });

  cmd.stderr.setEncoding("utf8")
  cmd.stderr.on("data", (output) => {
    console.log(output)
  });

}

module.exports = {
  convertToMp3,
  splitMp3
}
