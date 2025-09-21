import express from 'express';
import dotenv from 'dotenv';
import router from './routes/router.js';
import session from 'express-session'

// Gere les variables d'environnement 
dotenv.config();

const app = express();
const PORT = process.env.PORT;
// Permet de traiter les données soumis par url à un formulaire
app.use(express.urlencoded({extended : true}))
// Permet de traiter les données json
app.use(express.json());
// Configuration du moteur de vue EJS
app.set('view engine', 'ejs');
// gere la session navigateur
app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true,
}))

// Gere les routes
app.use('/', router)

// Lancement du serveur
app.listen(PORT, () => console.log(`En attente de requêtes sur le port : ${PORT} [http://localhost:${PORT}]`))