const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    database: process.env.DATABASE,
    password: process.env.PASSWORD,
    user: process.env.USER
};
