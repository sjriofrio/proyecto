import express from 'express';
import path from 'path';
import multer from 'multer';

const router = express.Router();

// Configuración del almacenamiento
const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
  }
});

// Crear una instancia de multer con la configuración de almacenamiento
const upload = multer({ storage: storage });

// Configurar una ruta para manejar las cargas de archivos
router.post('/upload', upload.single('file'), (req, res) => {
  res.send('Archivo subido exitosamente');
});

export default router;