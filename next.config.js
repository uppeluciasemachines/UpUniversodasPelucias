/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configuração de imagens do Supabase
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'qrdtmsjwnovcnjwfesss.supabase.co',
        pathname: '/storage/v1/object/public/**',
      },
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
      },
    ],
  },
}

module.exports = nextConfig
