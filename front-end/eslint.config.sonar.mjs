import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import sonarjs from "eslint-plugin-sonarjs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    plugins: {
      sonarjs,
    },
    rules: {
      "sonarjs/cognitive-complexity": ["error", 12],
      "sonarjs/no-duplicate-string": ["error", 2],
      "sonarjs/no-identical-functions": "error",
      "sonarjs/no-small-switch": "warn",
      "sonarjs/no-all-duplicated-branches": "error",
    },
  },
];

export default eslintConfig;
