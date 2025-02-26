import { createTheme } from "@mui/material/styles";



const theme = createTheme({
  palette: {
    primary: {
      main: '#9D1D27',
      red:"#FF3B30",
      grey:"#383838"
    },
    secondary: {
      main: "#000000",
    },
    tertiary: {
      main: "#6A6464",
    },
    text: {
      primary: '#201f1e',
      secondary: "#6A6464",
    },
  },
  typography: {
    fontFamily: 'Red Hat Display',
    body1: {
      fontSize: '1rem',
    },
    body2: {
      fontSize: '1.25rem',
    },
  },
});


// const theme = createTheme({
//   palette: {
//     primary: {
//       main: "#9D1D27",
//     },
//     secondary: {
//       main: "#FBF9ED",
//     },
//     background: {
//       main: "#F9E6CE",
//       secondary: "#FFFBF6",
//     },
//     text: {
//       main: "#1A1A1A",
//       secondary: "#444444",
//       tertiary: "#6C6C6C",
//     },
//   },
//   typ: {
//     fontFamily: "LSC Solid, sans-serif",
//   },
//   h3: {
//     fontFamily: "OCR-A BT, sans-serif",
//   },

//   h1: {
//     fontFamily: "Orbitron",
//   },
//   // h2: {
//   //   fontFamily: "Orbitron",
//   // },
//   // h3: {
//   //   fontFamily: "Orbitron",
//   // },
//   // h4: {
//   //   fontFamily: "Orbitron",
//   // },
//   // h5: {
//   //   fontFamily: "Orbitron",
//   // },
//   // h6: {
//   //   fontFamily: "Orbitron",
//   // },

//   // body1: {
//   //   fontFamily: "DM Sans",
//   // },
//   // body2: {
//   //   fontFamily: "DM Sans",
//   // },
//   // body3: {
//   //   fontFamily: "LCD Solid",
//   // },

//   components: {
//     MuiTextField: {
//       styleOverrides: {
//         root: {
//           // Override for the root of the TextField to ensure text color is white
//           "& .MuiInputBase-input": {
//             color: "#FBF9ED", // Input text color
//             fontFamily: "LSC Solid",
//           },
//           "& .MuiInputLabel-root": {
//             color: "#FBF9ED", // Label text color
//             fontFamily: "LSC Solid",
//           },
//           "& .MuiInput-underline:focus": {
//             borderBottomColor: "#FBF9ED",
//           },
//           "& .MuiInput-underline:before": {
//             borderBottomColor: "#FBF9ED", // Inactive underline color
//           },
//           "& .MuiInput-underline::after": {
//             borderBottomColor: "#FBF9ED", // Active underline color
//           },
//           "& .MuiInputLabel-root": {
//             color: "#FBF9ED",
//             fontFamily: "LSC Solid",
//             // Change the label color globally
//           },
//         },
//       },
//     },
//   },
// });

export default theme;
