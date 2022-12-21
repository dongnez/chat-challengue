/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images:{
    domains: ["firebasestorage.googleapis.com","images.pexels.com"]
  },
  experimental:{
    //appDir: true,
  }
}

module.exports = nextConfig
