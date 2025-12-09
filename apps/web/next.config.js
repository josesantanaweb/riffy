/** @type {import('next').NextConfig} */
module.exports = {
  transpilePackages: ['@riffy/components'],
  images: {
    domains: [
      'randomuser.me',
      'apps-butket.s3.us-east-1.amazonaws.com',
      'my-person-bucket.s3.us-east-2.amazonaws.com',
      'rifasluxor.online',
    ],
  },
  output: 'standalone',
};
