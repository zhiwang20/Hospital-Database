const bcrypt = require('bcrypt');
const { db } = require('../../config/db.connector')

const SALT_FACTOR = 10;

const query_create_user = (keys, vals) => {
    return `INSERT INTO users (${keys.join(',')}) VALUES ("${vals.join('","')}");`;
}

function HandleError(res, err) {
    res.status(400);
    // if (err.message) {
    //     return res.send({message: err.message});
    // } else {
        return res.send({...err});
    // }
}

async function create (req, res) {
    try {
        const conn = db('main');
        const me = req.user ? req.user : null;
        const { email, password, kind } = req.body;
        // console.log(email, password);
        console.log(req.body);
        // if (!me) {
        //     return res.status(401).send({message: 'User Not Authenticated'});
        // }

        if (email && password) {
            const hashed = await bcrypt.hash(password, SALT_FACTOR)
            const keys = ['email', 'password'];
            const vals = [email, hashed];
            if (kind) {
                keys.push('kind');
                vals.push(kind);
            }
            // console.log(email, hashed);
            const user = await conn.query(query_create_user(keys, vals));
            return res.send({message: 'User Created'})
        } else {
            console.warn('No Password or Email');
            return res.status(404).send({
                message: `${email ? 'Password' : 'Email'} not supplied.`
            });
        }
    } catch (err) {
        return HandleError(res, err);
    }

}

async function index (req, res) {
    try {
        const conn = db('main');
        const users = await conn.query(`SELECT id,email,kind,created FROM users `);
        return res.json(users);
    } catch (err) {
        return HandleError(res, err)
    }
}

async function me (req, res, next) {
    try {
        //console.log(req.user)
        const user = req.user[0]
        if (!user || !user.id) {
            throw new Error('Not Logged In.')
        }
        const conn = db('main');
        const me = await conn.query(`SELECT email,id,kind,created FROM users WHERE id = ${user.id}`);
        return res.json(me[0]);
    } catch (err) {
        console.error(err);
        return HandleError(res, err);
    }
}

module.exports = {
    create: create,
    index: index,
    me: me,
}