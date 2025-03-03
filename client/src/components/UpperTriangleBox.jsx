import { Box, Stack } from "@mui/material";
import triangleBlack from "../assets/triangle-black.png";
import triangleRed from "../assets/triangle-red.png";

const UpperTriangleBox = ({ children, sx,variant="black" }) => {
  return (
    <Stack sx={{ ...sx, overflow: "hidden" }}>
      <Box sx={{ overflow: "hidden" }}>
        <Box
          component={"img"}
          src={variant==="black"?triangleBlack:triangleRed}
          alt=""
          sx={{width:"100%",height:"100%",objectFit:"fill",aspectRatio:"1/0.30"}}

        />
      </Box>
      <Stack sx={{ bgcolor: "#000000", marginTop: "-10px", flex: "1",zIndex:"1"}}>
        {children}
      </Stack>
    </Stack>
  );
};

export default UpperTriangleBox;
