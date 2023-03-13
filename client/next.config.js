/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  images: {
    loader: "default",
    domains: ["localhost", "temujin-blog-strapi.herokuapp.com", "res.cloudinary.com"],
  },
}

module.exports = nextConfig
