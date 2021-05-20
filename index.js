import { createServer } from 'http';
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Import des routes à utiliser
import libraryRoutes from './routes/library.js';

//******************************A commenter, obligatoirement 😡😡😡😡😡😡😡 ****** */

dotenv.config();

const port = process.env.port || 5000;

// Connection à la base de données MongoDB Atlas
mongoose.connect(process.env.CONNECTION_URL, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log('Connexion à MongoDB réussie'))
    .catch((error) => console.log(error));

mongoose.set('useFindAndModify', false);

const app = express();
app.set('port', port);

// Probleme de CORS 
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(bodyParser.json());

// Pour verrifier si le server fonctionne bien
app.get('/', (req, res) => {
    res.send(`Server is working!!`);
});

app.use('/api', libraryRoutes);

const server = createServer(app);

server.on('listening', () => {
    console.log(`Server running on port ${port}`);
});

server.on('error', () => {
    console.log(`An error occur. Please retry!`);
});

// Ecoute du serveur sur le port 3000
server.listen(port);