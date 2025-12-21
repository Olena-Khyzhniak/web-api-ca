import React from "react";
import PageTemplate from "../components/templateMovieListPage";
import AddToFavoritesIcon from "../components/cardIcons/addToFavorites";
import { useQuery } from "@tanstack/react-query";
import { getMovies } from "../api/tmdb-api";

const HomePage = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["discover"],
    queryFn: getMovies,
  });

  if (isLoading) return <h2>Loading...</h2>;
  if (error) return <h2>Error loading movies</h2>;

  return (
    <PageTemplate
      title="Best Movies For You"
      movies={data.results}
      action={(movie) => <AddToFavoritesIcon movie={movie} />}
    />
  );
};

export default HomePage;
