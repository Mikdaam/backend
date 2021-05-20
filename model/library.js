import mongoose from 'mongoose';

const videoSchema = mongoose.Schema({
    title: {type: String, required: true},
    id: {type: String, required: true}
});

const librarySchema = mongoose.Schema({
    name: {type: String, required: true},
    videos: {type: [videoSchema], required: true}
});

const Library = mongoose.model('Library', librarySchema);

export default Library;