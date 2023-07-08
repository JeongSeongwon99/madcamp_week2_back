var mysql = require('mysql');
var db_config = require('./db_config.json');

const conn = {
    host: db_config.host,
    port: db_config.port,
    user: db_config.user,
    password: db_config.password,
    database: db_config.database
};

var db = mysql.createConnection(conn);
db.connect();

db.end();

// db.query('SELECT * FROM ')