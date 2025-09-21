import query from "../database.js";
import { nanoid } from "nanoid";

// RECUPERATION D'UNE NEWS PAR SON ID
export const getNewsById = async (id) => {
  try {
    const rows = await query(`SELECT * FROM news WHERE id=?`, [id])
    console.log('ROWS : ', rows)
    return rows
  }catch(err) {
    console.log(err)
    throw err
  }
}
// RECUPERATION DE TOUTES LES ACTUALITES EN BDD
export const getAllNews = async () => {
  try {
    const rows = await query(`SELECT * FROM news`, []);
    // console.log("ROWS : ", rows);
    return rows;
  } catch (err) {
    console.error("Erreur requete getAllNews : ", err.message);
    throw err;
  }
};
// INSERTION D'UNE ACTU EN BDD
export const addNews = async (place, title, content) => {
  try {
    const result = await query(
      `INSERT INTO news (id, place, title, content, created_at) VALUES (?,?,?,?,?)`,
      [nanoid(4), place, title, content, new Date().toISOString().slice(0, 10)]
    );
    // console.log("RESULT : ", result);
    return result;
  } catch (err) {
    console.error("Erreur requête addNews : ", err.message, " : ", err.code);
    throw err;
  }
};
// MODIFICATION D'UNE ACTU EN BDD

// SUPPRESSION ACTU PAR IDENTIFIANT DE LA BDD
export const deleteNewsById = async (id) => {
  try {
    const result = await query(`DELETE FROM news WHERE id = ?`, [id]);
    // console.log("RESULT : ", result);
    return result;
  } catch (err) {
    console.error("Erreur requête deleteNewsById : ", err.message, " : ", err.code);
    throw err;
  }
};
