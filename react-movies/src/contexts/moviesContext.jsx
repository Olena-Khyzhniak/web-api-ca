import React, { useState, useEffect, createContext, useContext } from "react";
import { AuthContext } from "./AuthContext";
import { getUserMovies, saveFavoriteMovie, deleteFavoriteMovie } from "../api/tmdb-api";

export const MoviesContext = createContext();

const MoviesContextProvider = (props) => {
  const { token } = useContext(AuthContext);

  const [favorites, setFavorites] = useState([]);
  const [mustWatch, setMustWatch] = useState([]);
  const [myReviews, setMyReviews] = useState({});

  
  
  
  useEffect(() => {
    if (token) {
      getUserMovies(token)
        .then((movies) => {
          setFavorites(movies);
        })
        .catch((err) => console.error("Failed to load user movies:", err));
    }
  }, [token]);

 

  
  const addToFavorites = (movie) => {
    if (!favorites.find((fav) => fav.movieId === movie.id)) {
      const moviePayload = {
        movieId: movie.id,
        title: movie.title,
        posterPath: movie.poster_path,
        releaseDate: movie.release_date,
        voteAverage: movie.vote_average,
        overview: movie.overview,
      };

      saveFavoriteMovie(moviePayload, token)
        .then((savedMovie) => {
          setFavorites([...favorites, savedMovie]);
        })
        .catch((err) => console.error("Failed to save movie:", err));
    }
  };

 
  const removeFromFavorites = (movie) => {
    const fav = favorites.find((f) => f.movieId === movie.id);
    if (!fav) return;

    deleteFavoriteMovie(fav._id, token)
      .then(() => {
        setFavorites(favorites.filter((f) => f.movieId !== movie.id));
      })
      .catch((err) => console.error("Failed to delete movie:", err));
  };


  const addToMustWatch = (movie) => {
    setMustWatch((prev) => {
      if (!prev.includes(movie.id)) {
        return [...prev, movie.id];
      }
      return prev;
    });
  };

 
  const addReview = (movie, review) => {
    setMyReviews({ ...myReviews, [movie.id]: review });
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
