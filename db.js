var mysql = require('mysql2');
var db_config = require('./db_config.json');

const conn = {
    host: db_config.host,
    port: db_config.port,
    user: db_config.user,
    password: db_config.password,
    database: db_config.database
};

var db = mysql.createConnection(conn);
db.connect((err) => {
    if (err) {
        console.error('MySQL 연결 실패: ', err);
    } else {
        console.log('MySQL에 연결되었습니다.');
    }
});

module.exports = db;