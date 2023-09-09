import { CSSProperties, FC } from "react";
import MovieItem, { MovieItemProps } from "../atoms/MovieItem";

const movieListStyles: CSSProperties = {
  backgroundColor: "#20232a",
  height: "100%",
  paddingTop: "1em",
  width: "100%",
  display: "flex",
  flexDirection: "column"
};

type MovieListProps = {
  movieItemList: Omit<MovieItemProps, "onItemClicked">[];
  selectedMovieId: string;
  onMovieSelected: Function;
};

const MovieList: FC<MovieListProps> = ({
  movieItemList,
  selectedMovieId,
  onMovieSelected
}) => {
  return (
    <div style={movieListStyles}>
      {movieItemList.map(({ id, title }) => {
        return (
          <MovieItem
            key={id}
            id={id}
            title={title}
            selected={id === selectedMovieId}
            onMovieSelected={onMovieSelected}
          />
        );
      })}
    </div>
  );
};

export default MovieList;
