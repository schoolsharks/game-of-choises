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
          sx={{width:"100%"}}

        />
      </Box>
      <Stack sx={{ bgcolor: "#000000", marginTop: "-4px", flex: "1",zIndex:"1"}}>
        {children}
      </Stack>
    </Stack>
  );
};

export default UpperTriangleBox;
