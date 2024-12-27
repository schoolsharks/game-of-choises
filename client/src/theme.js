import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#FBF9ED",
    },
    secondary: {
      main: "#FBF9ED",
    },
    background: {
      main: "#F9E6CE",
      secondary: "#FFFBF6",
    },
    text: {
      main: "#1A1A1A",
      secondary: "#444444",
      tertiary: "#6C6C6C",
    },
  },
  typography: {
    fontFamily: "Orbitron",
    h1: {
      fontFamily: "Orbitron",
    },
    h2: {
      fontFamily: "Orbitron",
    },
    h3: {
      fontFamily: "Orbitron",
    },
    h4: {
      fontFamily: "Orbitron",
    },
    h5: {
      fontFamily: "Orbitron",
    },
    h6: {
      fontFamily: "Orbitron",
    },

    body1: {
      fontFamily: "DM Sans",
    },
    body2: {
      fontFamily: "DM Sans",
    },
    body3: {
      fontFamily: "Oxanium",
    },
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          // Override for the root of the TextField to ensure text color is white
          "& .MuiInputBase-input": {
            color: "#FBF9ED", // Input text color
          },
          "& .MuiInputLabel-root": {
            color: "#FBF9ED", // Label text color
          },
          "& .MuiInput-underline:focus": {
            borderBottomColor: "#FBF9ED",
          },
          "& .MuiInput-underline:before": {
            borderBottomColor: "#FBF9ED", // Inactive underline color
          },
          "& .MuiInput-underline::after": {
            borderBottomColor: "#FBF9ED", // Active underline color
          },
          "& .MuiInputLabel-root": {
            color: "#FBF9ED", // Change the label color globally
          },
        },
      },
    },
  },
});

export default theme;
