const API_BASE = "http://localhost:8080/api/movies";


// get a user's movies
export const getUserMovies = async () => {
  const response = await fetch(API_BASE, {
    headers: {
      Authorization: window.localStorage.getItem("token"),
    },
  });
  return response.json();
};

// add a movie to user's favorites
export const addMovie = async (movieData) => {
  const response = await fetch(API_BASE, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: window.localStorage.getItem("token"),
    },
    body: JSON.stringify(movieData),
  });
  return response.json();
};

// delete a movie from user's favorites
export const deleteMovie = async (id) => {
  return fetch(`${API_BASE}/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: window.localStorage.getItem("token"),
    },
  });
};

// update a movie
export const updateMovie = async (movieData) => {
  const response = await fetch(`${API_BASE}/${movieData._id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: window.localStorage.getItem("token"),
    },
    body: JSON.stringify(movieData),
  });
  return response.json();
};
