import {
  createNews,
  deleteNewsById,
  getAllNews,
  getNewsById,
  updateNewsById,
} from "../models/newsModel.js";

// ============================ PAGES ============================

// page actualité & listing de toute les actualités
export const pageNews = async (req, res) => {
  try {
    const data = await getAllNews();
    res.status(200).render('admin/pages_content/news-list', {
      news: data,
      dbConnected: true,
    });
  } catch (err) {
    res.status(500).render(`admin/pages_content/news-list`, {
      news: [],
      error: "Serveur momentanément indisponible. Veuillez réessayer plus tard.",
      dbConnected: false,
    });
  }
};
// Formulaire création d'une actualité
export const formCreateNews = (req, res) => {
  res.render('admin/forms/form-news-create', {
    place: "",
    title: "",
    content: "",
    dbConnected: true,
  });
};
// Formulaire modification d'une actualité
export const formUpdateNews = async (req, res) => {
  const id = req.params.id;
  try {
    const result = await getNewsById(id);

    if(!result[0]) {
      return res.status(404).render('admin/forms/form-news-update', {
        id,
        place: "",
        title: "",
        content: "",
        error: `Actualité introuvable. [id:${id}]`,
        dbConnected: false,
      })
    }

    return res.status(200).render('admin/forms/form-news-update', {
      id,
      place: result[0].place,
      title: result[0].title,
      content: result[0].content,
      dbConnected: true,
    })

  }catch(err) {
    return res.status(303).redirect('/admin/actualites')
  }
};

// ============================ CRUD ============================

// création actualité
export const addNews = async (req, res) => {
  const { place, title, content } = req.body;

  if (!place || !title || !content) {
    return res.status(400).render('admin/forms/form-news-create', {
      place,
      title,
      content,
      error: "Certains champs sont manquants.",
      dbConnected: true,
    });
  }

  try {
    await createNews(place, title, content);
    req.session.success = "Nouvelle actualité ajoutée : pensez à la mettre en ligne.";
    return res.status(303).redirect("/admin/actualites");
  } catch (err) {
    return res.status(303).redirect('/admin/actualites')
  }
};
// MODIFIER ACTUALITE
export const updateNews = async (req, res) => {
  const {place, title, content} = req.body;
  const id = req.params.id

  if(!place || !title || !content) {
    return res.status(400).render(`admin/forms/form-news-update`, {
    id,
    place,
    title,
    content,
    error: "Certains champs sont manquants",
    dbConnected: true,
    });
  }

  try {
    await updateNewsById(id, place, title, content);
    req.session.success = "La modification a bien été effectuée."
    return res.status(303).redirect('/admin/actualites')
  }catch(err) {
    return res.status(303).redirect('/admin/actualites')
  }
};

// SUPPRIMER ACTUALITE
export const deleteNews = async (req, res) => {
  const id = req.params.id;
  try {
    await deleteNewsById(id);
    req.session.success = `L'actualité n°${id} a bien été supprimée.`;
    return res.status(303).redirect("/admin/actualites");
  } catch (err) {
    return res.status(303).redirect("/admin/actualites");
  }
};
