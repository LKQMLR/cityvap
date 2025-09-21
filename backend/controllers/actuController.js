import { getAllNews, addNews, deleteNewsById, getNewsById } from "../models/actuModel.js";

// PAGE ACTUALITES
export const pageNews = async (req, res) => {
  try {
    const data = await getAllNews();
    const newsArray = data.sqlResponse.map((row) => ({
      ...row,
      created_at: row.created_at.toISOString().slice(0, 10),
    }));
    res.render("admin/pages_content/panel-actu", {
      news: newsArray,
    });
  } catch (err) {
    res.status(500).render("admin/pages_content/panel-actu", {
      news: [],
      error: "Oups une erreur est survenue. Merci de réessayer plus tard.",
    });
  }
};
// PAGE FORMULAIRE AJOUT ACTUALITE
export const pageFormAddNews = (req, res) => {
  res.render("admin/forms/form-create-actu");
};

// PAGE FORMULAIRE MODIFICATION ACTUALITE
export const pageFormUpdateNews = async (req, res) => {
  try {
    const id = req.params.id
    const result = await getNewsById(id)
    const newsArray = await result.sqlResponse.map(row => ({...row}))
    const title = newsArray[0].title;
    const content = newsArray[0].content;
    console.log(title, content)
    res.render('admin/forms/form-update-actu', {
      title,
      content,
    })
  }catch(err) {
    console.error('Erreur : ', err)
  }
}

// AJOUT ACTUALITE
export const createNews = async (req, res) => {
  const place = req.body.place;
  const title = req.body.title;
  const content = req.body.content;

  if (!place || !title || !content) {
    return res.status(400).render("admin/forms/form-create-actu", {
      error: "Veuillez remplir tous les champs",
    });
  }

  try {
    await addNews(place, title, content);
    req.session.success = "Votre actualité a bien été ajoutée."
    res.status(302).redirect('/admin/actualites')
  } catch (err) {
    return res.status(500).render("admin/forms/form-create-actu", {
      error: `Oups une erreur est survenue. Merci de réessayer plus tard.`,
    });
  }
};


// SUPPRESSION ACTUALITE
export const deleteNews = async (req, res) => {
  const id = req.params.id
  try {
    await deleteNewsById(id)
    res.status(302).redirect('/admin/actualites')
  } catch (err) {
    res.status(500).render("admin/pages_content/panel-actu", {
      news: [],
      error: "Oups une erreur est survenue. Merci de réessayer plus tard.",
    });
  }
};
