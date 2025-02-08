import reactPlugin from "eslint-plugin-react";
import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import nextPlugin from "@next/eslint-plugin-next";
import hooksPlugin from "eslint-plugin-react-hooks";

/** @type {import('eslint').Linter.Config[]} */
export default tseslint.config({
	// nextPlugin.configs.recommended,
	plugins: {
		react: reactPlugin,
		"react-hooks": hooksPlugin,
		"@next/next": nextPlugin,
	},
	rules: {
		...reactPlugin.configs["jsx-runtime"].rules,
		...reactPlugin.configs.recommended.rules,
		...hooksPlugin.configs.recommended.rules,
		...nextPlugin.configs.recommended.rules,
		...nextPlugin.configs["core-web-vitals"].rules,
		"@next/next/no-img-element": "error",
		"react/react-in-jsx-scope": "off",
	},
	extends: [eslint.configs.recommended, tseslint.configs.recommended],
});
