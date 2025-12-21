import React, { useContext } from "react";
import { MoviesContext } from "../../contexts/moviesContext";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";

const RemoveFromFavoritesIcon = ({ movie }) => {
  const { removeFromFavorites } = useContext(MoviesContext);

  const handleRemove = (e) => {
    e.preventDefault();
    removeFromFavorites(movie);
  };

  return (
    <IconButton aria-label="remove from favorites" onClick={handleRemove}>
      <FavoriteIcon color="error" fontSize="large" />
    </IconButton>
  );
};

export default RemoveFromFavoritesIcon;
