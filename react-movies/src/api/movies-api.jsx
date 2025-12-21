

const API_BASE = "http://localhost:8080/api/movies";

// Get movies for logged-in user
export const getUserMovies = async (token) => {
  const response = await fetch(API_BASE, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to load user movies");
  }

  return response.json();
};

// Add movie to user's favorites
export const addMovie = async (movieData, token) => {
  const response = await fetch(API_BASE, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,

    },
    body: JSON.stringify(movieData),
  });

  if (!response.ok) {
    throw new Error("Failed to save movie");
  }

  return response.json();
};

// Delete movie from user's favorites
export const deleteMovie = async (id, token) => {
  const response = await fetch(`${API_BASE}/${id}`, {
    method: "DELETE",
    headers: {
        Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to delete movie");
  }

  return response;
};


export const updateMovie = async (movieData, token) => {
  const response = await fetch(`${API_BASE}/${movieData._id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(movieData),
  });

  if (!response.ok) {
    throw new Error("Failed to update movie");
  }

  return response.json();
};
