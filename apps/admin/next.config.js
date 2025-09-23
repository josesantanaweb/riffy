/** @type {import('next').NextConfig} */
module.exports = {
  transpilePackages: ['@riffy/components'],
  images: {
    domains: ['randomuser.me', 'my-person-bucket.s3.us-east-2.amazonaws.com'],
  },
  output: 'standalone',
};
