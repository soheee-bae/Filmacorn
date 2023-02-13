import { GetServerSideProps } from "next";
import { API_KEY, TMDB_REQUEST_URL } from "@/config/index";
import styles from "./MovieDetail.module.scss";
import React from "react";
import { MovieDetail, Cast } from "@/interfaces/movie";
import { Video } from "@/interfaces/video";
import DetailMain from "@/components/DetailMain/DetailMain";

interface MovieDetailProps {
  MovieDetails: MovieDetail;
  Actors: Cast[];
  Director: Cast[];
  Video: Video[];
}

export default function DetailPage(props: MovieDetailProps) {
  const { MovieDetails, Actors, Director, Video } = props;

  console.log(MovieDetails);
  console.log(Actors);
  console.log(Director);
  console.log(Video);
  return (
    <div>
      <DetailMain
        movieDetail={MovieDetails}
        cast={Actors}
        director={Director}
        video={Video}
      />
    </div>
    // <Details
    //   data={DetailInfo}
    //   title={DetailInfo.title}
    //   releaseDate={DetailInfo.release_date}
    //   runtime={DetailInfo.runtime}
    //   cast={Actors}
    //   director={Director}
    //   video={Video}
    // />
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { detailId } = context.query;

  const Details = await fetch(
    `${TMDB_REQUEST_URL}/movie/${detailId}${API_KEY}&language=en-US`
  );
  const MovieDetails = await Details.json();

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

  const DetailVideoData = await fetch(
    `${TMDB_REQUEST_URL}/movie/${detailId}/videos${API_KEY}`
  );
  const DetailVideo = await DetailVideoData.json();
  const DetailVideos = DetailVideo.results;

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