import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
      images:{
    remotePatterns:[
      { protocol: 'https', hostname:'ac.goit.global'}
    ],
  },
    async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://green-tourism-backend.onrender.com/api/:path*',
      },
    ];
  },
};


export default nextConfig;
