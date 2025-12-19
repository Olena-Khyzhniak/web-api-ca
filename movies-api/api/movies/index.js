import express from 'express';
import asyncHandler from 'express-async-handler';
import { 
  getMovies, 
  getMovie,
  getGenres,
  getUpcomingMovies,
  getPopularMovies,
  getTopRatedMovies,
  getMovieImages,
  getMovieReviews,
  getActors,
  getActorDetails,
  getMovieRecommendations,
  getActorsMovies,
  getMovieCredits
} from '../tmdb-api';

const router = express.Router();


router.get('/', asyncHandler(async (req, res) => {
  const movies = await getMovies();
  res.status(200).json(movies);
}));


router.get('/:id', asyncHandler(async (req, res) => {
  const movie = await getMovie({ queryKey: [null, { id: req.params.id }] });
  res.status(200).json(movie);
}));


router.get('/popular', asyncHandler(async (req, res) => {
  const movies = await getPopularMovies();
  res.status(200).json(movies);
}));


router.get('/discover', asyncHandler(async (req, res) => {
  const movies = await getMovies();
  res.status(200).json(movies);
}));


router.get('/upcoming', asyncHandler(async (req, res) => {
  const movies = await getUpcomingMovies();
  res.status(200).json(movies);
}));


router.get('/top-rated', asyncHandler(async (req, res) => {
  const movies = await getTopRatedMovies();
  res.status(200).json(movies);
}));


router.get('/genres', asyncHandler(async (req, res) => {
  const genres = await getGenres();
  res.status(200).json(genres);
}));


router.get('/:id/images', asyncHandler(async (req, res) => {
  const images = await getMovieImages({ queryKey: [null, { id: req.params.id }] });
  res.status(200).json(images);
}));


router.get('/:id/reviews', asyncHandler(async (req, res) => {
  const reviews = await getMovieReviews({ queryKey: [null, { id: req.params.id }] });
  res.status(200).json(reviews);
}));


router.get('/:id/actors', asyncHandler(async (req, res) => {
  const actors = await getActors({ queryKey: [null, { id: req.params.id }] });
  res.status(200).json(actors);
}));


router.get('/actors/:id', asyncHandler(async (req, res) => {
  const actor = await getActorDetails({ queryKey: [null, { id: req.params.id }] });
  res.status(200).json(actor);
}));


router.get('/:id/credits', asyncHandler(async (req, res) => {
  const credits = await getMovieCredits({ queryKey: [null, { id: req.params.id }] });
  res.status(200).json(credits);
}));

router.get('/:id/recommendations', asyncHandler(async (req, res) => {
  const recommendations = await getMovieRecommendations({ queryKey: [null, { id: req.params.id }] });
  res.status(200).json(recommendations);
}));


router.get('/actors/:id/movie-credits', asyncHandler(async (req, res) => {
  const movies = await getActorsMovies({ queryKey: [null, { id: req.params.id }] });
  res.status(200).json(movies);
}));

export default router;
