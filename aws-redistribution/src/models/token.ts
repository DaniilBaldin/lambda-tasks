import db from '../utils/database';

const token = class Token {
    token: any;
    constructor(token: any) {
        this.token = token;
    }

    save() {
        return db.execute('INSERT INTO tokens (token) VALUES (?)', [this.token]);
    }
};

export default token;
