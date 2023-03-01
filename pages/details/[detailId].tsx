import React from "react";
import { GetServerSideProps } from "next";

import { MovieDetail, Cast, Movie } from "@/interfaces/movie";
import DetailMain from "@/components/DetailMain/DetailMain";
import { fetchGenre } from "@/helpers/handleGenre";
import {
  fetchMovieCast,
  fetchMovieDetail,
  fetchSimilarMovie,
} from "@/helpers/handleMovie";

interface MovieDetailProps {
  movieDetails: MovieDetail;
  actors: Cast[];
  directors: Cast[];
  recommendations: Movie[];
}

export default function DetailPage(props: MovieDetailProps) {
  const { movieDetails, actors, directors, recommendations } = props;

  return (
    <DetailMain
      movieDetail={movieDetails}
      cast={actors}
      director={directors}
      recommendations={recommendations}
    />
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { detailId } = context.query;

  const movieDetails = await fetchMovieDetail(detailId as string);
  const recommendations = await fetchSimilarMovie(detailId as string);
  const genre = await fetchGenre();

  const casts = await fetchMovieCast(detailId as string);
  const actors = casts?.cast.filter(
    (cast: Cast) => cast.known_for_department === "Acting"
  );
  const directors =
    casts.crew.filter(
      (crew: Cast) =>
        (crew.job === "Director" || crew.job === "Executive Producer") &&
        crew.known_for_department !== "Acting"
    ) || [];

  return {
    props: {
      movieDetails,
      actors,
      directors,
      recommendations,
      genre,
    },
  };
};
