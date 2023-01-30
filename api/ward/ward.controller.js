'use strict';

const { db } = require('../../config/db.connector');

const query = {
    all: 'SELECT * FROM ward;',
    create: (keys, vals) => {
        return `INSERT INTO ward (${keys.join(',')}) VALUES ("${vals.join('","')}");`;
    },
    update: (keys, vals, id) => {
        return `UPDATE ward SET ${keys.join('= ?,')} = ? WHERE wardId = "${id}"`;
    },
    show: `SELECT * FROM ward WHERE wardId = ?;`,
    remove: `DELETE FROM ward WHERE wardId = ?;`,
};


function HandleError (res, err) {
    return res.status(400).send(err)
}


async function index(req, res) {
  try {
    const conn = db('main');
    const wards = await conn.query(query.all);
    return res.json(wards);
  } catch (err){ HandleError(res, err); };
}


async function create(req, res) {
    try {
        const body = req.body;
        const keys = Object.keys(body);
        const vals = keys.reduce((acc, cur) => {acc.push(body[cur]); return acc;},[]);
        const conn = db('main');
        const ward = await conn.query(query.create(keys, vals));
        return res.json(ward);
    } catch (err){ HandleError(res, err); };
}

async function update(req, res) {
    try {
        const id = req.params.id;
        const body = req.body;
        const keys = Object.keys(body);
        const vals = keys.reduce((acc, cur) => {acc.push(body[cur]); return acc;},[]);
        const conn = db('main');
        const updatedward = await conn.query(query.update(keys, vals, id), vals);
        return res.json(updatedward);
    } catch (err){ HandleError(res, err); };
}

async function show (req, res) {
    try {
        const id = req.params.id;
        const conn = db('main');
        const ward = await conn.query(query.show, [id]);
        return res.json(ward);
    } catch (err){ HandleError(res, err); };
}

async function remove (req, res) {
    try {
        const id = req.params.id;
        const conn = db('main');
        const ward = await conn.query(query.remove, [id, Date.now()]);
        return res.send({message: `Deletion Successful`});
    } catch (err) { HandleError(res, err); }
}


module.exports = {
    index: index, create: create, update: update, remove: remove, show: show
}