import query from '../database.js';

// REQUETE POUR RECUPERER UNE PROMOTION PAR SON ID
export const getPromotionById = async (id) => {
  try {
    const result = await query('SELECT * FROM promos WHERE id = ?', [id]);
    return result.sqlResponse;
  }catch(err) {
    console.error(err.message);
    throw err;
  }
}

// REQUETE POUR RECUPERER TOUTES LES PROMOTIONS
export const getAllPromotions = async () => {
  try {
    const result = await query('SELECT * FROM PROMOS', [])
    return result.sqlResponse;
  }catch(err) {
    console.error(err.message);
    throw err;
  }
}

// REQUETE POUR CREER UNE PROMOTION
export const createPromotions = async (title, image, position) => {
  try {
    const result = await query('INSERT INTO promos (title, image, position) VALUES (?,?,?)',
      [title, image, position]
    );
    return result.sqlResponse;
  }catch(err) {
    console.error(err.message);
    throw err;
  }
}

// REQUETE POUR METTRE A JOUR UNE PROMOTIONS PAR SON ID
export const updatePromotionById = async (id, title, image) => {
  try {
    const result = await query(`UPDATE promos SET title = ?, image = ? WHERE id = ?`,
      [title, image, id]
    );
    return result.sqlResponse;
  }catch(err) {
    console.error(err.message);
    throw err;
  }
}

// REQUETE POUR SUPPRIMER UNE PROMOTIONS
export const deletePromotionById = async (id) => {
  try {
    const result = await query('DELETE FROM promos WHERE id = ?', [id]);
    return result.sqlResponse;
  }catch(err) {
    console.error(err.message);
    throw err;
  }
}
