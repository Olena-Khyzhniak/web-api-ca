export const getMovies = async () => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.TMDB_KEY}&language=en-US&include_adult=false&include_video=false&page=1`
    );

    if (!response.ok) {
      const err = await response.json();
      throw new Error(err.status_message || "TMDB error");
    }

    return await response.json();
  } catch (err) {
    console.error("TMDB fetch failed:", err.message);
    return { results: [] }; 
  }
};
