import { defineConfig } from "eslint-define-config";
import reactPlugin from "eslint-plugin-react";
import typescriptPlugin from "@typescript-eslint/eslint-plugin";

export default defineConfig([
  {
    languageOptions: {
      globals: {
        window: "readonly",
        document: "readonly",
      },
    },
    plugins: {
      react: reactPlugin,
      "@typescript-eslint": typescriptPlugin,
    },
    rules: {
      "react/react-in-jsx-scope": "off",
    },
  },
  {
    files: ["*.ts", "*.tsx"],
    languageOptions: {
      parser: "@typescript-eslint/parser",
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
      },
    },
  },
]);
