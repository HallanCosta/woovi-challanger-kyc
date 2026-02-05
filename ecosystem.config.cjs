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
    {
      name: "kyc-storybook",
      cwd: "./",
      script: "npx",
      args: "serve storybook-static -l 4172",
      env: { NODE_ENV: "production", PORT: 4172 },
      autorestart: true,
      watch: false,
      max_memory_restart: "200M",
    },
  ],
}
