var express = require('express');
var router = express.Router();

var db = require('../db');

router.post('/newVote', (req, res) => {
    console.log(req.body);
    const { title, contents, category, writer, address, like, postImage, hits, uploadTime} =  req.body;
    console.log(JSON.stringify(req.body));
    const query = 'INSERT INTO vote (title, contents, category, writer, address, likecount, postImage, hits, uploadTime) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
    db.query(query, [title, contents, category, writer, address, like, postImage, hits, uploadTime], 
        function (error, results, fields) {
        if (error) throw error;
        
        console.log(results.insertId);
        res.status(200).send((results.insertId).toString());
        
    })
})


router.post('/newVoteList', (req, res) => {
    console.log(req.body.result.documents);
    
    for (const i in req.body.result.documents) {
        
        const { address_name, category_name, phone, place_name, place_url, road_address_name, x, y, _} = req.body.result.documents[i];

        const query = 'INSERT INTO vote_list (vote_id, address_name, category_name, phone, place_name, place_url, road_address_name, x, y, count) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
        db.query(query, [req.body.id, address_name, category_name, phone, place_name, place_url, road_address_name, x, y, 0],
            function (error, results, fields) {
                if (error) throw error;

                console.log(results.insertId);
                
            })
    }   
    res.status(200).send((req.body.id).toString());
    
}); 

router.get('/getAllVotes', (req, res) => {
    db.query('SELECT * FROM vote ORDER BY id DESC LIMIT 20', function (error, results, fields) {
        if (error) throw error;
        res.status(200).send(results);
    });
})

router.post('/read', (req, res) => {
    db.query('SELECT * FROM vote_list WHERE vote_id = ?', [req.body.data *= 1], function(error, results, fields) {
        if (error) throw error;
        res.status(200).send(results);
    })
})

router.post('/nick_check', (req, res) => {
    db.query('SELECT * FROM vote_comment WHERE writer = ? AND vote_id = ?', [req.body.nickname, req.body.vote_id], function(error, results, fields) {
        if (error) throw error;
        if (results.length > 0) {
            res.status(200).send(true);
        } else {
            res.status(300).send(false);
        }
    })
})

router.post('/get_vote_item_id', (req, res) => {
    console.log("쿼리 커리")
    db.query('SELECT id FROM vote_list WHERE vote_id = ? AND place_name = ?', [req.body.vote, req.body.place_name], function(error, results, fields) {
        if (error) throw error;
        if (results.length > 0) {
            const sendData = results[0].id;
            console.log(results);
            res.status(200).send(results[0].id.toString());
        } else {
            res.status(300).send(false);
        }
    })
})

router.post('/vote_comment', (req, res) => {
    console.log("투표 댓글 등록")
    
    db.query('INSERT INTO vote_comment (vote_id, vote_item_id, comment, writer) VALUES (?, ?, ?, ?)', [req.body.vote_id, req.body.vote_item_id, req.body.comment, req.body.writer], function(error, results, fields) {
        if (error) throw error;
        db.query('UPDATE vote_list SET count = count + 1 WHERE id = ?', [req.vote_item_id], function(error, results, fields){
            res.status(200).send(true);
        })
    })
})

router.post('/isOwner', (req, res) => {
    db.query('SELECT * FROM vote WHERE id = ? AND writer = ?', [req.id, req.writer], function (error, results, fields) {
        if (error) throw error;
        if (results.length > 0) {
            res.status(200).send(true);
        } else {
            res.status(300).send(false);
        }
    });
});

module.exports = router;