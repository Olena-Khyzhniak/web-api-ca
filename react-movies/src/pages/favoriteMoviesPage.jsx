import React, { useContext } from "react";
import PageTemplate from "../components/templateMovieListPage";
import RemoveFromFavoritesIcon from "../components/cardIcons/removeFromFavorites";
import { MoviesContext } from "../contexts/moviesContext";
import WriteReview from "../components/cardIcons/writeReview";

const FavoriteMoviesPage = () => {
  const { favorites } = useContext(MoviesContext);

   if (!favorites || favorites.length === 0) {
    return <p style={{ textAlign: "center", marginTop: "2rem" }}>No favorite movies yet.</p>;
  }

  return (
    <PageTemplate
      title="Favorite Movies"
      movies={favorites}
      action={(movie) => <RemoveFromFavoritesIcon movie={movie} />}
    />
  );
};

export default FavoriteMoviesPage;
