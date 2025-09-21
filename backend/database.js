import mysql from "mysql";
import dotenv from "dotenv";

dotenv.config();
// Creation d'un pool de connexion
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
});

export default (queryString, params) => {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) {
        reject({ message: "Impossible de se connecter à la base de données", error: err });
      } else {
        connection.query(queryString, params, (err, result) => {
          try {
            if (err) reject(err);
            else
              resolve({
                success: true,
                info: "Succès de la requête SQL",
                sqlResponse: result,
              });
          } finally {
            connection.release();
          }
        });
      }
    });
  });
};
