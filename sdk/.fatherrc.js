import { defineConfig } from "father";

export default defineConfig({
  esm: {
    input: 'src',
    output: 'dist',
    platform: 'browser',
    transformer: 'swc',
  },
})
