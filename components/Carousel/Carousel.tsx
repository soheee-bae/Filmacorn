import Link from "next/link";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import styles from "./Carousel.module.scss";

import { Movie } from "@/interfaces/movie";
import CarouselCard from "@/components/CarouselCard/CarouselCard";

const responsive = {
  others: {
    breakpoint: { max: 4000, min: 1500 },
    items: 8,
    slidesToSlide: 6,
  },
  extraLargeDesktop: {
    breakpoint: { max: 1500, min: 1200 },
    items: 6,
    slidesToSlide: 5,
  },
  largeDesktop: {
    breakpoint: { max: 1200, min: 992 },
    items: 5,
    slidesToSlide: 4,
  },
  desktop: {
    breakpoint: { max: 992, min: 768 },
    items: 4,
    slidesToSlide: 3,
  },
  tablet: {
    breakpoint: { max: 768, min: 576 },
    items: 3,
    slidesToSlide: 2,
  },
  mobile: {
    breakpoint: { max: 576, min: 0 },
    items: 2,
    slidesToSlide: 2,
  },
};

interface CarouselListsProps {
  data: Movie[];
}
export default function CarouselLists(props: CarouselListsProps) {
  const { data } = props;

  return (
    <Carousel ssr={true} responsive={responsive} className={styles.carousel}>
      {data?.map((info: Movie) => {
        return (
          <Link href={`/details/${info.id}`}>
            <CarouselCard key={info.id} info={info} />
          </Link>
        );
      })}
    </Carousel>
  );
}
