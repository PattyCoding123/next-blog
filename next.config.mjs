/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./src/env.mjs");

/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: true,

  /**
   * If you have `experimental: { appDir: true }` set, then you must comment the below `i18n` config
   * out.
   *
   * @see https://github.com/vercel/next.js/issues/41980
   */
  experimental: {
    appDir: true,
  },
  /**
   * For images from outside the public folder, we will specify the remotePatterns
   * to match the domain of the image URL.
   *
   * @see https://nextjs.org/docs/pages/building-your-application/optimizing/images#remote-images
   */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "raw.githubusercontent.com",
        port: "",
        pathname: "/PattyCoding123/blog-posts/main/images/**",
      },
    ],
  },
};
export default config;
