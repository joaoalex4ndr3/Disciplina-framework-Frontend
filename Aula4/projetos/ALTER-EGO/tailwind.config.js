/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "var(--bg)",
        bg2: "var(--bg2)",
        bg3: "var(--bg3)",
        surface: "var(--surface)",
        surface2: "var(--surface2)",
        border: "var(--border)",
        border2: "var(--border2)",
        text: "var(--text)",
        text2: "var(--text2)",
        text3: "var(--text3)",
        accent: "var(--accent)",
        accent2: "var(--accent2)",
        accent3: "var(--accent3)",
        cyan: "var(--cyan)",
        pink: "var(--pink)",
        green: "var(--green)",
        amber: "var(--amber)",
        red: "var(--red)",
      },
      fontFamily: {
        head: "var(--font-head)",
        body: "var(--font-body)",
      },
      spacing: {
        r: "var(--r)",
        r2: "var(--r2)",
        r3: "var(--r3)",
      },
      borderRadius: {
        r: "var(--r)",
        r2: "var(--r2)",
        r3: "var(--r3)",
      },
    },
  },
  plugins: [],
};
