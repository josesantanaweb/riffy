module.exports = {
  apps: [
    {
      name: 'api',
      script: 'apps/api/dist/main.js',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'production',
        PORT: 4000,
      },
    },
    {
      name: 'web',
      script: 'apps/web/.next/standalone/server.js',
      cwd: 'apps/web',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'production',
        PORT: 3000,
        HOSTNAME: '0.0.0.0',
      },
    },
    {
      name: 'admin',
      script: 'apps/admin/.next/standalone/server.js',
      cwd: 'apps/admin',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'production',
        PORT: 3001,
        HOSTNAME: '0.0.0.0',
      },
    },
  ],
};
