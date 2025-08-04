import { createJiti } from "jiti";
const jiti = createJiti(import.meta.url);

/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
jiti.import("./src/env"); //Import env here to validate during build. Using jiti@^1 we can import .ts files :)

/** @type {import('next').NextConfig} */
const config = {};

export default config;
