import express from "express";
import asyncHandler from "express-async-handler";
import { getMovies } from "../tmdb-api";
import Movie from "./movieModel";
import authenticate from "../../authenticate";


const router = express.Router();

// PUBLIC ROUTES 

// Public TMDB discover
router.get(
  "/discover",
  asyncHandler(async (req, res) => {
    const discoverMovies = await getMovies();
    res.status(200).json(discoverMovies);
  })
);



// PROTECTED ROUTES

router.use(authenticate);

// Get movies for logged-in user
router.get(
  "/",
  asyncHandler(async (req, res) => {
    const movies = await Movie.find({ userId: req.user._id });
    res.status(200).json(movies);
  })
);

// Get movies for specific user (admin or future use)
router.get(
  "/user/:uid",
  asyncHandler(async (req, res) => {
    const movies = await Movie.find({ userId: req.params.uid });
    res.status(200).json(movies);
  })
);

// Create movie
router.post(
  "/",
  asyncHandler(async (req, res) => {
    const newMovie = { ...req.body, userId: req.user._id };
    const movie = await Movie(newMovie).save();
    res.status(201).json(movie);
  })
);

// Update movie
router.put(
  "/:id",
  asyncHandler(async (req, res) => {
    if (req.body._id) delete req.body._id;

    const result = await Movie.updateOne({ _id: req.params.id }, req.body);

    if (result.matchedCount) {
      res.status(200).json({ code: 200, msg: "Movie Updated Successfully" });
    } else {
      res.status(404).json({ code: 404, msg: "Unable to find Movie" });
    }
  })
);

// Delete movie
router.delete(
  "/:id",
  asyncHandler(async (req, res) => {
    const result = await Movie.deleteOne({ _id: req.params.id });

    if (result.deletedCount) {
      res.status(204).json();
    } else {
      res.status(404).json({ code: 404, msg: "Unable to find Movie" });
    }
  })
);

export default router;
