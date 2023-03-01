import React from "react";
import { GetServerSideProps } from "next";

import { API_KEY, TMDB_REQUEST_URL } from "@/config/index";
import { Video } from "@/interfaces/video";
import { MovieDetail, Cast, Movie } from "@/interfaces/movie";
import DetailMain from "@/components/DetailMain/DetailMain";
import { fetchGenre } from "@/helpers/handleGenre";

interface MovieDetailProps {
  movieDetails: MovieDetail;
  actors: Cast[];
  directors: Cast[];
  recommendations: Movie[];
  detailVideos: Video[];
}

export default function DetailPage(props: MovieDetailProps) {
  const { movieDetails, actors, directors, recommendations, detailVideos } =
    props;

  return (
    <DetailMain
      movieDetail={movieDetails}
      cast={actors}
      director={directors}
      video={detailVideos}
      recommendations={recommendations}
    />
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { detailId } = context.query;

  /* Movie Detail */
  const movieDetail = await fetch(
    `${TMDB_REQUEST_URL}/movie/${detailId}${API_KEY}&language=en-US`
  );
  const movieDetails = await movieDetail.json();

  /* Video */
  const detailVideoData = await fetch(
    `${TMDB_REQUEST_URL}/movie/${detailId}/videos${API_KEY}`
  );
  const detailVideo = await detailVideoData.json();
  const detailVideos = detailVideo.results;

  /* Cast */
  const cast = await fetch(
    `${TMDB_REQUEST_URL}/movie/${detailId}/credits${API_KEY}&language=en-US`
  );
  const casts = await cast.json();
  const actors = casts.cast.filter(
    (cast: Cast) => cast.known_for_department === "Acting"
  );
  const directors =
    casts.crew.filter(
      (crew: Cast) =>
        (crew.job === "Director" || crew.job === "Executive Producer") &&
        crew.known_for_department !== "Acting"
    ) || [];

  /* Similar */
  const similar = await fetch(
    `${TMDB_REQUEST_URL}/movie/${detailId}/similar${API_KEY}&language=en-US&page=1`
  );
  const similarData = await similar.json();
  const recommendations = similarData.results;

  const genre = await fetchGenre();

  return {
    props: {
      movieDetails,
      actors,
      directors,
      recommendations,
      detailVideos,
      genre,
    },
  };
};
