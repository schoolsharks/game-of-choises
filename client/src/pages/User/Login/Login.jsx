import {
  Box,
  Button,
  Checkbox,
  Dialog,
  IconButton,
  Stack,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
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
import sendIcon from "../../../assets/send.png";
import { Close } from "@mui/icons-material";

const Login = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [error, setError] = useState("");
  const [tncModal, setTncModal] = useState(false);
  const [tncAccepted, setTncAccepted] = useState(false);
  const { user, error: userError, status } = useSelector((state) => state.user);

  useEffect(() => {
    if (status === "succeeded") {
      navigate("/info");
    } else if (status === "failed") {
      setError(userError);
    }
  }, [status, userError, navigate]);

  const handleSubmit = () => {
    setError("");
    const response = loginValidation(email, name, phone, companyName);
    if (!response.success) {
      setError(response.error);
    } else {
      if (!tncAccepted) {
        setError("Accept terms and conditions to continue");
      } else {
        dispatch(createUser({ username: name, email, phone, companyName }));
      }
    }
  };

  if (user) {
    return <Navigate to="/info" />;
  }

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({
        url: location.href,
      });
    } else {
      navigator.clipboard.writeText(location.href);
      alert("Website URL copied to clipboard");
    }
  };
  return (
    <Stack
      width="100%"
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        gap: "20px",
      }}
    >
      <Typography
        fontSize="40PX"
        fontWeight="400"
        zIndex={1}
        marginTop={"80px"}
        color={theme.palette.primary.main}
        className="lcd-font"
        sx={{
          fontFamily: "LSC Solid",
          lineHeight: "52.8px",
          letterSpacing: "5%",
          margin: "120px 16px 0",
        }}
      >
        LOGIN
      </Typography>

      <Stack
        width={"100%"}
        maxWidth="433px"
        color={theme.palette.primary.main}
        display={"flex"}
        marginBottom={"40px"}
        // gap={""}
        justifyContent={"space-between"}
        alignContent={"center"}
        alignItems={"center"}
        flex={1}
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
              fontFamily: "OCR-A BT",
              lineHeight: "52.8px",
              letterSpacing: "5%",
              "&.MuiInputBase-input, .MuiInputLabel-root": {
                fontFamily: "OCR-A BT",
              },
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
              label="Email *"
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
              label="Phone Number *"
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
              label="Company Name *"
              variant="standard"
              placeholder="e.g School Shark"
              value={companyName}
              onChange={(e) => {
                setError("");
                setCompanyName(e.target.value);
              }}
            />

            <Stack direction={"row"} alignItems={"center"}>
              <Checkbox
                checked={tncAccepted}
                onChange={() => setTncAccepted((prev) => !prev)}
                sx={{
                  "&.MuiCheckbox-root": { color: "#ffffff" },
                }}
              />
              <Typography
                fontFamily={"OCR-A BT"}
                fontWeight={"500"}
                color={"#ffffffad"}
              >
                I agree to the
                <span
                  onClick={() => setTncModal(true)}
                  style={{
                    textDecoration: "underline",
                    cursor: "pointer",
                    marginLeft: "4px",
                    fontFamily: "Roboto",
                    color: "#ffffff",
                  }}
                >
                  Terms & conditions{" "}
                </span>
                of IDFC
              </Typography>
            </Stack>
            {error && (
              <Typography
                color="#ff0000"
                sx={{
                  minHeight: "1rem",
                  bgcolor: "#fff",
                  borderRadius: "2px",
                  padding: "0 8px",
                }}
              >
                {error}!
              </Typography>
            )}
          </Stack>
        </Stack>
        <Stack
          position={"relative"}
          maxHeight={"88px"}
          maxWidth={"370px"}
          height={"12%"}
          width={"80%"}
          marginBottom="12px"
          alignContent={"center"}
          alignSelf={"center"}
        >
          <SwipeBar onSwipe={handleSubmit} text={"Get Started"} />
          <Stack
            alignContent={"center"}
            justifyContent={"end"}
            flexDirection={"row"}
            marginTop={"8px"}
          >
            <Button onClick={handleShare}>
              <Typography
                variant={"button"}
                fontSize="20px"
                fontWeight="400"
                textAlign={"center"}
                zIndex={1}
                // width={"80%"}
                // maxWidth={"280px"}
                color={"#FBF9ED"}
                className="lcd-font"
                sx={{
                  fontFamily: "LSC Solid",
                  letterSpacing: "5%",
                }}
              >
                Share
              </Typography>
              <Box>
                <img src={sendIcon} alt="send icon" />
              </Box>
            </Button>
          </Stack>
        </Stack>
      </Stack>

      {/* </div> */}

      <Dialog
        open={tncModal}
        onClose={() => {
          setTncModal(false);
        }}
        PaperProps={{
          sx: {
            bgcolor: "#00000024",
            backdropFilter: "blur(4px)",
            borderRadius: "12px",
            border: "2px solid #fff",
            overflowY: "scroll",
            "&::-webkit-scrollbar": {
              display: "none",
            },
            scrollbarWidth: "none",
          },
        }}
      >
        <Stack padding={"12px"} color={"#fff"}>
          <Stack alignItems={"flex-end"}>
            <IconButton onClick={() => setTncModal(false)}>
              <Close sx={{ color: "#fff" }} />
            </IconButton>
          </Stack>
          <TermsAndConditionsContent />
        </Stack>
      </Dialog>
    </Stack>
  );
};

export default Login;

const TermsAndConditionsContent = () => {
  return (
    <>
      <Typography fontSize={"1.5rem"} textAlign={"center"}>
        TERMS & CONDITIONS
      </Typography>
      <Typography marginTop={"8px"}>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolores
        corporis, aperiam blanditiis obcaecati suscipit dolorem perspiciatis
        nisi consectetur, officiis vero iusto aliquam? Alias tempora odit rat
      </Typography>
      <Typography marginTop={"8px"}>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolores
        corporis, aperiam blanditiis obcaecati suscipit dolorem perspiciatis
        nisi consectetur, officiis vero iusto aliquam? Alias tempora odit rat
      </Typography>
      <Typography marginTop={"8px"}>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolores
        corporis, aperiam blanditiis obcaecati suscipit dolorem perspiciatis
        nisi consectetur, officiis vero iusto aliquam? Alias tempora odit rat
      </Typography>
      <Typography marginTop={"8px"}>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolores
        corporis, aperiam blanditiis obcaecati suscipit dolorem perspiciatis
        nisi consectetur, officiis vero iusto aliquam? Alias tempora odit rat
      </Typography>
      <Typography marginTop={"8px"}>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolores
        corporis, aperiam blanditiis obcaecati suscipit dolorem perspiciatis
        nisi consectetur, officiis vero iusto aliquam? Alias tempora odit rat
      </Typography>
      <Typography marginTop={"8px"}>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolores
        corporis, aperiam blanditiis obcaecati suscipit dolorem perspiciatis
        nisi consectetur, officiis vero iusto aliquam? Alias tempora odit rat
      </Typography>
      <Typography marginTop={"8px"}>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolores
        corporis, aperiam blanditiis obcaecati suscipit dolorem perspiciatis
        nisi consectetur, officiis vero iusto aliquam? Alias tempora odit rat
      </Typography>
    </>
  );
};
