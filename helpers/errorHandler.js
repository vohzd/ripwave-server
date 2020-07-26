function errorHandler(res, e){
  console.log("ERROR RECEIVED !!");

  console.log(e.response)
  if (!e){
    return res.status(500).send({ "success": false, "error": "Server is having an issue" });
  }
  else {

    return res.status(400).send({ "success": false, "error": "BAD REQUEST" });
  }
}

module.exports = {
  errorHandler
}
