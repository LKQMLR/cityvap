import { Router } from 'express';
import { pageAdmin } from '../controllers/adminController.js';
import { pageHome } from '../controllers/homeController.js';
import { addNews, deleteNews, formCreateNews, formUpdateNews, pageNews, updateNews } from '../controllers/newsController.js';

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
router.get('/admin/actualites', pageNews) // page actualite
router.get('/admin/actualites/create', formCreateNews) // form - créer actualité
router.get('/admin/actualites/:id/edit', formUpdateNews) // form - modifier actualité
router.post('/admin/actualites', addNews) // ajoute l'actualité à la bdd
router.post('/admin/actualites/:id/edit', updateNews) // modifie l'actualité dans la bdd
router.post('/admin/actualites/:id/delete', deleteNews) // supprime l'actualité dans la bdd

// ==================== PAGE D'ACCUEIL ====================
router.get('/', pageHome)



export default router