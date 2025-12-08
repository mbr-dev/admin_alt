/** @type {import("tailwindcss").Config} */
module.exports = {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
    extend: {
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          1: "hsl(var(--chart-1))",
          2: "hsl(var(--chart-2))",
          3: "hsl(var(--chart-3))",
          4: "hsl(var(--chart-4))",
          5: "hsl(var(--chart-5))",
        },
        mbr: {
          "gray-10": "#F0F0F0",
          "gray-20": "#d1d5db",
          "gray-30": "#5C5C5C",
          "gray-40": "#E0E0E0",
          "gray-50": "#929292",

          "blue-10": "#0065A4",
          "blue-20": "#207FE6",
          "blue-30": "#0288D1",
          "blue-40": "#0DB9DC",
          "blue-50": "#1F0041",
          "blue-60": "#60F1FC",
          "blue-70": "#480ABD",
          "blue-80": "#2F9FE9",
          "blue-90": "#EFF6FF",
          "blue-100": "#304FB6",

          "red-10": "#EC5691",
          "red-20": "#EC0F68",
          "red-30": "#E10B90",
          "red-40": "#e495b5",
          "red-50": "#F3367E",
          "red-60": "#F981B1",

          "orange-10": "#FFA100",
          "orange-20": "#FFB200",
          "orange-30": "#E35B00",
          "orange-40": "#E9A410",

          "yellow-10": "#FFD64F",
          "yellow-20": "#F5BB00",
          "yellow-30": "#FFEE00",
          "yellow-40": "#E39F00",
          "yellow-50": "#FFF1A5",

          "green-10": "#0DA645",
          "green-20": "#01D34E",
          "green-30": "#0CA644",
          "green-40": "#00D54F",
          "green-50": "#9DC61A",
          "green-60": "#d1ff9d",
          "green-70": "#F0FDF4",
          "green-80": "#1C6939",
        }
      },
      boxShadow: {
        "shadow-box": "3px 3px 10px 0px #00000026",
      },
      keyframes: {
        "slidein-50dvw-0dvw": {
          "0%": { transform: "translateX(-50dvw)" },
          "100%": { transform: "translateX(0)" },
        },
        "slideout-50dvw-0dvw": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50dvw)" },
        },
        shake: {
  				"0%": {
  					transform: "rotate(0deg) translate(var(--tw-translate-x), var(--tw-translate-y)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))"
  				},
  				"25%": {
  					transform: "rotate(10deg) translate(var(--tw-translate-x), var(--tw-translate-y)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))"
  				},
  				"50%": {
  					transform: "rotate(-10deg) translate(var(--tw-translate-x), var(--tw-translate-y)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))"
  				},
  				"100%": {
  					transform: "rotate(0) translate(var(--tw-translate-x), var(--tw-translate-y)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))"
  				}
  			},
        popUp: {
          "0%": { transform: "scale(0)" },
          "100%": { transform: "scale(1)" },
        },
        popUpStrong: {
          "0%": { transform: "scale(2)", easing: "ease-out" },
          "30%": { transform: "scale(1.3)", easing: "ease-in" },
          "50%": { transform: "scale(1.7)", easing: "ease-out" },
          "70%": { transform: "scale(1.2)", easing: "ease-in" },
          "100%": { transform: "scale(1)", easing: "ease-out" },
        },
        scaleInOut: {
          "0%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.1)" },
          "100%": { transform: "scale(1)" },
        },
        bounce2: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(10px)" },
        },
        bounce3: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(6px)" },
        },
        bolha: {
          "0%, 100%": { transform: "translateY(0) scale(1)" },
          "50%": { transform: "translateY(14px) scale(1.3)" },
        },
        nuvem1: {
          "0%": { transform: "translatex(0)" },
          "100%": { transform: "translateX(100vw)" },
        },
        nuvem2: {
          "100%": { transform: "translateX(100vw)" },
          "0%": { transform: "translateX(0)" },
        },
        nuvem3: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(100vw)" },
        },
        spin: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        "opacity-0-100": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
      animation: {
        "slidein-50dvw-0dvw": "slidein-50dvw-0dvw 0.5s ease-out forwards",
        "slideout-50dvw-0dvw": "slideout-50dvw-0dvw 0.5s ease-out forwards",
        popUp: "popUp 0.5s ease-out forwards",
        popUpStrong: "popUpStrong 0.5s ease-out forwards",
        scalePulse: "scaleInOut 2s ease-in-out",
        bounce: "bounce 2s ease-in-out infinite",
        bounce2: "bounce2 4s ease-in-out infinite",
        bounce3: "bounce3 5s ease-in-out infinite",
        shake: "shake 0.5s ease-out forwards",
        nuvem1: "nuvem1 20s linear infinite",
        nuvem2: "nuvem2 25s linear infinite",
        nuvem3: "nuvem3 30s linear infinite",
        bolha1: "bolha 4s ease-in-out infinite",
        bolha2: "bolha 6s ease-in-out infinite",
        bolha3: "bolha 8s ease-in-out infinite",
        "opacity-0-100": "opacity-0-100 0.5s ease-out forwards",
        spin: "spin 3s linear infinite",
      },
      screens: {
        xs: "480px",
        sm: "640px",
        md: "768px",
        md2: "900px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
        "3xl": "1600px",
        "4xl": "1920px",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
