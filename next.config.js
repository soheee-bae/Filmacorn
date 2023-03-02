/** @type {import('next').NextConfig} */

module.exports = {
  flags: {
    DEV_SSR: false,
  },
  reactStrictMode: true,
  env: {
    REACT_APP_TMDB_APIKEY: process.env.REACT_APP_TMDB_APIKEY,
  },
  images: {
    domains: ["tmdb.org", "themoviedb.org", "image.tmdb.org"],
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
};
