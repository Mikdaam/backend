import express from 'express';
import auth from '../middleware/auth.js';
import { getAllVideos, addVideo, updateVideo, deleteVideo } from '../controllers/library.js';
const router = express.Router();

// route pour récupérer tous les éléments de la bibliothèque
router.get('/:username', auth, getAllVideos);

// route pour ajouter une video dans la bibliothèque
router.post('/:username', auth, addVideo);

// route pour modifier le titre d'une video de la bibliothèque
router.patch('/:username/video/:id', auth, updateVideo);

// route pour supprimer une video de la bibliothèque
router.delete('/:username/video/:id', auth, deleteVideo);

export default router;
