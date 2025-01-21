import tseslint from "typescript-eslint";
import jsConfig from "@eslint/js";
import globals from "globals";
import unusedImports from "eslint-plugin-unused-imports";
import unicornConfig from "eslint-plugin-unicorn";

const baseConfig = () => {
	return {
		files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
		ignores: ["dist/**/*"],
		languageOptions: {
			ecmaVersion: "latest",
			globals: {
				...globals.es2025,
				...globals.node,
				...globals.browser,
			},
		},
		plugins: {
			"unused-imports": unusedImports,
		},
		rules: {
			...jsConfig.configs.recommended.rules,
			"no-unused-vars": [
				"error",
				{
					args: "after-used",
					argsIgnorePattern: "^_",
					vars: "all",
					varsIgnorePattern: "^_",
				},
			],
			"unused-imports/no-unused-imports": "error",
		},
		linterOptions: {
			noInlineConfig: true,
		},
	};
};

const typescriptConfig = () => {
	return [
		...tseslint.configs.recommended,
		{
			languageOptions: {
				parser: tseslint.parser,
			},
			plugins: {
				tseslint: tseslint.plugin,
			},

			files: ["**/*.{ts,tsx}"],
			rules: {
				"@typescript-eslint/array-type": ["error", { default: "array-simple" }],
			},
		},
	];
};

/** @type {import('eslint').Linter.Config[]} */
export default [
	baseConfig(),
	...typescriptConfig(),
	{
		...unicornConfig.configs["flat/all"],
		rules:{
			'unicorn/better-regex': 'error',
		}
	},
];
