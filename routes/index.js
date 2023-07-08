var express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const FileStore = require('session-file-store')(session);

// var authRouter = require('./lib_login/auth');
// var authCheck = require('./lib_login/authCheck.js');
// var template = require('./lib_login/template.js');

var router = express.Router();

/* GET home page. */
router.use(bodyParser.urlencoded({extended: false}));
router.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: true,
  store: new FileStore(),
}))

router.get('/', function(req, res, next) {
  // if(!authCheck.isOwner(req, res)){
  //   res.redirect('/auth/login');
  //   return false;
  // } else {
  //   res.redirect('/main');
  //   return false;
  // }
  res.render('index', { title: 'Express' });
});

// router.use('/auth', authRouter);

// router.get('/main', (req, res) => {
//   if (!authCheck.isOwner(req, res)) {
//     res.redirect('/auth/login');
//     return false;
//   }
//   res.send('로그인 성공');
// })

module.exports = router;
