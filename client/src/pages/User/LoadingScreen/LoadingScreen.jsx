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
    <Stack>
      <Stack
        height="80vh"
        margin={"auto"}
        justifyContent="center"
        padding={"16px"}
      >
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
          }}
        >
          <span
            id="typewriter-text"
            style={{
              display: "inline-block",
              fontSize: "50px",
              width: "100%",
              whiteSpace: "pre-wrap", // Changed from pre to pre-wrap for wrapping
              textIndent: "-30px",
              lineHeight: "52px",
              textAlign: "center",
              position: "relative",
              fontFamily: "LSC Solid",
            }}
          >
            <Typewriter
              options={{
                delay: 30,
                cursor: "|",
                width: "100%",
                wrapperClassName: "typewriter-wrapper",
                strings: ["Let's get started"],
                autoStart: true,
                loop: false,
                cursorBlinking: true,
                deleteSpeed:Infinity
              }}
            />
          </span>
        </Typography>
      </Stack>

      <Stack direction={"column"} alignItems={"center"}>
        <Typography
          variant={"caption"}
          fontSize={"10px"}
          fontWeight="100"
          textAlign={"center"}
          zIndex={1}
          color={"#FBF9ED"}
          sx={{
            fontFamily: "OCR-A BT",
            fontSize: "1.0rem",
          }}
        >
          Swipe left for option A
        </Typography>
        <Typography
          variant={"caption"}
          fontSize={"10px"}
          fontWeight="100"
          textAlign={"center"}
          zIndex={1}
          color={"#FBF9ED"}
          sx={{
            fontFamily: "OCR-A BT",
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
