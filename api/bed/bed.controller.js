'use strict';

const { db } = require('../../config/db.connector');

const query = {
    all: 'SELECT * FROM bed;',
    create: (keys, vals) => {
        return `INSERT INTO bed (${keys.join(',')}) VALUES ("${vals.join('","')}");`;
    },
    update: (keys, vals, id) => {
        // console.log(keys,vals);

        // console.log(`UPDATE bed SET ${keys.join('= ?,')} = ? WHERE bedId = "${id}"`);
        return `UPDATE bed SET ${keys.join('= ?,')} = ? WHERE bedId = "${id}"`;
    },
    show: `SELECT * FROM bed WHERE bedId = ?;`,
    remove: `DELETE FROM bed WHERE bedId = ?;`
};


function HandleError (res, err) {
    return res.status(400).send(err)
}


async function index(req, res) {
  try {
    const conn = db('main');
    const beds = await conn.query(query.all);
    return res.json(beds);
  } catch (err){ HandleError(res, err); };
}


async function create(req, res) {
    try {
        const body = req.body;
        const keys = Object.keys(body);
        const vals = keys.reduce((acc, cur) => {acc.push(body[cur]); return acc;},[]);
        const conn = db('main');
        const bed = await conn.query(query.create(keys, vals));
        return res.json(bed);
    } catch (err){ HandleError(res, err); };
}

async function update(req, res) {
    try {
        const id = req.params.id;
        const body = req.body;
        const keys = Object.keys(body);
        const vals = keys.reduce((acc, cur) => {acc.push(body[cur]); return acc;},[]);
        const conn = db('main');
        const updatedbed = await conn.query(query.update(keys, vals, id), vals);
        return res.json(updatedbed);
    } catch (err){ HandleError(res, err); };
}

async function show (req, res) {
    try {
        const id = req.params.id;
        const conn = db('main');
        const bed = await conn.query(query.show, [id]);
        return res.json(bed);
    } catch (err){ HandleError(res, err); };
}

async function remove (req, res) {
    try {
        const id = req.params.id;
        const conn = db('main');
        const bed = await conn.query(query.remove, [id, Date.now()]);
        return res.send({message: `Deletion Successful`});
    } catch (err) { HandleError(res, err); }
}


module.exports = {
    index: index, create: create, update: update, remove: remove, show: show
}