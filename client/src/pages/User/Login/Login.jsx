import {
  Box,
  Button,
  Checkbox,
  IconButton,
  Stack,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { loginValidation } from "../../../utils/loginValidation";
import { useDispatch, useSelector } from "react-redux";
import { createUser } from "../../../app/userSlice";
import "../../../App.css";
import { ArrowBack, Close } from "@mui/icons-material";
import UpperTriangleBox from "../../../components/UpperTriangleBox";
import "./Login.css";
import { motion } from "framer-motion";
import logos from "../../../assets/logos.webp"

const Login = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    contact: "",
    companyName: "",
  });
  // const [email, setEmail] = useState("");
  // const [name, setName] = useState("");
  // const [phone, setPhone] = useState("");
  // const [companyName, setCompanyName] = useState("");
  const [error, setError] = useState("");
  const [tncModalOpen, setTncModalOpen] = useState(false);
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
    const response = loginValidation(formValues);
    if (!response.success) {
      setError(response.error);
    } else {
      if (!tncAccepted) {
        setError("Accept terms and conditions to continue");
      } else {
        dispatch(
          createUser({
            username: formValues.name,
            email: formValues.email,
            phone: formValues.contact,
            companyName: formValues,
          })
        );
      }
    }
  };
  const handleChange = (field) => (e) => {
    setFormValues((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
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
      minHeight={window.innerHeight}
      flex={"1"}
      bgcolor={theme.palette.primary.main}
      sx={{
        transform:"translateZ(0)",
        overflow:"visible"
      }}
    >
      <img
        src={logos}
        alt=""
        style={{
          position: "absolute",
          width: "130px",
          top: "12px",
          right: "12px",
          zIndex: "99",
          filter:"drop-shadow(0 0 3px #00000073)"
        }}
      />

      {/* {!tncModalOpen ? ( */}
      <UpperTriangleBox
        sx={{
          height: "100%",
          flex: !tncModalOpen ? "1" : "auto",
          borderRadius: !tncModalOpen ? "0" : "20px",
          margin: !tncModalOpen ? "0" : "36px 20px ",
          transition: "all 0.3s ease",
          marginTop:"10px",
          filter: "drop-shadow(0 0 15px #ffffffad)",
        }}
      >
        {!tncModalOpen ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
            style={{
              display: "flex",
              padding: "24px",
              flexDirection: "column",
              flex: "1",
              marginTop: "-36px",
            }}
          >
            <Typography  color="#fff" fontSize={"30px"} fontWeight={"700"}>
              LOGIN
            </Typography>
            <Stack spacing={3} marginTop={"32px"}>
              <TextField
                id="name"
                // label="Name"
                variant="standard"
                placeholder="Name*"
                value={formValues.name}
                onChange={handleChange("name")}
                
              />
              <TextField
                id="email"
                // label="Email"
                // className="not-mandate"
                variant="standard"
                placeholder="Email*"
                value={formValues.email}
                onChange={handleChange("email")}
                
              />
              <TextField
                id="contact"
                // label="Contact"
                variant="standard"
                // className="not-mandate"
                placeholder="Contact*"
                value={formValues.contact}
                onChange={handleChange("contact")}
                
              />
              <TextField
                id="companyName"
                // label="Company Name"
                variant="standard"
                // className="not-mandate"
                placeholder="Comapny Name*"
                value={formValues.companyName}
                onChange={handleChange("companyName")}
                
              />
              {error && (
                <Typography
                  fontSize={"12px"}
                  color="red"
                  bgcolor="white"
                  padding="0 10px"
                >
                  {error}
                </Typography>
              )}
              <Stack
                direction={"row"}
                alignItems={"center"}
                sx={{ transform: "translateX(-14px)" }}
              >
                <Checkbox
                  checked={tncAccepted}
                  onChange={() => setTncAccepted((prev) => !prev)}
                  sx={{
                    "&.MuiCheckbox-root": { color: "#ffffff" },
                  }}
                />
                <Typography
                  fontWeight={"500"}
                  color={"#ffffffad"}
                  fontSize={"14px"}
                >
                  I agree to the
                  <span
                    onClick={() => setTncModalOpen(true)}
                    style={{
                      cursor: "pointer",
                      marginLeft: "4px",
                      color: "#ffffff",
                    }}
                  >
                    Terms & conditions{" "}
                  </span>
                </Typography>
              </Stack>
            </Stack>
            <Stack
              direction={"row"}
              margin={"auto 0 16px"}
              padding="8px 0"
              alignItems={"center"}
              gap={"16px"}
            >
              <IconButton
                onClick={() => navigate("/onboarding/1")}
                sx={{ padding: "0" }}
              >
                <ArrowBack
                  sx={{
                    border: "2px solid white",
                    fontSize: "36px",
                    padding: "4px",
                    borderRadius: "50%",
                    color: "#ffffff",
                  }}
                />
              </IconButton>
              <Button
                variant="outlined"
                onClick={handleSubmit}
                sx={{
                  width: "max-content",
                  textTransform: "none",
                  borderRadius: "48px",
                  fontSize: "18px",
                  padding: "0 18px",
                  height: "36px",
                  border: "2px solid #fff",
                  color: "#fff",
                }}
              >
                Start
              </Button>
            </Stack>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            style={{
              color: "#fff",
              padding: "16px",
              marginBottom: "32px",
              marginTop: "-20px",
            }}
          >
            <Stack direction={"row-reverse"}>
              <IconButton onClick={() => setTncModalOpen(false)}>
                <Close sx={{ color: "#fff" }} />
              </IconButton>
            </Stack>
            <Typography
              fontSize={"25px"}
              fontWeight={"800"}
              textAlign={"center"}
              marginTop={"16px"}
            >
              TERMS & CONDITIONS
            </Typography>
            <Typography marginTop={"12px"}>
              This game is designed for fun and educational purposes only!{" "}
              <br />
              <br />
              No real data will be collected, stored, or shared during the game.{" "}
              <br />
              <br />
              All inputs will be erased after the game concludes unless you
              explicitly request to stay connected for follow-up discussions or
              insights. <br />
              <br />
              Enjoy the experience without any worries! <br />
              <br />
            </Typography>
          </motion.div>
        )}
      </UpperTriangleBox>
      {/* ) : ( */}
      {/* <UpperTriangleBox
          sx={{ height: "100%", margin: "72px 20px ", borderRadius: "20px" }}
        >
          <Stack color={"#fff"} padding={"16px"} marginBottom={"32px"} marginTop={"-20px"}>
            <Stack direction={"row-reverse"}>
              <IconButton onClick={() => setTncModalOpen(false)}>
                <Close sx={{ color: "#fff" }} />
              </IconButton>
            </Stack>
            <Typography
              fontSize={"24px"}
              fontWeight={"800"}
              textAlign={"center"}
              marginTop={"16px"}
            >
              TERMS & CONDITIONS
            </Typography>
            <Typography marginTop={"12px"}>
              This game is designed for fun and educational purposes only!{" "}
              <br />
              <br />
              No real data will be collected, stored, or shared during the game.{" "}
              <br />
              <br />
              All inputs will be erased after the game concludes unless you
              explicitly request to stay connected for follow-up discussions or
              insights. <br />
              <br />
              Enjoy the experience without any worries! <br />
              <br />
            </Typography>
          </Stack>
        </UpperTriangleBox>
      )} */}
    </Stack>
  );
};

