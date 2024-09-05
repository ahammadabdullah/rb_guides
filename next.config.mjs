/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'plus.unsplash.com',
                port: '',
            },
            {
                protocol: 'https',
                hostname: 'pixahive.com',
                port: '',
            }
        ],
    },
};

export default nextConfig;
