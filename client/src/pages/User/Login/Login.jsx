import { Box, Stack, TextField, Typography, useTheme } from "@mui/material";
import React, { useState, useEffect } from "react";
import Logo from "../../../assets/SchoolSharks-logo.webp";
import SwipeBar from "../../../components/SwipeBar";
import { Navigate, useNavigate } from "react-router-dom";
import { loginValidation } from "../../../utils/loginValidation";
import { useDispatch, useSelector } from "react-redux";
import { createUser } from "../../../app/userSlice";
import "../../../App.css";

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
    return <Navigate to="/questions" />;
  }

  return (
    <Stack
      className="user-login"
      width="100%"
      height={`${window.innerHeight < 616 ? 616 : window.innerHeight}px`}
      position="relative"
      alignItems={"center"}

    >
      <Stack
        alignItems="center"
        justifyContent="center"   // Ensures vertical centering
        marginTop="25px"
        textAlign={"center"}
        fontFamily="Orbitron"
      >
        <Typography
          fontSize="2.75rem"
          fontWeight={"600"}
          lineHeight={"52.8px"}
          fontFamily="Orbitron"
          sx={{ textTransform: "uppercase" }}
          color="#FBF9ED">
          The Game <br></br>of Choices
        </Typography>
        <Box
          width="120px"
          height="auto"
          sx={{
            aspectRatio: "116/45",
            background: `url(${Logo})`,
            backgroundSize: "cover",
            opacity: "0.2",
          }}
        ></Box>
      </Stack>
      <Stack>
        {/* <Typography
          variant="h5"
          fontWeight={"700"}
          fontSize="2rem"
          fontFamily={"Oxanium"}
          marginTop={"40px"}
          textAlign={"left"}
          color={"#FFFFFF"}
        >
          Login
        </Typography> */}
      </Stack>
      {/* <Stack
        width={"80%"}
        gap="1rem"
        sx={{
          maxWidth: "430px",
          backgroundcolor: "rgba(0, 0, 0, 0.5)"
        }}
        marginTop={"1rem"}
        color={"#FFFFFF"}
      >

        <Typography
          variant="h5"
          fontWeight={"700"}
          fontSize="2rem"
          fontFamily={"Oxanium"}
          marginTop={"40px"}
          textAlign={"left"}
          color={"#FFFFFF"}
        >
          Login
        </Typography>

        <TextField
          label="Name *"
          variant="standard"
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

        <Stack
          position={"fixed"}
          bottom={"1.5rem"}
          width={"100%"}
          maxWidth={"900px"}
          alignItems={"center"}
        >
          <SwipeBar onSwipe={handleSubmit} />
        </Stack>

      </Stack> */}

      <Stack
        width={"80%"}
        gap="1rem"
        sx={{
          maxWidth: "430px",
          backgroundColor: "#000000C7",
          position: "relative", // Ensure positioning for inner elements (especially swipe bar)
          paddingBottom: "4rem", // Adding space for swipe bar
        }}
        marginTop={"1rem"}
        color={"#FFFFFF"}
      >
        <Typography
          variant="h5"
          fontWeight={"700"}
          fontSize="2rem"
          fontFamily={"Oxanium"}
          marginTop={"40px"}
          textAlign={"left"}
          color={"#FFFFFF"}
        >
          Login
        </Typography>

        <TextField
          label="Name *"
          variant="standard"
          placeholder="eg. Vanessa Jenson"
          value={name}
          onChange={(e) => {
            setError("");
            setName(e.target.value);
          }}
          // sx={{ backgroundColor: "transparent", color: "white" }} 
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
          sx={{ backgroundColor: "transparent", color: "white" }} // Transparent background for input fields
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
          sx={{ backgroundColor: "transparent", color: "white" }} 
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
          sx={{ backgroundColor: "transparent", color: "white" }} 
        />

        <Typography color="#d61a1a" sx={{ minHeight: "1rem" }}>
          {error}
        </Typography>

        {/* <Stack
          position={"fixed"}
          bottom={"1.5rem"} 
          width={"100%"}
          maxWidth={"900px"}
          alignItems={"center"} 
          justifyContent={"center"} 
          sx={{
            left: 0,
            right: 0,
            display: "flex",
            justifyContent: "center", 
            alignItems: "center",
          }}
        >
          <SwipeBar onSwipe={handleSubmit} />
        </Stack> */}

        <Stack
          // position={"fixed"}
          bottom={"60px"}
          maxHeight={"88px"}
          maxWidth={"900px"}
          marginBottom={"100px"}
        >
          <SwipeBar onSwipe={handleSubmit} />
        </Stack>

      </Stack>



    </Stack>
  );
};

export default Login;
