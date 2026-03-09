import type { Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";
import forms from "@tailwindcss/forms";
import tailwindcssAnimate from "tailwindcss-animate";

const config: Config = {
	// Using "class" strategy ensures dark mode is never active
	// unless you explicitly add class="dark" to the html tag.
	darkMode: ["class", "class"],
	content: [
		"./app/**/*.{js,ts,jsx,tsx}",
		"./pages/**/*.{js,ts,jsx,tsx}",
		"./components/**/*.{js,ts,jsx,tsx}",
		"./src/**/*.{js,ts,jsx,tsx}",
		"./node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
		"./node_modules/vaul/dist/*.js",
	],
	theme: {
		container: {
			center: true,
			padding: "2rem",
			screens: {
				xxs: "375px",
				xs: "475px",
				sm: "640px",
				md: "768px",
				lg: "992px",
				xl: "1280px",
				"2xl": "1400px",
				xxl: "1500px",
				xxxl: "1850px",
			},
		},
		extend: {
			colors: {
				blue: {
					50: "#CCD0EF",
					100: "#B0BAEB",
					200: "#9BA0E5",
					300: "#889AE2",
					400: "#4C5BB7",
					500: "#2C38B2",
					600: "#1E288E",
					700: "#17217A",
					800: "#121A5B",
					900: "#0C103E",
					DEFAULT: "#2C38B2",
				},
				darkBlue: {
					100: "#CCCEEF",
					200: "#B0B4E0",
					300: "#8B8FDB",
					400: "#204B9B",
					500: "#1C3C7D",
					600: "#152D5E",
					700: "#183874",
					800: "#132D5E",
					900: "#0C1C3E",
					950: "#0C1630",
					DEFAULT: "#204B9B",
				},
				yellow: {
					100: "#FAF2DC",
					200: "#F7E9C2",
					300: "#F1DB94",
					400: "#DDA71A",
					500: "#C79612",
					600: "#A8810B",
					700: "#A67D14",
					800: "#806316",
					900: "#6B520A",
					950: "#4F3B06",
					DEFAULT: "#DDA71A",
				},
				black: {
					100: "#E9E9E9",
					200: "#DCDCDC",
					300: "#BCBCBC",
					400: "#262626",
					500: "#222222",
					600: "#1E1E1E",
					700: "#1C1C1C",
					800: "#171717",
					900: "#111111",
					950: "#0D0D0D",
					DEFAULT: "#262626",
				},
				gray: {
					50: "#f8fafc",
					100: "#f1f5f9",
					200: "#e2e8f0",
					300: "#cbd5e1",
					400: "#94a3b8",
					500: "#64748b",
					600: "#475569",
					700: "#334155",
					800: "#1e293b",
					900: "#0f172a",
					950: "#020617",
					DEFAULT: "#e2e8f0",
				},
				background: "hsl(var(--background))",
				foreground: "hsl(var(--foreground))",
				primary: {
					DEFAULT: "hsl(var(--primary))",
					foreground: "hsl(var(--primary-foreground))",
				},
				secondary: {
					DEFAULT: "hsl(var(--secondary))",
					foreground: "hsl(var(--secondary-foreground))",
				},
				accent: {
					DEFAULT: "hsl(var(--accent))",
					foreground: "hsl(var(--accent-foreground))",
				},
				destructive: {
					DEFAULT: "hsl(var(--destructive))",
					foreground: "hsl(var(--destructive-foreground))",
				},
				muted: {
					DEFAULT: "hsl(var(--muted))",
					foreground: "hsl(var(--muted-foreground))",
				},
				popover: {
					DEFAULT: "hsl(var(--popover))",
					foreground: "hsl(var(--popover-foreground))",
				},
				card: {
					DEFAULT: "hsl(var(--card))",
					foreground: "hsl(var(--card-foreground))",
				},
				border: "hsl(var(--border))",
				input: "hsl(var(--input))",
				ring: "hsl(var(--ring))",
			},
			borderColor: {
				border: "hsl(var(--border))",
			},
			fontFamily: {
				sans: ["var(--font-sans)", ...fontFamily.sans],
			},
			fontSize: {
				xxxs: "0.4rem",
				xxs: "0.6rem",
				xs: "0.8rem",
			},
			keyframes: {
				"accordion-up": {
					from: {
						height: "var(--radix-accordion-content-height)",
					},
					to: {
						height: "0",
					},
				},
			},
			animation: {
				"accordion-down": "accordion-down 0.2s ease-out",
				"accordion-up": "accordion-up 0.2s ease-out",
			},
			backgroundImage: {
				"gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
				"gradient-conic":
					"conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
			},
			borderRadius: {
				lg: "var(--radius)",
				md: "calc(var(--radius) - 2px)",
				sm: "calc(var(--radius) - 4px)",
			},
		},
	},
	plugins: [forms, tailwindcssAnimate],
};

export default config;
