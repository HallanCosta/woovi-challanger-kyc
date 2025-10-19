module.exports = {
  apps: [
    {
      name: "kyc",
      script: "pnpm",
      args: "start",
      cwd: "./",
      autorestart: true,
      watch: false,
      max_memory_restart: "500M",
    },
  ],
};