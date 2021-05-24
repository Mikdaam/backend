import jwt from 'jsonwebtoken';

const auth = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, 'SECRET');
        const username = decodedToken.username;
        if (username && req.params.username !== username) {
            throw 'Hum, I got you!! Am not sure you it you, reconnect 😉😉😉😉😉';
        } else {
            next();
        }
        console.log(decodedToken);
    } catch (error) {
        res.status(401).json({message: 'Requête non authentifié !'});
    }
};

export default auth;