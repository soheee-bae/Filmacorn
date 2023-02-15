import React from "react";
import { GetServerSideProps } from "next";

import { API_KEY, TMDB_REQUEST_URL } from "@/config/index";
import { Video } from "@/interfaces/video";
import { MovieDetail, Cast } from "@/interfaces/movie";
import DetailMain from "@/components/DetailMain/DetailMain";

import styles from "./MovieDetail.module.scss";

interface MovieDetailProps {
  MovieDetails: MovieDetail;
  Actors: Cast[];
  Directors: Cast[];
  DetailVideos: Video[];
}

export default function DetailPage(props: MovieDetailProps) {
  const { MovieDetails, Actors, Directors, DetailVideos } = props;

  return (
    <DetailMain
      movieDetail={MovieDetails}
      cast={Actors}
      director={Directors}
      video={DetailVideos}
    />
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { detailId } = context.query;

  /* Movie Detail */
  const Detail = await fetch(
    `${TMDB_REQUEST_URL}/movie/${detailId}${API_KEY}&language=en-US`
  );
  const MovieDetails = await Detail.json();

  /* Video */
  const DetailVideoData = await fetch(
    `${TMDB_REQUEST_URL}/movie/${detailId}/videos${API_KEY}`
  );
  const DetailVideo = await DetailVideoData.json();
  const DetailVideos = DetailVideo.results;

  /* Cast */
  const Cast = await fetch(
    `${TMDB_REQUEST_URL}/movie/${detailId}/credits${API_KEY}&language=en-US`
  );
  const Casts = await Cast.json();
  const Actors = Casts.cast.filter(
    (cast: Cast) => cast.known_for_department === "Acting"
  );
  const Directors =
    Casts.crew.filter(
      (crew: Cast) =>
        (crew.job === "Director" || crew.job === "Executive Producer") &&
        crew.known_for_department !== "Acting"
    ) || [];

  const Director = Casts.crew;
  /* Genre */
  const GenreData = await fetch(
    `${TMDB_REQUEST_URL}/genre/movie/list${API_KEY}&include_adult=false`
  );
  const Genres = await GenreData.json();
  const Genre = Genres.genres;

  return {
    props: {
      MovieDetails,
      Actors,
      Directors,
      DetailVideos,
      Genre,
    },
  };
};
