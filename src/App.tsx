import { FC } from "react";
import "./styles.css";

import Header from "./components/atoms/Header";
import MovieCatalogue from "./components/organisms/MovieCatalogue";
import data from "../static/movie-data.json";

const App: FC<{}> = () => {
  return (
    <div className="App">
      <Header />
      <MovieCatalogue movieListData={data} />
    </div>
  );
};

export default App;
