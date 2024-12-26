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
      color={theme.palette.primary.main}
    >
      <Stack
        alignItems="center"
        justifyContent="center"
        marginTop="25px"
        textAlign={"center"}
        fontFamily={"Orbitron"}
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
          color={theme.palette.primary.main}
          margin={"50px auto 22px"}
        >
          THE GAME OF CHOCIES
        </Typography>
      </Stack>

      <Stack
        width={"80%"}
        gap="1rem"
        sx={{ maxWidth: "27rem" }}
        marginTop={"1rem"}
        backgroundColor={"#000000B2"}
        color={theme.palette.primary.main}
        padding={"1px 2.3rem"}
      >
        <Stack
          width={"85%"}
          gap="0.5rem"
          sx={{ maxWidth: "433px" }}
          marginTop={"1rem"}
          color={theme.palette.primary.main}
        >
          <Typography
            variant="body3"
            fontWeight={"700"}
            fontSize="2rem"
            // marginTop={"40px"}
            color={theme.palette.primary.main}
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
            // color="white"
            placeholder="eg. Vanessa Jenson"
            value={name}
            onChange={(e) => {
              setError("");
              setName(e.target.value);
            }}
            sx={{
              "& .MuiInputLabel-root": {
                color: "white", // Label color
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: "white", // Label color when focused
              },
              "& .MuiOutlinedInput-root": {
                color: "white", // Input text color
              },
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "white", // Border color
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "white", // Border color on hover
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "white", // Border color when focused
              },
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
            sx={{
              "& .MuiInputLabel-root": {
                color: "white", // Label color
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: "white", // Label color when focused
              },
              "& .MuiOutlinedInput-root": {
                color: "white", // Input text color
              },
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "white", // Border color
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "white", // Border color on hover
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "white", // Border color when focused
              },
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
            // sx={{
            //   "& .MuiInputLabel-root": { color: "white" }, // Label color
            //   "& .MuiInput-underline:before": { borderBottomColor: "white" },
            //   "& .MuiInput-underline:hover:before": {
            //     borderBottomColor: "white",
            //   },
            //   "& .MuiInput-underline:after": { borderBottomColor: "white" },
            // }}
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
            color={theme.palette.primary.main}
          >
            Invite friends
          </Typography>
          <SendIcon
            sx={{ color: "white", transform: "rotate(300deg)" }}
            size={20}
          />
        </Stack>

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

      {/* </div> */}
    </Stack>
  );
};

export default Login;
