import express from 'express';
import { getAllVideos, addVideo, updateVideo, deleteVideo } from '../controllers/library.js';
const router = express.Router();

// route pour récupérer tous les éléments de la bibliothèque
router.get('/library/:username', getAllVideos);

// route pour ajouter une video dans la bibliothèque
router.post('/library/:username', addVideo);

// route pour modifier le titre d'une video de la bibliothèque
router.patch('/library/:username/video/:id', updateVideo);

// route pour supprimer une video de la bibliothèque
router.delete('/library/:username/video/:id', deleteVideo);

export default router;
