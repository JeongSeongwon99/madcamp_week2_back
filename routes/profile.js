const bodyParser = require('body-parser');
var express = require('express');
var router = express.Router();
var db = require('../db');

router.post('/', function (req, res) {
    const nickname = req.body.nickname;

    console.log(nickname);
    
    db.query('SELECT * FROM usertable WHERE nickname = ?', [nickname], function(error, results, fields){
        if (error) throw error;
        if (results.length > 0){
            res.status(200).send(results[0]);
        }
        else {
            res.status(300).send(null);
        }
    })
});

module.exports = router;