import axios from "axios";
import OneContent from "../../components/OneContent/OneContent";
import CustPagination from "../../components/Pagination/CustPagination";
import Genres from "../../components/Genres/Genres";
import useGenre from "../../holder/useGenre";
import React, { useState, useEffect } from "react";

const Series = () => {
  const [genres, setGenres] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [page, setPage] = useState(1);
  const [content, setContent] = useState([]);
  const [numOfPages, setNumOfPages] = useState();
  const genreforURL = useGenre(selectedGenres);

  const fetchSeries = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/discover/tv?api_key=e87731f13becefa826f6e5ce56429440&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_watch_monetization_types=flatrate&with_genres=${genreforURL}&sort_by=vote_average.desc`
    );
    setContent(data.results);
    setNumOfPages(data.total_pages);
    // console.log(data);
  };

  useEffect(() => {
    window.scroll(0, 0);
    fetchSeries();
    // eslint-disable-next-line
  }, [genreforURL, page]);

  return (
    <div>
      <span className="pageTitle">Discover Series</span>
      <Genres type="tv" selectedGenres={selectedGenres} setSelectedGenres={setSelectedGenres} genres={genres} setGenres={setGenres} setPage={setPage} />
      <div className="trending">
        {content && content.map((c) => <OneContent key={c.id} id={c.id} poster={c.poster_path} title={c.title || c.name} date={c.first_air_date || c.release_date} media_type="tv" vote_average={c.vote_average} />)}
      </div>
      {numOfPages > 1 && <CustPagination setPage={setPage} numOfPages={numOfPages} />}
    </div>
  );
};

export default Series;
