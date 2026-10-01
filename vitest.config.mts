import { defineConfig } from "vitest/config";
import path from "node:path";

const root = import.meta.dirname;

export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(root, "./src"),
      // `server-only` throws on import outside a React Server Component, which
      // is exactly what it is for — but it also means any module carrying that
      // guard is unimportable from a test runner. Stubbing it lets us test the
      // pure logic inside server-only modules (the admin allowlist, above all)
      // without weakening the guard that ships.
      "server-only": path.resolve(root, "./src/test/server-only-stub.ts"),
    },
  },
  test: {
    environment: "node",
    include: ["src/**/*.test.ts"],
  },
});
