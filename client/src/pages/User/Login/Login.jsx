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
    return <Navigate to="/info" />;
  }

  return (
    <Stack
      width="100%"
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "start",
        alignItems: "center",
        height: "100vh",
        gap: "30px",
      }}
    >
      <Stack fontFamily={"Orbitron"} maxWidth={"390px"}>
        <Typography
          variant={"h3"}
          fontSize="35px"
          fontWeight="700"
          zIndex={1}
          marginTop={"50px"}
          color={theme.palette.primary.main}
        >
          Login
        </Typography>
      </Stack>

      <Stack
        width={"100%"}
        maxWidth="433px"
        height={"100%"}
        backgroundColor={"#000000B2"}
        color={theme.palette.primary.main}
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"start"}
        // gap={""}
        alignContent={"center"}
        alignItems={"center"}
        paddingTop={"10px"}
      >
        <Stack
          sx={{
            width: "90%",
            maxWidth: "433px",
            gap: "1rem",
          }}
        >
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
                color: "#FBF9ED",
              },
              "& .MuiInput-underline:before": {
                borderBottomColor: "#FBF9ED",
              },
              "& .MuiInput-underline:hover:before": {
                borderBottomColor: "#FBF9ED",
              },
              "& .MuiInputLabel-root": {
                color: "#FBF9ED",
              },
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
          />

          <Typography color="#d61a1a" sx={{ minHeight: "1rem" }}>
            {error}
          </Typography>
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
            paddingRight: "30px",
            paddingY: "10px",
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
            size={15}
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
