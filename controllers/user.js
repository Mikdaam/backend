import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../model/user.js';
import { createLibrary } from './library.js';

/**
 * Crée un nouvel utilisateur dans la base
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
export const signup = async (req, res) => {
    const {username, password} = req.body;
    console.log(username, password);
    try {
        const userExist = await User.findOne({ username });

        if (userExist) {
            return res.status(400).json({message: 'User already exist'});
        }

        const hashedPassword = await bcrypt.hash(password, 13);

        const user = User.create({username, password: hashedPassword});

        await createLibrary(username); // Crée une librarie pour l'utilisateur

        res.status(201).json({message: 'User created with success!!'});
    } catch (error) {
        res.status(500).json({message: 'An error has ocurred 😉😉😉😉😉'});
    }
};

/**
 * Connecte l'utilisateur et lui attribut un token qui a une durée
 * d'expiration d'une heure
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
export const login = async (req, res) => {
    const {username, password} = req.body;

    try {
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(404).json({message: 'User don\'t exist'});
        }

        const validPassword = await bcrypt.compare(password, user.password);

        if (!validPassword) {
            return res.status(400).json({message: 'Invalid password'});
        }

        const token = jwt.sign(
            {username: user.username, id: user._id},
            process.env.SECRET_TOKEN,
            {expiresIn: '1h'}
        );

        res.status(200).json({result: user, token});
    } catch (error) {
        res.status(500).json({message: 'An error has ocurred 😉😉😉😉😉'});
    }
};
