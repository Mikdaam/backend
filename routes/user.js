import express from 'express';
import { signup, login } from '../controllers/user.js';
const router = express.Router();

// route pour créer un nouvel utilisateur
router.post('/signup', signup);

// route pour connecter un nouvel utilisateur
router.post('/login', login);

export default router;