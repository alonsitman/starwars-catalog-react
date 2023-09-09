import { CSSProperties, FC, useEffect, useState } from "react";
import MovieInfo from "../atoms/MovieInfo";
import MovieLabel from "../atoms/MovieLabel";
import MoviePoster from "../atoms/MoviePoster";

const moviePreviewStyle: CSSProperties = {
  padding: "0.75em",
  paddingTop: "1em",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  width: "100%"
};

const favoriteButtonStyle: CSSProperties = {
  cursor: "pointer",
  fontSize: "24px",
  color: "grey",
};

export type MoviePreviewProps = {
  movieTitle: string;
  posterUrl: string;
  releaseYear: string;
  director: string;
};

const MoviePreview: FC<MoviePreviewProps> = ({
  movieTitle,
  posterUrl,
  releaseYear,
  director,
}) => {

  const [isFavorite, setIsFavorite] = useState(false);

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  return (
    <div style={moviePreviewStyle}>
      <MoviePoster movieTitle={movieTitle} posterUrl={posterUrl} />
      <MovieLabel title={movieTitle} year={releaseYear} />
      <MovieInfo label={"Director"} value={director} />
      <button onClick={toggleFavorite}>
        {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
      </button>
    </div>
  );
};

export default MoviePreview;
