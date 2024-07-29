const { createConnection } = require('mysql');
const config = require('./config.json');

let con = createConnection(config.mysql)
con.connect(err => {
    if(err) return console.log(err);
     console.log("Connected to the database !");
});

module.exports = con;