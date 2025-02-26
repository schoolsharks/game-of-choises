import React from "react";
import loader from "../assets/GIFS/loader.gif";
import { Box, Stack, Typography } from "@mui/material";

const SplashScreen = ({loading}) => {
  return (
    <Stack
      minHeight={window.innerHeight}
      alignItems={"center"}
      justifyContent={"center"}
      position={"fixed"}
      top={0}
      left={0}
      zIndex={loading?100:-1}
      bgcolor={"#000"}
      opacity={loading ? 1 : 0}
      sx={{transition:"all 0.3s ease"}}
    >
      <Box maxHeight="240px" overflow={"hidden"} marginTop={"-100px"}>
        <img src={loader} alt="" />
      </Box>
    </Stack>
  );
};

export default SplashScreen;
