import multer from "multer";
import path from "path";

// Fonction qui retourne un storage selon le dossier demandé
export const makeStorage = (folder) => {
  return multer.diskStorage({
    destination : (req, file, cb) => {
      cb(null, path.join("public", "uploads", folder));
    },
    filename : (req, file, cb) => {
      const uniqueSuffix = Date.now() + "_" + Math.round(Math.random() * 1e9);
      cb(null, uniqueSuffix + path.extname(file.originalname));
    },
  });
};

export const uploader = (folder) => multer({storage : makeStorage(folder)})
