const express = require("express");
const router = express.Router();

router.get("/", function(req,res){
    res.sendFile(__dirname + "/search_address.html");
  });

module.exports = router;