import { Router } from 'express';
import { uploader } from '../configs/multer.js';
import { pageAdmin } from '../controllers/adminController.js';
import { pageHome } from '../controllers/homeController.js';
import { addNews, deleteNews, formCreateNews, formUpdateNews, pageNews, updateNews } from '../controllers/newsController.js';
import { addPromotion, deletePromotion, formCreatePromotion, formUpdatePromotion, pagePromotion, updatePromotion} from '../controllers/promotionsController.js';


const router = Router();

// ==================== VARIABLES GLOBALES ====================
router.use((req, res, next) => {
  res.locals.success = req.session.success;
  res.locals.error = req.session.error;
  delete req.session.success;
  delete req.session.error;

  next();
})

// ==================== ADMIN ====================
router.get('/admin', pageAdmin)

// ==================== ACTUALITES ====================
// Page principal 
router.get('/admin/actualites', pageNews) // Liste toutes les actualités
// Formulaires
router.get('/admin/actualites/create', formCreateNews) // form - créer actualité
router.get('/admin/actualites/:id/edit', formUpdateNews) // form - modifier actualité
// Actions CRUD
router.post('/admin/actualites', addNews) // ajoute l'actualité à la bdd
router.post('/admin/actualites/:id/edit', updateNews) // modifie l'actualité dans la bdd
router.post('/admin/actualites/:id/delete', deleteNews) // supprime l'actualité dans la bdd

// ==================== SLIDER ====================
// Page principal
router.get('/admin/promotions', pagePromotion)
// Formulaires
router.get('/admin/promotions/create', formCreatePromotion)
router.get('/admin/promotions/:id/edit', formUpdatePromotion) 
// Action CRUD
router.post("/admin/promotions", uploader("img_sliders").single("upload_file"), addPromotion)
router.post('/admin/promotions/:id/edit', uploader("img_sliders").single("upload_file"), updatePromotion)
router.post('/admin/promotions/:id/delete', deletePromotion)

// ==================== PAGE D'ACCUEIL ====================
router.get('/', pageHome)



export default router