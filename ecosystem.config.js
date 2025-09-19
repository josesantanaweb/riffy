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
      script: 'node_modules/.bin/next',
      args: 'start',
      cwd: 'apps/web',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'production',
        PORT: 3000,
      },
    },
    {
      name: 'admin',
      script: '.next/standalone/apps/admin/server.js',
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
