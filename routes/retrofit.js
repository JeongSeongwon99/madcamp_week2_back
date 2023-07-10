const bodyParser = require('body-parser');
var express = require('express');
var router = express.Router();
var db = require('../db');

router.post('/get', function (req, res, next) {
    console.log('GET 호출 / data : ' + req.body.data);
    console.log('path : ' + req.path);
    res.send(true);
});

router.use(bodyParser.json());
router.use(express.urlencoded({extended: true}))

router.post('/', function (req, res, next) {
    const userInfo = req.body.data;
    const userIdPw = JSON.parse(userInfo);

    var userId = userIdPw.id;
    var userPw = userIdPw.password;

    console.log(userId, userPw);
    
    db.query('SELECT * FROM usertable WHERE id = ? AND password = ?', [userId, userPw], function(error, results, fields){
        if (error) throw error;
        if (results.length > 0){
            res.send('post success')
        }
        else {
            res.send('post fail')
        }
    })
});

router.put('/put/:id', function (req, res, next) {
    console.log('UPDATE 호출 / id : ' + req.params.id);
    console.log('body : ' + req.body.data);
    console.log('path : ' + req.path);
    res.send('put success')
});

router.delete('/delete/:id', function (req, res, next) {
    console.log('DELETE 호출 / id : ' + req.params.id);
    console.log('path : ' + req.path);
    res.send('delete success')
});

module.exports = router;