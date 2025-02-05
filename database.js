import mysql from 'mysql';
import 'dotenv/config';

export const createCon = mysql.createPool({
    host: "localhost",
    user: "root",
    password: process.env.DB_PASS,
    database: "ecoBot",
    connectionLimit: 10 // multiple queries without new connections
});

// export const connToDB = (con) => {
//     con.connect(function(err) {
//         if (err) throw err;
//         console.log("Connected to MySQL!");
//         return;
//     });
// }

export const runQuery = (con, query, clgMessage) => {
    return new Promise((resolve, reject) => {
        con.query(query, function (err, result) {
            if (err) reject(err);
            console.log(clgMessage);
            resolve(result);
        });
    });
}

export const endCon = (con) => {
    process.on('SIGINT', async () => {
        await con.end(function(err) {
            if (err) throw err;
            console.log("DB Connection closed!");
            process.exit(0);
        });
    });
}

// module.exports = {createCon, connToDB, endCon};