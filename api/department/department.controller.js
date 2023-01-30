'use strict';

const { db } = require('../../config/db.connector');


const query = {
    all: 'SELECT * FROM department;',
    create: (keys, vals) => {
        return `INSERT INTO department (${keys.join(',')}) VALUES ("${vals.join('","')}");`;
    },
    update: (keys, vals, id) => {
        // console.log(keys,vals);
        // console.log(`UPDATE department SET ${keys.join(',')} = "${vals.join('","')}" WHERE ${keys.join(',')} = ?`);
        return `UPDATE department SET ${keys.join('= ?,')} = ? WHERE departmentName = "${id}"`;
    },
    show: `SELECT * FROM department WHERE departmentName = ?;`,
    remove: `DELETE FROM department WHERE departmentName = ?;`  //implement in hs.sql to drop department in doctor table also
};


function HandleError (res, err) {
    return res.status(400).send(err)
}


async function index(req, res) {
  try {
    const conn = db('main');
    const departments = await conn.query(query.all);
    return res.json(departments);
  } catch (err){ HandleError(res, err); };
}


async function create(req, res) {
    try {
        const body = req.body;
        const keys = Object.keys(body);
        const vals = keys.reduce((acc, cur) => {acc.push(body[cur]); return acc;},[]);
        const conn = db('main');
        const department = await conn.query(query.create(keys, vals));
        return res.json(department);
    } catch (err){ HandleError(res, err); };
}

async function update(req, res) {
    try {
        const id = req.params.id;
        const body = req.body;
        const keys = Object.keys(body);
        const vals = keys.reduce((acc, cur) => {acc.push(body[cur]); return acc;},[]);
        const conn = db('main');
        const updateddepartment = await conn.query(query.update(keys, vals, id), vals);
        return res.json(updateddepartment);
    } catch (err){ HandleError(res, err); };
}

async function show (req, res) {
    try {
        const id = req.params.id;
        const conn = db('main');
        const department = await conn.query(query.show, [id]);
        return res.json(department);
    } catch (err){ HandleError(res, err); };
}

async function remove (req, res) {
    try {
        const id = req.params.id;
        console.log(id);
        const conn = db('main');
        const department = await conn.query(query.remove, [id, Date.now()]);
        return res.send({message: `Deletion Successful`});
    } catch (err) { HandleError(res, err); }
}


module.exports = {
    index: index, create: create, update: update, remove: remove, show: show
}