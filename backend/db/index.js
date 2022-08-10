const { Pool } = require("pg");
// pool automatically retrieves data from .env
const pool = new Pool();
module.exports = {
    query: (text, params) => pool.query(text, params),
};