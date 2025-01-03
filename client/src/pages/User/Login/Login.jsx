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
import send from "../../../assets/send.png";

const Login = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
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
      dispatch(createUser({ username: name, email, phone, companyName }));
    }
  };

  if (user) {
    return <Navigate to="/info" />;
  }

  const handleInviteClick = () => {
    const websiteURL = window.location.origin;
    navigator.clipboard
      .writeText(websiteURL)
      .then(() => {
        alert("Website URL copied to clipboard: " + websiteURL);
      })
      .catch((err) => {
        console.error("Failed to copy URL: ", err);
      });
  };
  return (
    <Stack
      width="100%"
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        height: "100vh",
        gap: "20px",
      }}
    >
      <Stack fontFamily={"Orbitron"} maxWidth={"390px"}>
        <Typography
          variant={"h3"}
          fontSize="35px"
          fontWeight="400"
          zIndex={1}
          marginTop={"80px"}
          color={theme.palette.primary.main}
          className="lcd-font"
          sx={{
            fontFamily: "LSC Solid",
            lineHeight: "52.8px",
            letterSpacing: "5%",
          }}
        >
          LOGIN
        </Typography>
      </Stack>

      <Stack
        width={"100%"}
        maxWidth="433px"
        height={"100%"}
        color={theme.palette.primary.main}
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"space-between"}
        marginBottom={"40px"}
        // gap={""}
        alignContent={"center"}
        alignItems={"center"}
        paddingTop={"10px"}
      >
        <Stack
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"start"}
          paddingBottom={"20px"}
          height={"75%"}
          width={"100%"}
          gap={"10px"}
          alignContent={"center"}
          alignItems={"center"}
          paddingTop={"10px"}
        >
          <Stack
            sx={{
              width: "90%",
              maxWidth: "433px",
              gap: "25px",
              // height: "40%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              fontFamily: "LSC Solid",
              lineHeight: "52.8px",
              letterSpacing: "5%",
            }}
          >
            <TextField
              label="Name *"
              variant="standard"
              // color="white"
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
              placeholder="eg. xxxxxxxxxx"
              value={phone}
              onChange={(e) => {
                setError("");
                setPhone(e.target.value);
              }}
            />
            <TextField
              label="Company Name"
              variant="standard"
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
              alignItems: "center",
              width: "100%",
              // height: "40%",
              marginTop: "30px",
              maxHeight: "300px",
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
              color={theme.palette.primary.main}
              onClick={handleInviteClick}
            >
              Invite friends
            </Typography>
            <Box
              component="img"
              src={send}
              alt="send"
              loading="lazy"
              sx={{
                width: "24px",
                height: "24px",

                objectFit: "center",
              }}
              alignContent={"center"}
            />
          </Stack>
        </Stack>

        <Stack
          position={"relative"}
          marginBottom={"10px"}
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
