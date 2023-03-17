import { NavigateNext } from '@material-ui/icons';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import { useState } from 'react';
import { IMovieCollection } from "../App";
import "./css/MovieCollection.css";

export function MovieCollection(category: IMovieCollection) {
  const [scrollX, setScrollX] = useState(0)

  const handleLeftArrow = () => {
    let x = scrollX + Math.round(window.innerWidth / 2)

    if (x > 0) {
      x = 0;
    }

    setScrollX(x)
  }

  const handleRightArrow = () => {
    let x = scrollX - Math.round(window.innerWidth / 2)
    let maximumItems = category.items.results.length * 150

    if ((window.innerWidth - maximumItems) > x) {
      x = (window.innerWidth - maximumItems) - 60
    }

    setScrollX(x)
  }

  return (
    <div className="movieCollection">
      <h2>{category.title}</h2>
      <div className="movieCollection-left" onClick={handleLeftArrow}>
        <NavigateBeforeIcon style={{fontSize: 50}}></NavigateBeforeIcon>
      </div>
      <div className='movieCollection-right' onClick={handleRightArrow}>
        <NavigateNextIcon style={{fontSize: 50}}></NavigateNextIcon>
      </div>
      <div className="movieCollection-area">
        <div className="movieCollection-row" style={{
            marginLeft: scrollX,
            width: category.items.results.length * 150
        }}>
          {category.items.results.map((movie) => {
            return (
              <div className="movieCollection-item">
                <img
                  src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                  alt={movie.original_title}
                ></img>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}