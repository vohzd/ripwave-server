let ret;

if (process.env.NODE_ENV == "development"){
  console.log("DEVELOPMENT MODE")
  ret = require("../keys/youtube-api.js");
}
else {
  ret = {
   apiKey: process.env.API_KEY,
   oAuthClientID: process.env.OAUTH_CLIENT_ID,
   oAuthClientSecret: process.env.OAUTH_CLIENT_SECRET
  }
}

module.exports = ret;
