import React, { useState, useEffect, createContext, useContext } from "react";
import { AuthContext } from "./AuthContext";
import { getUserMovies, addMovie, deleteMovie } from "../api/movies-api";

export const MoviesContext = createContext();

const MoviesContextProvider = (props) => {
  const { token } = useContext(AuthContext);

  const [favorites, setFavorites] = useState([]);
  const [mustWatch, setMustWatch] = useState([]);
  const [myReviews, setMyReviews] = useState({});

 
  const authToken = token || localStorage.getItem("token");

 
  useEffect(() => {
    if (!authToken) return;

    getUserMovies(authToken)
      .then((movies) => {
        setFavorites(movies);
      })
      .catch((err) => console.error("Failed to load user movies:", err));
  }, [authToken]);

  
  const addToFavorites = (movie) => {
    if (!authToken) {
      console.warn("User not authenticated");
      return;
    }

    const movieId = movie.id || movie.movieId;

    
    if (!favorites.find((fav) => fav.movieId === movieId)) {
      const moviePayload = {
        movieId: movieId,
        title: movie.title,
        posterPath: movie.poster_path || movie.posterPath,
        releaseDate: movie.release_date || movie.releaseDate,
        voteAverage: movie.vote_average || movie.voteAverage,
        overview: movie.overview,
      };

      addMovie(moviePayload, authToken)
        .then((savedMovie) => {
          setFavorites([...favorites, savedMovie]);
        })
        .catch((err) => console.error("Failed to save movie:", err));
    }
  };

 
  const removeFromFavorites = (movie) => {
    const movieId = movie.id || movie.movieId;

    const fav = favorites.find((f) => f.movieId === movieId);
    if (!fav) return;

    deleteMovie(fav._id, authToken)
      .then(() => {
        setFavorites(favorites.filter((f) => f.movieId !== movieId));
      })
      .catch((err) => console.error("Failed to delete movie:", err));
  };

  // Must Watch
  const addToMustWatch = (movie) => {
    const movieId = movie.id || movie.movieId;
    setMustWatch((prev) => {
      if (!prev.includes(movieId)) {
        return [...prev, movieId];
      }
      return prev;
    });
  };

  // Reviews
  const addReview = (movie, review) => {
    const movieId = movie.id || movie.movieId;
    setMyReviews({ ...myReviews, [movieId]: review });
  };

  return (
    <MoviesContext.Provider
      value={{
        favorites,
        addToFavorites,
        removeFromFavorites,
        mustWatch,
        addToMustWatch,
        myReviews,
        addReview,
      }}
    >
      {props.children}
    </MoviesContext.Provider>
  );
};

export default MoviesContextProvider;
