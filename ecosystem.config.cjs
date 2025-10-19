module.exports = {
  apps: [
    {
      name: "kyc",
      cwd: "./",
      script: "pnpm",
      args: "preview --host 0.0.0.0 --port 4173 --strictPort",
      env: { NODE_ENV: "production" },
      autorestart: true,
      watch: false,
      max_memory_restart: "500M",
    },
  ],
}


