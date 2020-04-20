import * as mysql from 'mysql';

export const CheckDataBaseCreation = async () => {

    const con = mysql.createConnection({
        host: process.env.DBHOST,
        port: parseInt(process.env.DBPORT, 10),
        user: process.env.DBUSERNAME,
        password: process.env.DBPASSWORD,
    });
    con.connect((err) => {
        if (err) { throw err; }
        con.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DBNAME} CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;`, (err, result) => {
            if (err) { throw err; }
            console.log('Database check done');
        });
        con.end();
    });
};