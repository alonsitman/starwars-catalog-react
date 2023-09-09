import { CSSProperties, FC } from "react";

const movieItemStyle = (selected?: boolean): CSSProperties => {
  return {
    backgroundColor: selected ? "#808080" : "#20232a",
    fontWeight: selected ? "bold" : "normal",
    cursor: "pointer",
    paddingLeft: "0.75em",
    paddingRight: "0.75em",
    paddingTop: "0.2em",
    paddingBottom: "0.2em",
    color: "#ffc300",
    fontFamily: 'StarWarsFont'
  };
};

export type MovieItemProps = {
  id: string;
  title: string;
  selected?: boolean;
  onMovieSelected?: Function;
};

const MovieItem: FC<MovieItemProps> = ({
  id,
  title,
  selected,
  onMovieSelected
}) => {
  return (
    <div
      // setSelectedMovieId ==> onMovieSelected
      onClick={() => onMovieSelected && onMovieSelected(id)}
      style={movieItemStyle(selected)}
    >
      {title}
    </div>
  );
};

export default MovieItem;
