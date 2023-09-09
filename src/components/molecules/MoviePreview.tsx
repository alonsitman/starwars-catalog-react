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
  description: string;
  isFavorite: boolean; // Add a prop for favorite status
  onFavoriteToggle: () => void; // Add a prop for the toggle function
};

const MoviePreview: FC<MoviePreviewProps> = ({
  movieTitle,
  posterUrl,
  releaseYear,
  director,
  description,
  isFavorite,
  onFavoriteToggle,
}) => {

  return (
  <div style={moviePreviewStyle}>
  <div style={{ position: "relative" }}>
    <MoviePoster movieTitle={movieTitle} posterUrl={posterUrl} />
    <button
      onClick={onFavoriteToggle}
      style={{
        position: "absolute",
        top: "10px",
        right: "10px",
        backgroundColor: "transparent",
        border: "none",
        cursor: "pointer",
      }}
    >
      {isFavorite ? (
        <span style={{ color: "red", fontSize: "24px" }}>&#10084;</span>
      ) : (
        <span style={{ color: "gray", fontSize: "24px" }}>&#10084;</span>
      )}
    </button>
  </div>
  <MovieLabel title={movieTitle} year={releaseYear} />
  <MovieInfo label={"Director"} value={director} />
  <MovieInfo label={"Description"} value={description} />
</div>

  );
};

export default MoviePreview;
