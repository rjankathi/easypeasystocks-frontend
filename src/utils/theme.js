// src/utils/theme.js
export const themeColors = {
  AAPL: "#1E90FF",
  BBAI: "#FF6600",
  CCCX: "#004AAD",
  POET: "#D42F2F",
  DEFAULT: "#6366f1"
};

export const getTheme = (ticker) => themeColors[ticker] || themeColors.DEFAULT;
