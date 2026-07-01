/** @type {import('next').NextConfig} */
const isGithubActions = process.env.GITHUB_ACTIONS === 'true';

const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  basePath: isGithubActions ? '/Portfolio-v6' : '',
  assetPrefix: isGithubActions ? '/Portfolio-v6/' : '',
  env: {
    NEXT_PUBLIC_BASE_PATH: isGithubActions ? '/Portfolio-v6' : '',
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
};

export default nextConfig;
