/*
 * DEPS
 */
const express                       = require("express");
const port                          = 1337;
const app                           = express();

/*
 *   MIDDLEWARE AND CONFIG
 */
require("./config/index.js")(app);

/*
 *   ROUTES
 */

const youtubeRoutes                  = require("./routes/youtube/index.js");

app.use("/", youtubeRoutes);


/*
 *   START SERVER
 */
app.listen(port, () => {
  console.log(`working on ${port}`);
});
