import express from "express";
import dotenv from "dotenv";

// GERE LES VARIABLES D'ENVIRONNEMENT
dotenv.config();

const app = express();

const PORT = process.env.PORT;


app.listen(PORT, () => console.log(`En attente de requêtes sur le port : ${PORT}`))