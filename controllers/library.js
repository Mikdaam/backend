import Library from '../model/library.js';

/**
 * Créer une librarie à la création du compte
 * @param {string} username 
 */
export const createLibrary = async (username) => {
    try {
        const library = new Library({
            name: username,
            videos: []
        });
        await library.save();
    } catch (error) {
        console.log('An error occured');
        console.log(error);
    }
};

/**
 * Récupère la librarie corresepondant au 'username' dans la base
 * Et le renvoi sous forme d'objet JSON
 * @param {*} req 
 * @param {*} res 
 */
export const getAllVideos = async (req, res) => {
    const { username } = req.params;
    try {
        const videos = await Library.findOne({name: username});
        res.status(200).json(videos);
    } catch (error) {
        res.status(400).json(error);
    }
};

/**
 * Ajoute une video dans la librairie de l'utilisateur 
 * Et revoie toute la librarie
 * NOTE: au lieu de renvoyer toute la librairie, je devrais renvoyer que l'élément ajouté,
 * pour des raisons de performance
 * @param {*} req 
 * @param {*} res 
 */
export const addVideo = async (req, res) => {
    const { username } = req.params;
    const video = req.body;
    try {
        await Library.updateOne(
            { name: username, 'videos.id': { $ne: video.id } },
            { 
                $push: {videos: video} 
            },
            { new: true } // Pour renvoyer la nouvelle version de la bibliothèque à chaque fois
        );
        const updatedLibray = await Library.findOne({name: username});
        res.status(200).json(updatedLibray);
    } catch (error) {
        res.status(400).json(error);
        console.log(error);
    }
};

/**
 * Met à jour le titre d'une video et renvoie toute la librarie
 * NOTE: au lieu de renvoyer toute la librairie, je devrais renvoyer que l'élément modifié,
 * pour des raisons de performance
 * @param {*} req 
 * @param {*} res 
 */
export const updateVideo = async (req, res) => {
    const { username, id } = req.params;
    const { title } = req.body;
    try {
        const updatedLibray = await Library.findOneAndUpdate(
            { "name": username, "videos.id": id },
            { 
                $set: {
                    "videos.$.title": title
                }
            },
            { new: true }
        );
        res.status(200).json(updatedLibray);
    } catch (error) {
        res.status(400).json(error);
    }
};

/**
 * Supprime une video de la librairie et renvoie un message sous forme d'objet
 * @param {*} req 
 * @param {*} res 
 */
export const deleteVideo = async (req, res) => {
    const { username, id } = req.params;
    try {
        await Library.findOneAndUpdate(
            { "name": username },
            { 
                $pull: {videos: {id : id}}
            },
            { new: true }
        );
        res.status(200).json({ message: 'Video delected successfully' });
    } catch (error) {
        res.status(400).json(error);
    }
};