import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import { sendEmail, getEmailTemplate } from './emailer.js';
import path from 'path';
import multer from 'multer';

const prisma = new PrismaClient();
const router = Router();

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
  
  // Ruta para manejar la carga de archivos
  router.post("/upload", upload.single('file'), (req, res) => {
    res.send('Archivo subido exitosamente');
  });

//se muestra la lista de usuarios
router.get("/", async (req, res) => {
    const usuarios = await prisma.formulario.findMany();
    res.json(usuarios);
});

// se crea un nuevo formulario
router.post("/", async (req, res) => {
    const {
        nombre,
        apellido,
        fechaNacimiento,
        numeroCedula,
        estadoCivil,
        coloniaBarrio,
        ciudad,
        estadoProvincia,
        telefono,
        correoElectronico,
        tipoTerreno,
        documentosAdjuntos,
        captchaResponse
    } = req.body;

    try {
        const usuario = await prisma.formulario.create({
            data: {
                nombre,
                apellido,
                fechaNacimiento,
                numeroCedula,
                estadoCivil,
                coloniaBarrio,
                ciudad,
                estadoProvincia,
                telefono,
                correoElectronico,
                tipoTerreno,
                documentosAdjuntos,
                captchaResponse
            },
        });

        // Obtener la plantilla de correo electrónico según el estado del formulario
        const { subject, html } = getEmailTemplate('recibido', nombre);

        // Enviar correo electrónico después de crear el formulario
        sendEmail(correoElectronico, subject, html);

        res.json(usuario);
    } catch (error) {
        console.error('Error al crear el formulario:', error); // Log del error en la consola
        res.status(500).json({ error: 'Error al crear el formulario', details: error.message });
    }
});

// Método para actualizar el formulario
router.put("/:id", async (req, res) => {
    const { id } = req.params;
    const { estado } = req.body;

    try {
        // Verificar si el formulario existe
        const formularioExistente = await prisma.formulario.findUnique({
            where: { id },
        });

        if (!formularioExistente) {
            return res.status(404).json({ error: 'Formulario no encontrado' });
        }

        // Actualizar el estado del formulario
        const formulario = await prisma.formulario.update({
            where: { id },
            data: { estado },
        });

        // Obtener la plantilla de correo electrónico según el estado del formulario
        const { subject, html } = getEmailTemplate(estado, formulario.nombre);

        // Enviar correo electrónico después de actualizar el formulario
        sendEmail(formulario.correoElectronico, subject, html);

        res.json(formulario);
    } catch (error) {
        console.error('Error al actualizar el formulario:', error); // Log del error en la consola
        res.status(500).json({ error: 'Error al actualizar el formulario', details: error.message });
    }
});

// Ruta para obtener un formulario por numero de cedula
router.get('/:cedula', async (req, res) => {
    const { cedula } = req.params;
    try {
        const formulario = await prisma.formulario.findFirst({
            where: { numeroCedula: cedula },
        });
        if (formulario) {
            res.json(formulario);
        } else {
            res.status(404).json({ error: 'Formulario no encontrado' });
        }
    } catch (error) {
        console.error('Error al obtener el formulario:', error); // Log del error en la consola
        res.status(500).json({ error: 'Error al obtener el formulario', details: error.message });
    }
});

export default router;