'use strict';

const { db } = require('../../config/db.connector');

const query = {
    all: 'SELECT * FROM appointment;',
    create: (keys, vals) => {
        return `INSERT INTO appointment (${keys.join(',')}) VALUES ("${vals.join('","')}");`;
    },
    update: (keys, vals) => {
        return `UPDATE appointment SET ${keys.join(',')} = "${vals.join('","')}" WHERE appointmentId = ?`;
    },
    show: `SELECT * FROM appointment WHERE appointmentId = ?;`,
    remove: `DELETE FROM appointment WHERE appointmentId = ?;`
};


function HandleError (res, err) {
    return res.status(400).send(err)
}


async function index(req, res) {
  try {
    const conn = db('main');
    const appointments = await conn.query(query.all);
    return res.json(appointments);
  } catch (err){ HandleError(res, err); };
}


async function create(req, res) {
    try {
        const body = req.body;
        const keys = Object.keys(body);
        const vals = keys.reduce((acc, cur) => {acc.push(body[cur]); return acc;},[]);
        const conn = db('main');
        const appointment = await conn.query(query.create(keys, vals));
        return res.json(appointment);
    } catch (err){ HandleError(res, err); };
}

async function update(req, res) {
    try {
        const id = req.params.id;
        const body = req.body;
        const keys = Object.keys(body);
        const vals = keys.reduce((acc, cur) => {acc.push(body[cur]); return acc;},[]);
        const conn = db('main');
        const updatedAppointment = await conn.query(query.update(keys, vals), [id]);
        return res.json(updatedAppointment);
    } catch (err){ HandleError(res, err); };
}

async function show (req, res) {
    try {
        const id = req.params.id;
        const conn = db('main');
        const appointment = await conn.query(query.show, [id]);
        return res.json(appointment);
    } catch (err){ HandleError(res, err); };
}

async function remove (req, res) {
    try {
        const id = req.params.id;
        const conn = db('main');
        const appointment = await conn.query(query.remove, [id, Date.now()]);
        return res.send({message: `Deletion Successful`});
    } catch (err) { HandleError(res, err); }
}


module.exports = {
    index: index, create: create, update: update, remove: remove, show: show
}