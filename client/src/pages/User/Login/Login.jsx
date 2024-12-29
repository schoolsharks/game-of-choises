import { Box, Stack, TextField, Typography, useTheme } from "@mui/material";
import React, { useState, useEffect } from "react";
import Logo from "../../../assets/SchoolSharks-logo.webp";
import SwipeBar from "../../../components/SwipeBar";
import { Navigate, useNavigate } from "react-router-dom";
import { loginValidation } from "../../../utils/loginValidation";
import { useDispatch, useSelector } from "react-redux";
import { createUser } from "../../../app/userSlice";
import "../../../App.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import SendIcon from "@mui/icons-material/Send";

const Login = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [error, setError] = useState("");
  const { user, error: userError, status } = useSelector((state) => state.user);

  useEffect(() => {
    if (status === "succeeded") {
      navigate("/questions");
    } else if (status === "failed") {
      setError(userError);
    }
  }, [status, userError, navigate]);

  const handleSubmit = () => {
    setError("");
    const response = loginValidation(email, name);
    if (!response.success) {
      setError(response.error);
    } else {
      dispatch(createUser({ username: name, email, phoneNumber, companyName }));
    }
  };

  if (user) {
    return <Navigate to="/questions" />;
  }

  const newtheme = createTheme({
    components: {
      MuiTextField: {
        styleOverrides: {
          root: {
            "& .MuiInputLabel-root": { color: "white" },
            "& .MuiInputLabel-root.Mui-focused": { color: "white" },
            "& .MuiInput-underline:before": { borderBottomColor: "white" }, // Unfocused underline
            "& .MuiInput-underline:hover:before": {
              borderBottomColor: "white",
            }, // Hover underline
            "& .MuiInput-underline:after": { borderBottomColor: "white" }, // Focused underline
          },
        },
      },
    },
  });
  return (
    <Stack
      className="user-login"
      width="100%"
      height={`${window.innerHeight < 616 ? 616 : window.innerHeight}px`}
      position="relative"
      alignItems={"center"}
      color={"#FBF9ED"}
    >
      <Stack
        alignItems="center"
        justifyContent="center"
        marginTop="25px"
        textAlign={"center"}
        fontFamily="Orbitron"
      >
        <Typography
          variant={"h3"}
          fontSize="2.3rem"
          fontWeight="600"
          textAlign={"center"}
          zIndex={1}
          maxWidth={"18rem"}
          top={"6rem"}
          maxHeight={"117px"}
          color={"#FBF9ED"}
          margin={"50px auto 22px"}
        >
          THE GAME OF CHOCIES
        </Typography>
      </Stack>

      <Stack
        width={"100%"}
        gap="1rem"
        sx={{ maxWidth: "27rem" }}
        marginTop={"1rem"}
        marginX={"auto"}
        backgroundColor={"#000000B2"}
        color={"#FBF9ED"}
        padding={"1px 2.3rem"}
      >
        <Stack
          width={"85%"}
          gap="0.5rem"
          sx={{ maxWidth: "600px" }}
          marginTop={"1rem"}
          color={"#FBF9ED"}
        >
          <Typography
            variant="body3"
            fontWeight={"700"}
            fontSize="2rem"
            // marginTop={"40px"}
            color={"#FBF9ED"}
          >
            Login
          </Typography>
        </Stack>
        <Stack
          sx={{
            width: "100%",
            gap: "1rem",
          }}
        >
          {/* <ThemeProvider theme={newtheme}> */}
          <TextField
            label="Name *"
            variant="standard"
            color="#ffffff"
            placeholder="eg. Vanessa Jenson"
            value={name}
            onChange={(e) => {
              setError("");
              setName(e.target.value);
            }}
            sx={{
              input: {
                color: '#FBF9ED', 
              },
              '& .MuiInput-underline:before': {
                borderBottomColor: '#FBF9ED', 
              },
              '& .MuiInput-underline:hover:before': {
                borderBottomColor: '#FBF9ED', 
              },
              '& .MuiInputLabel-root': {
                color: '#FBF9ED',
              }
            }}
          />

          <TextField
            label="Email"
            type="email"
            variant="standard"
            color="#ffffff"
            placeholder="eg. xoxo@gmail.com"
            value={email}
            onChange={(e) => {
              setError("");
              setEmail(e.target.value);
            }}
            sx={{
              input: {
                color: '#FBF9ED', 
              },
              '& .MuiInput-underline:before': {
                borderBottomColor: '#FBF9ED', 
              },
              '& .MuiInput-underline:hover:before': {
                borderBottomColor: '#FBF9ED', 
              },
              '& .MuiInputLabel-root': {
                color: '#FBF9ED',
              }
            }}
          />
          <TextField
            label="Phone Number"
            variant="standard"
            type="number"
            color="#ffffff"
            placeholder="eg. xxxxxxxxxx"
            value={phoneNumber}
            onChange={(e) => {
              setError("");
              setPhoneNumber(e.target.value);
            }}
            sx={{
              input: {
                color: '#FBF9ED', 
              },
              '& .MuiInput-underline:before': {
                borderBottomColor: '#FBF9ED', 
              },
              '& .MuiInput-underline:hover:before': {
                borderBottomColor: '#FBF9ED', 
              },
              '& .MuiInputLabel-root': {
                color: '#FBF9ED',
              }
            }}
          />
          <TextField
            label="Company Name"
            variant="standard"
            color="#ffffff"
            placeholder="e.g School Shark"
            value={companyName}
            onChange={(e) => {
              setError("");
              setCompanyName(e.target.value);
            }}
            sx={{
              input: {
                color: '#FBF9ED', 
              },
              '& .MuiInput-underline:before': {
                borderBottomColor: '#FBF9ED', 
              },
              '& .MuiInput-underline:hover:before': {
                borderBottomColor: '#FBF9ED', 
              },
              '& .MuiInputLabel-root': {
                color: '#FBF9ED',
              }
            }}
          />

          <Typography color="#d61a1a" sx={{ minHeight: "1rem" }}>
            {error}
          </Typography>
          {/* </ThemeProvider> */}
        </Stack>
        <Stack
          sx={{
            gap: "10px",
            display: "flex",
            flexDirection: "row",
            alignContent: "center",
            justifyContent: "end",
            width: "100%",
            cursor: "pointer",
          }}
        >
          <Typography
            variant={"body3"}
            fontSize="1.4rem"
            fontWeight="400"
            textAlign={"end"}
            zIndex={1}
            color={"#FBF9ED"}
          >
            Invite friends
          </Typography>
          <SendIcon
            sx={{ color: "white", transform: "rotate(300deg)" }}
            size={20}
          />
        </Stack>

        <Stack
          position={"fixed"}
          bottom={"8%"}
          maxHeight={"88px"}
          maxWidth={"361px"}
          height={"15%"}
          width={"80%"}
          alignContent={"center"}
          alignSelf={"center"}
        >
          <SwipeBar onSwipe={handleSubmit} text={"Get Started"} />
        </Stack> 
      </Stack>

      {/* </div> */}
    </Stack>
  );
};

export default Login;