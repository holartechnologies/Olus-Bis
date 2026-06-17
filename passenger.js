const { spawn } = require("child_process");
const path = require("path");

const PORT = process.env.PORT || 3000;
const appDir = __dirname;

console.log(`[passenger] Starting Next.js on port ${PORT}...`);
process.env.PORT = String(PORT);

const next = spawn(
  path.join(appDir, "node_modules", "next", "dist", "bin", "next"),
  ["start", "-p", String(PORT)],
  {
    cwd: appDir,
    env: { ...process.env },
    stdio: ["inherit", "inherit", "inherit"],
  }
);

next.on("error", (err) => {
  console.error("[passenger] Failed to start Next.js:", err.message);
  process.exit(1);
});

next.on("close", (code) => {
  console.log(`[passenger] Next.js exited with code ${code}`);
  process.exit(code);
});

process.on("SIGTERM", () => next.kill("SIGTERM"));
process.on("SIGINT", () => next.kill("SIGINT"));
