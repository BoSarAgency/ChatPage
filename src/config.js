export const chatConfig = {
  initialMessage: "Hello! How can I help you today?",
  color: "#10a37f", // ChatGPT green
  apiURL:
    "https://e32c6941-f279-4527-90a1-c441352baff5-00-3saz0r6vecady.janeway.replit.dev//messages",
  theme: "dark", // Changed to dark theme
};

// Theme configurations
export const themes = {
  light: {
    // Main backgrounds
    primaryBg: "#ffffff",
    secondaryBg: "#f7f7f8",
    tertiaryBg: "#ffffff",

    // Text colors
    primaryText: "#374151",
    secondaryText: "#8e8ea0",

    // Message colors
    userMessageBg: "#2f2f2f",
    userMessageText: "#ffffff",
    assistantMessageBg: "#f7f7f8",
    assistantMessageText: "#374151",

    // Border colors
    borderColor: "#e5e5e5",
    focusBorderColor: "#10a37f",

    // Input colors
    inputBg: "#f7f7f8",
    inputBorder: "#e5e5e5",
    placeholderText: "#8e8ea0",

    // Scrollbar
    scrollbarThumb: "rgba(0, 0, 0, 0.2)",
    scrollbarThumbHover: "rgba(0, 0, 0, 0.3)",

    // Code blocks
    codeBg: "#f6f8fa",
    codeText: "#24292e",

    // Loading dots
    loadingDots: "#999",
  },
  dark: {
    // Main backgrounds - ChatGPT dark theme colors
    primaryBg: "#212121", // Main background
    secondaryBg: "#2f2f2f", // Input areas, assistant messages
    tertiaryBg: "#1a1a1a", // Darker areas

    // Text colors
    primaryText: "#ececec", // Main text color
    secondaryText: "#b4b4b4", // Secondary text, placeholders

    // Message colors
    userMessageBg: "#2f2f2f", // User message background
    userMessageText: "#ececec", // User message text
    assistantMessageBg: "#444654", // Assistant message background (ChatGPT style)
    assistantMessageText: "#ececec", // Assistant message text

    // Border colors
    borderColor: "#4d4d4f", // Subtle borders
    focusBorderColor: "#10a37f", // Keep the green focus color

    // Input colors
    inputBg: "#40414f", // Input background (ChatGPT style)
    inputBorder: "#4d4d4f", // Input border
    placeholderText: "#8e8ea0", // Placeholder text

    // Scrollbar
    scrollbarThumb: "rgba(255, 255, 255, 0.2)",
    scrollbarThumbHover: "rgba(255, 255, 255, 0.3)",

    // Code blocks
    codeBg: "#2d2d2d",
    codeText: "#f8f8f2",

    // Loading dots
    loadingDots: "#b4b4b4",
  },
};

// Utility function to apply theme
export const applyTheme = (themeName) => {
  const theme = themes[themeName] || themes.light;
  const root = document.documentElement;

  // Set theme attribute for CSS
  root.setAttribute("data-theme", themeName);

  // Set CSS custom properties
  Object.entries(theme).forEach(([key, value]) => {
    const cssVar = `--${key.replace(/([A-Z])/g, "-$1").toLowerCase()}`;
    root.style.setProperty(cssVar, value);
  });
};