export default Login;

const TermsAndConditionsContent = () => {
  return (
    <Box>
      <Typography
        fontSize={"1.5rem"}
        textAlign={"center"}
        fontFamily={"OCR-A BT"}
      >
        TERMS & CONDITIONS
      </Typography>
      <Typography marginTop={"8px"} fontFamily={"OCR-A BT"}>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolores
        corporis, aperiam blanditiis obcaecati suscipit dolorem perspiciatis
        nisi consectetur, officiis vero iusto aliquam? Alias tempora odit rat
      </Typography>
      <Typography marginTop={"8px"} fontFamily={"OCR-A BT"}>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolores
        corporis, aperiam blanditiis obcaecati suscipit dolorem perspiciatis
        nisi consectetur, officiis vero iusto aliquam? Alias tempora odit rat
      </Typography>
      <Typography marginTop={"8px"} fontFamily={"OCR-A BT"}>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolores
        corporis, aperiam blanditiis obcaecati suscipit dolorem perspiciatis
        nisi consectetur, officiis vero iusto aliquam? Alias tempora odit rat
      </Typography>
      <Typography marginTop={"8px"} fontFamily={"OCR-A BT"}>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolores
        corporis, aperiam blanditiis obcaecati suscipit dolorem perspiciatis
        nisi consectetur, officiis vero iusto aliquam? Alias tempora odit rat
      </Typography>
      <Typography marginTop={"8px"} fontFamily={"OCR-A BT"}>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolores
        corporis, aperiam blanditiis obcaecati suscipit dolorem perspiciatis
        nisi consectetur, officiis vero iusto aliquam? Alias tempora odit rat
      </Typography>
      <Typography marginTop={"8px"} fontFamily={"OCR-A BT"}>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolores
        corporis, aperiam blanditiis obcaecati suscipit dolorem perspiciatis
        nisi consectetur, officiis vero iusto aliquam? Alias tempora odit rat
      </Typography>
      <Typography marginTop={"8px"} fontFamily={"OCR-A BT"}>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolores
        corporis, aperiam blanditiis obcaecati suscipit dolorem perspiciatis
        nisi consectetur, officiis vero iusto aliquam? Alias tempora odit rat
      </Typography>
    </Box>
  );
};
