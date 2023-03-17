import { IMovieCollection, IMovie } from "../App";
import { getMovieInfo, getNetflixOriginals } from "../pagesdata/PageData";
import { useEffect, useState } from "react";
import "./css/HighlightMovie.css";

export function HighlightMovie() {
  const [highlightMovie, sethighlightMovie] = useState<any>();

  useEffect(() => {
    const netflixOriginals = async () => {
      const data = await getNetflixOriginals();
      const netflixOriginals: IMovieCollection = data;

      if (netflixOriginals != undefined) {
        const highlightMovie = chooseRandomMovie(netflixOriginals);

        const movie = await getMovieInfo(highlightMovie.id, "tv");
        sethighlightMovie(movie);
      }
    };

    netflixOriginals();
  }, []);

  console.log(`Movie info: ${highlightMovie?.backdrop_path}`);

  if (highlightMovie != undefined) {
    const releseadDate = new Date(highlightMovie.first_air_date);
    const genres = []

    for(let i in highlightMovie.genres) {
      genres.push(highlightMovie.genres[i].name)
    }

    return (
      <section
        className="highlight-movie"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original${highlightMovie.backdrop_path})`,
        }}
      >
        <div className="highlight-movie-vertical">
          <div className="highlight-movie-horizontal">
            <div className="highlight-movie-name">
              {highlightMovie.original_name}
            </div>
            <div className="highlight-movie-info">
              <div className="highlight-movie-rating">
                {highlightMovie.vote_average} Rating
              </div>
              <div className="highlight-movie-released-date">{releseadDate.getFullYear()}</div>
              <div className="highlight-movie-seasons">
                Seasons: {highlightMovie.number_of_seasons}
              </div>
            </div>
            <div className="highlight-movie-description">
              {highlightMovie.overview}
            </div>
            <div className="highlight-movie-buttons">
              <a href="" className="highlight-movie-watch-button">▶ Watch</a>
              <a href="" className="highlight-movie-add-list-button">+ To Your List</a>
            </div>
            <div className="highlight-movie-genres">
              <strong>Genres: {genres.join(', ')}</strong>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return <section className="highlight-movie"></section>;
}

function chooseRandomMovie(movieCollection: IMovieCollection) {
  const random = Math.floor(
    Math.random() * (movieCollection!!.items.results.length - 1)
  );

  const movieChoosen = movieCollection!!.items.results[random];

  console.log(movieChoosen);

  return movieCollection!!.items.results[random];
}
