const bodyParser = require('body-parser');
var express = require('express');
var router = express.Router();

var db = require('../db');

router.use(bodyParser.json());
router.use(express.urlencoded({extended: true}))

router.post('/login', function (req, res) {
    const userInfo = req.body.data;
    const userIdPw = JSON.parse(userInfo);

    var userId = userIdPw.username;
    var userPw = userIdPw.password;

    console.log(userId, userPw);
    
    db.query('SELECT nickname FROM usertable WHERE username = ? AND password = ?', [userId, userPw], function(error, results, fields){
        if (error) throw error;
        if (results.length > 0){
            const nickname = results[0].nickname;
            console.log(nickname);
            res.status(200).send(nickname);
        }
        else {
            res.status(300).send('false')
        }
    })
});

// // 로그아웃
// router.get('/logout', function (request, response) {
//     request.session.destroy(function (err) {
//         response.redirect('/');
//     });
// });
 
// 아이디 중복체크
router.post('/dup_id', function(req, res){
    const username = req.body.username;
    db.query('SELECT * FROM usertable WHERE username = ? AND platform = ?', [username, 'local'], function(error, results, fields) {
        if (error) throw error;
        if(results.length <= 0){
            res.status(200).send(true);
        } else {
            res.status(300).send(false);
        }
    });
})

router.post('/dup_nickname', function(req, res){
    const nickname = req.body.nickname;
    db.query('SELECT * FROM usertable WHERE nickname = ?', [nickname], function(error, results, fields) {
        if (error) throw error;
        if(results.length <= 0){
            res.status(200).send(true);
        } else {
            res.status(300).send(false);
        }
    });
});

// 회원가입 프로세스
router.post('/join', function(req, res) {
    const new_user = req.body.data;
    const new_userInfo = JSON.parse(new_user);
    const username = new_userInfo.username;
    const password = new_userInfo.password;
    const platform = new_userInfo.platform;
    const nickname = new_userInfo.nickname;
    const address = new_userInfo.address;
    const profile = new_userInfo.profile;
    db.query('INSERT INTO usertable (username, password, platform, nickname, place, profile) VALUES(?,?,?,?,?,?)', [username, password, platform, nickname, address, profile], function (error, data) {
        if (error) throw error;
        res.status(200).send(true);
    });
});

module.exports = router;