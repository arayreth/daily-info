const { createPool } = require('mysql');
const config = require('./config.json');

let con = createPool(config.mysql)
con.getConnection((err) => {
    if(err) return console.error(err);
    console.log('Connected to the database.');
});

module.exports = con;