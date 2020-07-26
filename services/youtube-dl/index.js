/*
 *
 * THIS USES EXEC, BUT TRYING SPAWN FOR THE REASONS OUTLINED HERE>>>
 * https://stackoverflow.com/questions/42012342/running-ffmpeg-via-nodejs-error
 *
 */

const { spawn }     = require("child_process");

const path          = require("path");
const rootDir       = path.resolve();

async function downloadVideo(id){
  console.log("SERVICE: downloadVideo")

  return new Promise((resolve, reject) => {

    /*
     * create input/output paths according to taste
     */

     const videoPath = `${ rootDir }/data/downloaded/%(id)s.%(ext)s`


    /*
     * TODO, youtube-dl documentation
     */

    const args = [
      "-o", videoPath, `https://www.youtube.com/watch?v=${ id }`
    ];

    /*
     * execute the command
     */
    const cmd = spawn("youtube-dl", args);

    /*
     * listen to success/fail/completion
     */

    let fileNameWithExt = null;
    cmd.stdout.setEncoding("utf8")
    cmd.stdout.on("data", (data) => {
      console.log(data)
      if (data.indexOf("[ffmpeg] Merging formats into") > -1){
        const fileFormat = data.replace(/"/g,"").split(id)[1];
        fileNameWithExt = `${id}${fileFormat}`;
      }
      if (data.indexOf("has already been downloaded and merged") > -1){
        console.log("DATA: ALREADY CONVERTED")
        console.log(data)

        // dont hate me for this
        let alreadyDownloadedPath = data.split("[download]")[1].split("has already been downloaded and merged")[0].split(".")
        const fileName = alreadyDownloadedPath[0].split("\\")[alreadyDownloadedPath[0].split("\\").length - 1];
        const fileExtension = alreadyDownloadedPath[1];
        fileNameWithExt = `${fileName}.${fileExtension}`;
      }


    });

    // errors will arrive as a buffer otherwise...
    cmd.stderr.setEncoding("utf8")
    cmd.stderr.on("data", (err) => {
      //console.log("ERROR")
      //console.log(err)
      if (err.indexOf("has already been downloaded and merged") > -1){
        console.log("ERR: ALREADY CONVERTED")
        console.log(err)
        //return resolve(err)
      }
      else {
        // ignore warnings...
        if (err.indexOf("WARNING:") === -1){
          return reject(err);
        }
      }

    });

    // finally send it back to whomever called it
    cmd.on("close", () => {
      console.log("CLOSED");

      if (fileNameWithExt){
        console.log("wee win")
        return resolve({
          fileName: fileNameWithExt
        })
      }
      else {
        console.log("we lose")
        return reject({
          fileName: null
        })
      }
    });

  });
}

module.exports = {
  downloadVideo
}
