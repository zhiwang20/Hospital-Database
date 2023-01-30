
const jwt = require('jsonwebtoken');
const fs = require('fs');

process.env.PRIVATE_KEY_BUFFER = fs.readFileSync(process.env.PRIVATE_KEY);

module.exports = {
    signToken: (payload, expiresIn) => {
        const ExpiryTime = expiresIn ? expiresIn : 60 * 60 * 30;

        return jwt.sign(payload, process.env.PRIVATE_KEY_BUFFER, {
            expiresIn: ExpiryTime,
            algorithm: 'RS256'
        });
    }
}