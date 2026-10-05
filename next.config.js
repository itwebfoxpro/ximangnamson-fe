/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === "production";

// const nextConfig = {
//   // output: "export",
//   trailingSlash: false,
//   images: {
//     unoptimized: true,
//   },
// };

const nextConfig = {
  ...(isProd && {
    output: "export",
    trailingSlash: false,
    images: {
      unoptimized: true,
    },
  }),
};

module.exports = nextConfig;
