import express from 'express';
import dotenv from 'dotenv';
import router from './routes/router.js';
import session from 'express-session';
import {fileURLToPath} from 'url'
import path from 'path'



// Gere les variables d'environnement 
dotenv.config();

const app = express();
const PORT = process.env.PORT;
const __fileName = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__fileName)
// Permet de traiter les données soumis par url à un formulaire
app.use(express.urlencoded({extended : true}))
// Permet de traiter les données json
app.use(express.json());
// Permet de servir les fichiers statique et de les avoir à partir de l'url.
app.use(express.static(path.join(__dirname, "public")));

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