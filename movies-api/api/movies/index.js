
import express from 'express';
import asyncHandler from 'express-async-handler';
import { getMovies } from '../tmdb-api'; 
import Movie from './movieModel';


const router = express.Router();

// movie routes to be added
router.get('/discover', asyncHandler(async (req, res) => {
    const discoverMovies = await getMovies();
    res.status(200).json(discoverMovies);
}));

// Get a user's movies
router.get('/', async (req, res) => {
    console.log(req.user);
    const movies = await Movie.find({ userId: `${req.user._id}`});
    res.status(200).json(movies);
});


// Get a user's movies If you need admin functionality or viewing other people's tasks
router.get('/user/:uid', async (req, res) => {
    const movies = await Movie.find({ userId: `${req.params.uid}`});
    res.status(200).json(movies);
});

// create a movie
router.post('/', asyncHandler(async (req, res) => {
    const newMovie = req.body;
    newMovie.userId = req.user._id;
    const movie = await Movie(newMovie).save();
    res.status(201).json(movie);
}));


// Update Movie
router.put('/:id', async (req, res) => {
    if (req.body._id) delete req.body._id;
    const result = await Movie.updateOne({
        _id: req.params.id,
    }, req.body);
    if (result.matchedCount) {
        res.status(200).json({ code:200, msg: 'Movie Updated Successfully' });
    } else {
        res.status(404).json({ code: 404, msg: 'Unable to find Movie' });
    }
});


// delete Movie
router.delete('/:id', async (req, res) => {
    const result = await Movie.deleteOne({
        _id: req.params.id,
    });
    if (result.deletedCount) {
        res.status(204).json();
    } else {
        res.status(404).json({ code: 404, msg: 'Unable to find Movie' });
    }
});




export default router;
