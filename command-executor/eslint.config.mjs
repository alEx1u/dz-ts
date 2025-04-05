import { defineConfig } from "eslint/config";
import globals from "globals";
import js from "@eslint/js";
import tseslint from "typescript-eslint";
import eslintPluginPrettier from 'eslint-plugin-prettier';


export default defineConfig([
  { files: ["**/*.{js,mjs,cjs,ts}"] },
  { files: ["**/*.{js,mjs,cjs,ts}"], languageOptions: { globals: globals.browser } },
  { 
    files: ["**/*.{js,mjs,cjs,ts}"], 
    plugins: {
       js,
       prettier: eslintPluginPrettier, 
      }, extends: ["js/recommended", "prettier/recommended"] },
  { ignores: ["node_modules", "dist", "package-lock.json"] },
  ...tseslint.configs.recommended,
  tseslint.configs.recommended,
]);