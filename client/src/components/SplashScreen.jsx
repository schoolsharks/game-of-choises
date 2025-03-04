import React, { useState, useEffect } from "react";
import { Box, Stack } from "@mui/material";
import loader from "../assets/GIFS/loader.gif";
import UpperTriangleBox from "./UpperTriangleBox";
import logos from "../assets/logos.webp";

const SplashScreen = ({ loading }) => {
  const [isPageLoaded, setIsPageLoaded] = useState(false);
  const [gifKey, setGifKey] = useState(Date.now()); // Change key to force reload

  useEffect(() => {
    const handleLoad = () => {
      setIsPageLoaded(true);
      setGifKey(Date.now()); // Update GIF key on full load
    };

    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);
    }

    return () => window.removeEventListener("load", handleLoad);
  }, []);

  return (
    <Stack
      minHeight={window.innerHeight}
      alignItems={"center"}
      justifyContent={"center"}
      position={"absolute"}
      zIndex={loading && isPageLoaded ? 100 : -1}
      bgcolor={"#9D1D27"}
      opacity={loading && isPageLoaded ? 1 : 0}
      width="100%"
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
      <UpperTriangleBox sx={{ flex: "1",marginTop:"15px", position: "relative",filter:"drop-shadow(0 0 15px #ffffffad)" }}>
        <Box
          maxHeight="240px"
          marginTop={"24px"}
          overflow={"hidden"}
          width={"100%"}
          position={"absolute"}
          sx={{top:"40%",left:"50%",transform:"translate(-50%,-50%)"}}
          height={window.innerHeight}
        >
          {isPageLoaded && (
            <img
              key={gifKey}
              src={`${loader}?t=${gifKey}`}
              alt="Loading..."
              style={{ transformOrigin: "center", transform: "scale(1.5)" }}
            />
          )}
        </Box>
      </UpperTriangleBox>
    </Stack>
  );
};

export default SplashScreen;
