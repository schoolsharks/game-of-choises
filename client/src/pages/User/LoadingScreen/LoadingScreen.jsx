import { Stack, Typography } from "@mui/material";
import { useEffect } from "react";
import Typewriter from "typewriter-effect";
import handIcon from "../../../assets/handIcon.png";
import { useNavigate } from "react-router-dom";

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
      <Stack margin={"auto 50px"} padding={"20px"}>
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
              fontSize: "42px",
              width: "100%",
              whiteSpace: "pre-wrap", // Changed from pre to pre-wrap for wrapping
              lineHeight: "52px",
              textAlign: "left",
              position: "relative",
              // fontFamily: "LSC Solid",
              fontFamily:"Red Hat Display",
              fontWeight:"700"
            }}
          >
            <Typewriter
              options={{
                delay: 30,
                cursor: "|",
                width: "100%",
                wrapperClassName: "typewriter-wrapper",
                strings: ["Let's get \nstarted"],
                autoStart: true,
                loop: false,
                cursorBlinking: true,
                deleteSpeed: Infinity,
              }}
            />
          </span>
        </Typography>
      </Stack>

      <Stack direction={"column"} alignItems={"center"} marginBottom={"12px"}>
        <Typography
          variant={"caption"}
          fontSize={"10px"}
          fontWeight="500"
          textAlign={"center"}
          zIndex={1}
          color={"#FBF9ED"}
          sx={{
            fontSize: "1.0rem",
          }}
        >
          Swipe left for option A
        </Typography>
        <Typography
          variant={"caption"}
          fontSize={"10px"}
          fontWeight="500"
          textAlign={"center"}
          zIndex={1}
          color={"#FBF9ED"}
          sx={{
            fontSize: "1.0rem",
            marginBottom: "4px",
          }}
        >
          Swipe right for option B
        </Typography>

        <img src={handIcon} alt="hand Icon" width={"40px"} />
      </Stack>
    </Stack>
  );
};

export default LoadingScreen;
