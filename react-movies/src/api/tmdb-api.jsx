

const API_BASE = 'http://localhost:8080/api/movies';


export const getDiscoverMovies = () => {
  return fetch(`${API_BASE}/discover`)
    .then((res) => {
      if (!res.ok) {
        return res.json().then(err => {
          throw new Error(err.status_message || 'Something went wrong');
        });
      }
      return res.json();
    })
    .catch((error) => { throw error; });
};


export const getMovies = () => {
  return fetch(`${API_BASE}`)
    .then(res => res.json())
    .catch(err => { throw err; });
};


export const getMovie = (id) => {
  return fetch(`${API_BASE}/${id}`)
    .then(res => res.json())
    .catch(err => { throw err; });
};


export const getGenres = () => {
  return fetch(`${API_BASE}/genres`)
    .then(res => res.json())
    .catch(err => { throw err; });
};


export const getPopularMovies = () => {
  return fetch(`${API_BASE}/popular`)
    .then(res => res.json())
    .catch(err => { throw err; });
};


export const getTopRatedMovies = () => {
  return fetch(`${API_BASE}/top-rated`)
    .then(res => res.json())
    .catch(err => { throw err; });
};


export const getUpcomingMovies = () => {
  return fetch(`${API_BASE}/upcoming`)
    .then(res => res.json())
    .catch(err => { throw err; });
};


export const getMovieImages = (id) => {
  return fetch(`${API_BASE}/${id}/images`)
    .then(res => res.json())
    .catch(err => { throw err; });
};


export const getMovieReviews = (id) => {
  return fetch(`${API_BASE}/${id}/reviews`)
    .then(res => res.json())
    .catch(err => { throw err; });
};


export const getActors = (id) => {
  return fetch(`${API_BASE}/${id}/actors`)
    .then(res => res.json())
    .catch(err => { throw err; });
};


export const getActorDetails = (id) => {
  return fetch(`${API_BASE}/actors/${id}`)
    .then(res => res.json())
    .catch(err => { throw err; });
};


export const getActorsMovies = (id) => {
  return fetch(`${API_BASE}/actors/${id}/movie-credits`)
    .then(res => res.json())
    .catch(err => { throw err; });
};


export const getMovieRecommendations = (id) => {
  return fetch(`${API_BASE}/${id}/recommendations`)
    .then(res => res.json())
    .catch(err => { throw err; });
};

export const getMovieCredits = (id) => {
  return fetch(`${API_BASE}/${id}/credits`)
    .then(res => res.json())
    .catch(err => { throw err; });    
};