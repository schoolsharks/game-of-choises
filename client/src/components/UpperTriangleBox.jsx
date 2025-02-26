import { Box, Stack } from "@mui/material";
import triangle from "../assets/triangle.png";

const UpperTriangleBox = ({ children, sx }) => {
  return (
    <Stack sx={{ ...sx, overflow: "hidden" }}>
      <Box sx={{ overflow: "hidden" }}>
        <Box
          component={"img"}
          src={triangle}
          alt=""
          // style={{ filter: "drop-shadow(0 0 15px #fff)" }}
        />
      </Box>
      <Stack sx={{ bgcolor: "#000000", marginTop: "-1px", flex: "1",zIndex:"1"}}>
        {children}
      </Stack>
    </Stack>
  );
};

export default UpperTriangleBox;
