import query from "../database.js";

// REQUETE POUR RECUPERER UNE ACTUALITE PAR SON ID
export const getNewsById = async (id) => {
  try {
    const result = await query(`SELECT * FROM news WHERE id=?`, [id]);
    return result.sqlResponse;
  } catch (err) {
    console.error(err.message);
    throw err;
  }
};

// REQUETE POUR RECUPERER TOUTE LES ACTUALITES
export const getAllNews = async () => {
  try {
    const result = await query(`SELECT * FROM news`);
    return result.sqlResponse;
  } catch (err) {
    console.error(err.message);
    throw err;
  }
};

// REQUETE POUR CREER UNE NOUVELLE ACTUALITE
export const createNews = async (
  place,
  title,
  content,
) => {
  try {
    const result = await query(
      `INSERT INTO news (place, title, content, visible, created_at) 
      VALUES (?, ?, ?, ?, ?)`,
      [place, title, content, false, new Date().toISOString().slice(0, 10)]
    );
  } catch (err) {
    console.error("Erreur from createNews:", err.message);
    throw err
  }
};
// REQUETE POUR METTRE A JOUR UNE ACTUALITE PAR SON ID
export const updateNewsById = async (id, place, title, content) => {
  try {
    const result = await query(
      `UPDATE news SET place = ?, title = ?, content = ? WHERE id = ?`,
      [place, title, content, id]
    );
    return result.sqlResponse;
  } catch (err) {
    console.error(err.message);
    throw err;
  }
};

// REQUETE POUR SUPPRIMER UNE ACTUALITE PAR SON ID
export const deleteNewsById = async (id) => {
  try {
    const result = await query(`DELETE FROM news WHERE id = ?`, [id]);
    return result;
  } catch (err) {
    console.error(err.message);
    throw err;
  }
};
