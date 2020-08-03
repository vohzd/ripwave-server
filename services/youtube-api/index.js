const { apiKey } = require("../../config/youtube-api.js");
const { google } = require("googleapis");

const youtube = google.youtube({
  version: "v3",
  auth: apiKey
});

// https://developers.google.com/youtube/v3/docs

async function retreiveChannel(id){
  console.log(id);
  const data  = await youtube.playlists.list({
    part: "snippet,contentDetails",
    id: id,
  });
  console.log(data)
  return data;
}

async function retreiveChannelPlaylists(channelID){
  console.log(channelID);
  const data  = await youtube.playlists.list({
    part: "snippet,contentDetails",
    channelID: channelID,
  });
  console.log(data)
  return data;
}

async function retreiveVideo(id){
  try {
    const { data } = await youtube.videos.list({
      part: "snippet,contentDetails",
      id: id,
    });
    console.log(data)
    return data;
  }
  catch (e){
    throw e;
  }

}

module.exports = {
  retreiveChannel,
  retreiveChannelPlaylists,
  retreiveVideo
}
