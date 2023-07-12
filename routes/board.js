const bodyParser = require('body-parser');
var express = require('express');
var router = express.Router();
var db = require('../db');

router.get('/', function (req, res) {
    console.log("post data 요청되었습니다.")
    db.query('SELECT * FROM posttable ORDER BY id DESC', function(error, results, fields){
        if (error) throw error;
        res.status(200).send(results);
    })
});

router.post('/post', function(req, res){
    console.log("새 글 포스트 되었습니다.")
    const {title, contents, writer, uploadTime} = JSON.parse(req.body.data);
    db.query('INSERT INTO posttable (title, contents, writer, uploadTime) values (?, ?, ?, ?)', [title, contents, writer, uploadTime], function(error, results, fields){
        if (error) throw error;
        res.status(200).send(true);
    })
})

router.post('/read_comment', function(req, res){
    db.query('SELECT * FROM comment_table WHERE post_id = ?', [req.body.data *= 1], function(error, results, fields){
        if (error) throw error;
        res.status(200).send(results);
    })
})

router.post('/write_comment', function(req, res){
    console.log("새 댓글 환영.")
    const {post_id, writer, comment, uploadTime} = JSON.parse(req.body.data);
    db.query('INSERT INTO comment_table (post_id, writer, comment, uploadTime) values (?, ?, ?, ?)', [post_id, writer, comment, uploadTime], function(error, results, fields){
        if (error) throw error;
        res.status(200).send(true);
    })
})

module.exports = router;