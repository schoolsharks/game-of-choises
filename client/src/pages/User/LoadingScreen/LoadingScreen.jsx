import { Stack, Typography } from "@mui/material";
import { useEffect } from "react";
import Typewriter from "typewriter-effect";
import handIcon from "../../../assets/handIcon.png";
import { useNavigate } from "react-router-dom";
import OptionA from "../Question/OptionA";
import OptionB from "../Question/OptionB";

const LoadingScreen = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/questions");
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Stack
      height={"100%"}
      sx={{
        minHeight: window.innerHeight + "px",
      }}
    >
      <Stack padding={"20px 40px"} marginTop={"48px"}>
        <Typography
          sx={{
            color: "#FFFFFF",
            position: "relative",
            display: "inline-block",
            fontSize: "30px",
            wordWrap: "break-word",
            "& .Typewriter": {
              "& *": {
                fontSize: "inherit",
                wordBreak: "break-word",
              },
            },
            "& .Typewriter__cursor": {
              fontSize: "50px",
              lineHeight: "40px",
              height: "38px",
              width: "22px",
              // marginLeft: "0",
            },
          }}
        >
          <span
            id="typewriter-text"
            style={{
              display: "inline-block",
              fontSize: "40px",
              width: "100%",
              whiteSpace: "pre-wrap", // Changed from pre to pre-wrap for wrapping
              lineHeight: "50px",
              textAlign: "left",
              position: "relative",
              // fontFamily: "LSC Solid",
              fontFamily: "Red Hat Display",
              fontWeight: "700",
              height:"100px"
            }}
          >
            <Typewriter
              options={{
                delay: 30,
                width: "100%",
                wrapperClassName: "typewriter-wrapper",
                strings: ["LET'S GET \nSTARTED"],
                autoStart: true,
                loop: false,
                cursorBlinking: true,
                deleteSpeed: Infinity,
              }}
            />
          </span>
        </Typography>
      </Stack>
      <Stack width={"100%"} marginTop={"42px"} gap={"30px"}>
        <OptionA text={"Swipe left for Option A"} />
        <OptionB text={"Swipe right for Option B"} />
      </Stack>

      <Stack marginTop={"auto"} direction={"column"} alignItems={"center"} marginBottom={"12px"}>
        <img src={handIcon} alt="hand Icon" width={"40px"} />
      </Stack>
    </Stack>
  );
};

export default LoadingScreen;
