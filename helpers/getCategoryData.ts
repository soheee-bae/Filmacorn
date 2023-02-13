const titleLists = [
  {
    title: "Spotlight",
    link: "/trending/all/day",
    specific: false,
  },
  {
    title: "Popular Movies",
    link: "/movie/popular",
    specific: false,
  },
  {
    title: "Upcoming Movies",
    link: "/movie/upcoming",
    specific: false,
  },
  {
    title: "Top rated Movies",
    link: "/movie/top_rated",
    specific: false,
  },
  {
    title: "Thriller",
    link: "/discover/movie",
    categoryId: 53,
    specific: true,
  },
  {
    title: "Family",
    link: "/discover/movie",
    categoryId: 10751,
    specific: true,
  },
  {
    title: "Western",
    link: "/discover/movie",
    categoryId: 37,
    specific: true,
  },
  {
    title: "Animation",
    link: "/discover/movie",
    categoryId: 16,
    specific: true,
  },
];

Object.freeze(titleLists);

export const getCategoryData = async (title: string | string[] | null) => {
  const titleData = titleLists.find((item) => {
    return item.title === title;
  });
  return titleData;
};
