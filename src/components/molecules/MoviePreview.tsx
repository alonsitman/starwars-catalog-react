import { CSSProperties, FC } from "react";
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

export type MoviePreviewProps = {
  movieTitle: string;
  posterUrl: string;
  releaseYear: string;
  director: string;
  isFavorite: boolean; // Add a prop for favorite status
  onFavoriteToggle: () => void; // Add a prop for the toggle function
};

const MoviePreview: FC<MoviePreviewProps> = ({
  movieTitle,
  posterUrl,
  releaseYear,
  director,
  isFavorite,
  onFavoriteToggle,
}) => {

  return (
    <div style={moviePreviewStyle}>
      <MoviePoster movieTitle={movieTitle} posterUrl={posterUrl} />
      <MovieLabel title={movieTitle} year={releaseYear} />
      <MovieInfo label={"Director"} value={director} /> 
      <button onClick={onFavoriteToggle}>
        {isFavorite ? "Add to Favorites" : "Remove from Favorites" }
      </button>
    </div>
  );
};

export default MoviePreview;
