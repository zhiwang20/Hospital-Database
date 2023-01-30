'use strict';

/* DB Conguration */
const mariadb = require('mariadb');
const connections = new Map();
const pool = mariadb.createPool({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'hospitalTest01',
    connectionLimit: 5
});

async function init () {
    let conn;
    try {
        conn = await pool.getConnection();
        connections.set('main', conn);
        console.log(`[MARIADB] Connection Established`);
    } catch (err) {
        throw err;
    }
}

module.exports = {
    init: init,
    db: (dbname) => {
        return connections.get(dbname);
    }
}