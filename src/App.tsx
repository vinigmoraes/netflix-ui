/* eslint-disable import/no-anonymous-default-export */
import { useEffect, useState } from "react";
import getHomepageData from "./pagesdata/PageData";
import "./App.css";
import { MovieCollection } from "./components/MovieCollection";
import { HighlightMovie } from "./components/HighlightMovie";
import { Header } from "./components/Header";

export interface IMovie {
  adult: boolean;
  original_title: string;
  backdrop_path: string;
  first_air_date: string;
  genre_ids: number[];
  id: number;
  name: string;
  original_country: string[];
  original_language: string;
  overview: string;
  popularity: number;
  poster_path: string;
  vote_average: number;
  vote_count: number;
}

export interface IMovieCollectionResult {
  page: number;
  results: IMovie[];
  total_pages: number;
  total_results: number;
}

export interface IMovieCollection {
  slug: string;
  title: string;
  items: IMovieCollectionResult;
}

export default () => {
  const [movieCollection, setMovieCollection] = useState<IMovieCollection[]>([]);
  const [activeBlackHeader, setActiveBlackHeader] = useState<boolean>(false);
  const [showLoading, setLoading] = useState<boolean>(true)

  const sleep = async (milliseconds: number) => {
    await new Promise(resolve => {
        return setTimeout(resolve, milliseconds)
    });
};

  useEffect(() => {
    const homePageData = async () => {
      const data = await getHomepageData();
      setMovieCollection(data);
      await sleep(1000)
      setLoading(false)
    };

    homePageData();
  }, []);

  useEffect(() => {
    const scrollListener = () => {
      if (window.scrollY > 10) {
        setActiveBlackHeader(true);
      } else {
        setActiveBlackHeader(false);
      }
    };

    window.addEventListener("scroll", scrollListener);

    return () => {
      window.removeEventListener("scroll", scrollListener);
    };
  }, []);

  return (
    <div className="page">
      <section className="lists">
        <Header isBlackHeaderActive={activeBlackHeader}></Header>
        <HighlightMovie></HighlightMovie>
        {movieCollection?.map((collection, key) => (
          <MovieCollection
            slug={collection.slug}
            title={collection.title}
            items={collection.items}
          ></MovieCollection>
        ))}
      </section>

      {showLoading && (
        <div className="loading">
          <img
            src="https://media.filmelier.com/noticias/br/2020/03/Netflix_LoadTime.gif"
            alt="Loading"
          ></img>
        </div>
      )}
    </div>
  );
};
