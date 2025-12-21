import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardHeader from "@mui/material/CardHeader";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CalendarIcon from "@mui/icons-material/CalendarTodayTwoTone";
import StarRateIcon from "@mui/icons-material/StarRate";
import Grid from "@mui/material/Grid";
import img from "../../images/film-poster-placeholder.png";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import { MoviesContext } from "../../contexts/moviesContext";
import Avatar from "@mui/material/Avatar";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useContext } from "react";




export default function MovieCard({ movie, action }) {

  
  const { favorites } = useContext(MoviesContext);
  const movieId = movie.id || movie.movieId || movie._id;
  const isFavorite = favorites.some((fav) => fav.movieId === movieId);

  

  return (
    <Card
      sx={{
        width: 230,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        boxShadow: 7,
        borderRadius: 2,
        transition: "transform 0.2s",
        "&:hover": {
          transform: "scale(1.03)",
        },
      }}
    >
      <CardHeader

      sx={{
    height: 80,             
    paddingBottom: 0,
  }}

        avatar={
    isFavorite ? (
      <Avatar sx={{ backgroundColor: "red" }}>
        <FavoriteIcon />
      </Avatar>
    ) : null
  }


        title={
          <Typography
            variant="h6"
            component="div"
            align="center"
            sx={{ fontWeight: "bold", WebkitLineClamp: 2, fontSize: "1rem", paddingX: 1 }}
          >
            {movie.title}
          </Typography>
        }
      />

      <Link to={`/movies/${movieId}`}>
        <CardMedia
          component="img"
          sx={{ height: 260, objectFit: "cover" }}
          image={
            movie.poster_path
              ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
              : movie.posterPath
              ? `https://image.tmdb.org/t/p/w500/${movie.posterPath}`
              : img
          }
        />
      </Link>

      <CardContent sx={{ px: 2, py: 1 }}>
        <Box
          sx={{
            backgroundColor: "#decfde99",
            borderRadius: 1,
            padding: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 1,
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          <Typography
            variant="body2"
            sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
          >
            <CalendarIcon fontSize="small" />
            {movie.release_date || movie.releaseDate || "—"}
          </Typography>

          <Typography
            variant="body2"
            sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
          >
            <StarRateIcon fontSize="small" />
            {movie.vote_average || movie.voteAverage || "—"}
          </Typography>
        </Box>
      </CardContent>

      <CardActions sx={{ justifyContent: "center", pb: 1 }}>
        
        {action(movie)}

        <Link to={`/movies/${movieId}`}>
          <Button variant="outlined" size="small" color="primary">
            More Info
          </Button>
        </Link>
      </CardActions>
    </Card>
  );
}
