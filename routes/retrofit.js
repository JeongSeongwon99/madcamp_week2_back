const bodyParser = require('body-parser');
var express = require('express');
var router = express.Router();
var db = require('../db');

router.get('/get', function (req, res, next) {
    console.log('GET 호출 / data : ' + req.query.data);
    console.log('path : ' + req.path);
    res.send('get success')
});

router.use(bodyParser.json());
router.use(express.urlencoded({extended: true}))

router.post('/', function (req, res, next) {
    const userInfo = req.body.data;
    const userIdPw = JSON.parse(userInfo);

    var userId = userIdPw.id;
    var userPw = userIdPw.password
    
    db.query('SELECT * FROM userTable WHERE id = ? AND password = ?', [userId, userPw], function(error, results, fields){
        if (error) throw error;
        if (results.length > 0){
            res.send('post fail')
        }
        else {
            res.send('post success')
        }
    })

    console.log('path : ' + req.path);
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