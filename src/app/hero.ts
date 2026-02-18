import { heroui } from "@heroui/react";

export default heroui({
    prefix: "heroui",
    defaultTheme: "dark",
    themes: {
      dark: {
        colors: {
          default: {
  '50': '#ede6f2',
  '100': '#ccb9dc',
  '200': '#ab8cc5',
  '300': '#8b60ae',
  '400': '#6a3398',
  '500': '#490681',
  '600': '#390566',
  '700': '#2a034a',
  '800': '#1a022f',
  '900': '#0b0113',
          foreground: "#000",
          DEFAULT: "#490681"
        },
        primary: {
  '50': '#ede6f2',
  '100': '#ccb9dc',
  '200': '#ab8cc5',
  '300': '#8b60ae',
  '400': '#6a3398',
  '500': '#490681',
  '600': '#390566',
  '700': '#2a034a',
  '800': '#1a022f',
  '900': '#0b0113',
          foreground: "#fff",
          DEFAULT: "#490681"
        },
        secondary: {
  '50': '#f6e6f1',
  '100': '#e6b8d8',
  '200': '#d68ac0',
  '300': '#c65ca7',
  '400': '#b62e8e',
  '500': '#a60075',
  '600': '#83005c',
  '700': '#5f0043',
  '800': '#3c002a',
  '900': '#190012',
            foreground: "#fff",
            DEFAULT: "#a60075"
        },
        success: {
          50: "#e3f8ef",
          100: "#bbedd8",
          200: "#93e3c1",
          300: "#6bd9ab",
          400: "#43ce94",
          500: "#1bc47d",
          600: "#16a267",
          700: "#127f51",
          800: "#0d5d3b",
          900: "#083b26",
          foreground: "#000",
          DEFAULT: "#1bc47d"
        },
        warning: {
          50: "#fff5df",
          100: "#ffe8b3",
          200: "#ffda86",
          300: "#ffcc59",
          400: "#ffbf2d",
          500: "#ffb100",
          600: "#d29200",
          700: "#a67300",
          800: "#795400",
          900: "#4d3500",
          foreground: "#fff",
          DEFAULT: "#ffb100"
        },
        danger: {
          50: "#ffe9e9",
          100: "#ffcaca",
          200: "#ffabab",
          300: "#ff8d8d",
          400: "#ff6e6e",
          500: "#ff4f4f",
          600: "#d24141",
          700: "#a63333",
          800: "#792626",
          900: "#4d1818",
          foreground: "#000",
          DEFAULT: "#ff4f4f"
        },
        background: "#f9f7fd",
        foreground: "#4a3d77",
        content1: {
          DEFAULT: "#f2e8ff",
          foreground: "#000"
        },
        content2: {
          DEFAULT: "#e8daff",
          foreground: "#000"
        },
        content3: {
          DEFAULT: "#dccbff",
          foreground: "#000"
        },
        content4: {
          DEFAULT: "#cfbcff",
          foreground: "#000"
        },
        focus: "#7828c8",
        overlay: "#000000"
      }
    },
    light: {
      colors: {
        default: {
          50: "#08070b",
          100: "#100d15",
          200: "#181420",
          300: "#201a2a",
          400: "#282135",
          500: "#534d5d",
          600: "#7e7a86",
          700: "#a9a6ae",
          800: "#d4d3d7",
          900: "#ffffff",
          foreground: "#fff",
          DEFAULT: "#a60075"
        },
        primary: {
          50: "#2c193f",
          100: "#462764",
          200: "#603689",
          300: "#7944ae",
          400: "#9353d3",
          500: "#a671db",
          600: "#b98fe2",
          700: "#ccadea",
          800: "#dfcbf2",
          900: "#f2eafa",
          foreground: "#fff",
          DEFAULT: "#9353d3"
        },
        secondary: {
          50: "#1e254d",
          100: "#2f3a79",
          200: "#404fa6",
          300: "#5265d2",
          400: "#637aff",
          500: "#7e91ff",
          600: "#9aa9ff",
          700: "#b5c0ff",
          800: "#d0d7ff",
          900: "#eceeff",
          foreground: "#fff",
          DEFAULT: "#a60075"
        },
        success: {
          50: "#0b412a",
          100: "#116743",
          200: "#fff",
          300: "#1db374",
          400: "#23d98d",
          500: "#4ae0a1",
          600: "#70e6b5",
          700: "#97edc9",
          800: "#bdf4dd",
          900: "#e4faf1",
          foreground: "#000",
          DEFAULT: "#23d98d"
        },
        warning: {
          50: "#4d3d11",
          100: "#79601c",
          200: "#a68326",
          300: "#d2a730",
          400: "#ffca3a",
          500: "#ffd35c",
          600: "#ffdd7f",
          700: "#ffe6a1",
          800: "#ffefc4",
          900: "#fff8e6",
          foreground: "#000",
          DEFAULT: "#ffca3a"
        },
        danger: {
          50: "#4d2020",
          100: "#793333",
          200: "#a64646",
          300: "#d25858",
          400: "#ff6b6b",
          500: "#ff8585",
          600: "#ff9f9f",
          700: "#ffb9b9",
          800: "#ffd3d3",
          900: "#ffeded",
          foreground: "#000",
          DEFAULT: "#ff6b6b"
        },
        background: "#1b1526",
        foreground: "#d0aaff",
        content1: {
          DEFAULT: "#392a4a",
          foreground: "#fff"
        },
        content2: {
          DEFAULT: "#4c3560",
          foreground: "#fff"
        },
        content3: {
          DEFAULT: "#5e4180",
          foreground: "#fff"
        },
        content4: {
          DEFAULT: "#704ea0",
          foreground: "#fff"
        },
        focus: "#9353d3",
        overlay: "#ffff"
      }
    }
  },
  layout: {
    disabledOpacity: "0.5"
  }
    });
