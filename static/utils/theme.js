// src/utils/theme.js
export const themeColors = {
  AAPL: "#1E90FF",   // Apple-blue accent
  BBAI: "#FF6600",   // BigBear.ai orange
  CCCX: "#004AAD",   // Custom blue
  POET: "#D42F2F",   // Red tone
  DEFAULT: "#6366f1" // Indigo fallback
};

export const getTheme = (ticker) => themeColors[ticker] || themeColors.DEFAULT;
