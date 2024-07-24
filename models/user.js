import db from '../config/db.js';

const User = {
    findByEmail: async (email) => {
        const [rows] = await db.execute('SELECT * FROM users WHERE email = ?', [email]);
        return rows[0];
    },
    create: async (username, email, password) => {
        const [result] = await db.execute('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', [username, email, password]);
        return result.insertId;
    },
};

export default User;
