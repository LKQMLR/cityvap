import fs from "fs/promises";
import path from "path";
import { createPromotions, deletePromotionById, getAllPromotions, getPromotionById, updatePromotionById } from "../models/promotionsModel.js";
// ============================ PAGES ============================

// page promotion & listing de toutes les promotions
export const pagePromotion = async (req, res) => {
  try {
    const data = await getAllPromotions();
    res.status(200).render("admin/pages_content/panel-promotions", {
      promotions: data,
      dbConnected: true,
    });
  } catch (err) {
    res.status(500).render(`admin/pages_content/panel-promotions`, {
      promotions: [],
      error: "Serveur momentanément indisponible. Veuillez réessayer plus tard.",
      dbConnected: false,
    });
  }
};
// Formulaire modification d'une actualié
export const formUpdatePromotion = async (req, res) => {
  const id = req.params.id;

  try {
    const result = await getPromotionById(id);

    if (!result[0]) {
      return res.status(404).render("admin/forms/form-promo-update", {
        id,
        error: `Bannière promotionnelle introuvable [id:${id}]`,
        dbConnected: false,
      });
    }

    return res.status(200).render("admin/forms/form-promo-update", {
      id: result[0].id,
      title: result[0].title,
      dbConnected: true,
    });
  } catch (err) {
    res.redirect("/admin/promotions");
  }
};

// Formulaire création d'une promotion
export const formCreatePromotion = (req, res) => {
  res.status(200).render("admin/forms/form-promo-create", {
    title: "",
    position: "",
    dbConnected: true,
  });
};

// ============================ CRUD ============================

// CREER PROMOTION
export const addPromotion = async (req, res) => {
  const { title, position } = req.body;
  const image = req.file ? req.file.filename : null;

  if (!title || !image || !position) {
    if (req.file) {
      await fs.unlink(path.join("public/uploads/img_sliders", req.file.filename));
    }
    return res.status(400).render("admin/forms/form-promo-create", {
      title,
      image,
      position,
      error: "Certains champs sont manquants",
      dbConnected: true,
    });
  }

  if (title.length > 255) {
    return res.status(400).render("admin/forms/form-promo-create", {
      title,
      image,
      position,
      error: "Un des champs dépasse la longueur maximal autorisée. (255 max)",
      dbConnected: true,
    });
  }

  try {
    await createPromotions(title, image, position);
    req.session.success = "Nouvelle bannière promotionnelle ajoutée !";
    return res.status(303).redirect("/admin/promotions");
  } catch (err) {
    return res.redirect("/admin/promotions");
  }
};
// MODIFIER PROMOTION
export const updatePromotion = async (req, res) => {

  const { title } = req.body;
  const id = req.params.id;
  const image = req.file ? req.file.filename : null;

  if (!title || !image) {
    if (req.file) {
      await fs.unlink(path.join("public/uploads/img_sliders", req.file.filename));
    }
    return res.status(400).render("admin/forms/form-promo-update", {
      id,
      title,
      image,
      error: "Certains champs sont manquants",
      dbConnected: true,
    });
  }

  if (title.length > 255) {
    return res.status(400).render("admin/forms/form-promo-update", {
      title,
      image,
      error: "Un des champs dépasse la longueur maximal autorisée. (255 max)",
      dbConnected: true,
    });
  }

  try {
    await updatePromotionById(id, title, image);
    req.session.success = "La modification a bien été effectuée.";
    return res.status(303).redirect("/admin/promotions");
  } catch (err) {
    return res.redirect("/admin/promotions");
  }
};

// SUPPRIMER PROMOTION
export const deletePromotion = async (req, res) => {
  const id = req.params.id;
  try {
    await deletePromotionById(id);
    req.session.success = `La bannière promotionnel n°${id} a bien été supprimée.`;
    return res.status(303).redirect("/admin/promotions");
  } catch (err) {
    return res.redirect("/admin/promotions");
  }
};
