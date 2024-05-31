import db from '../../db.js';
import bcrypt from 'bcrypt';

const signup = async (req, res) => {
    const {username, email, password} = req.body;

    const existingUser = await new Promise((resolve, reject) => {
        db.query('SELECT * FROM users WHERE username = ? AND email = ?', [username, email], (error, results) => {
            if(error) {
                reject(error);
            } else {
                resolve(results[0]);
            }
        });
    });

    if(existingUser) {
        return res.status(409).json({message: 'User already exists, please log in!'});
    }

    const saltRounds = 12;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hashedPassword = bcrypt.hashSync(password, salt);

    db.query('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', [username, email, hashedPassword], (err) => {
        if(err) {
            return res.status(500).json({message: 'Failed to create User'});
        } else {
            return res.status(201).json({message: 'User created successfully!'});
        }
    });
};

export {signup};