import { Button, Stack, Typography, useTheme } from "@mui/material";
import UpperTriangleBox from "../../../components/UpperTriangleBox";
import { Check } from "@mui/icons-material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { handleFeedback } from "../../../app/questionSlice";
import { useSelector } from "react-redux";

const Feedback = () => {
  const theme = useTheme();
  const [selectedOption, setSelectedOption] = useState(null);
  const options = ["Option 1", "Option 2", "Option 3"];
  const navigate = useNavigate();
  const {user}=useSelector((state)=>state.user)

  const handleSubmit = () => {
    handleFeedback({choice:selectedOption,userId:user})
    navigate("/completed");
  };

  return (
    <Stack bgcolor={theme.palette.primary.main} minHeight={window.innerHeight}>
      <UpperTriangleBox sx={{ margin: "27px",borderRadius:"20px",filter:"drop-shadow(0 0 15px #ffffffad)", }}>
        <Stack color="#fff" bgcolor={"#000000"} padding={"0 44px"}>
          <Typography fontSize={"20px"} fontWeight={"700"}>
            What will it take you to switch to IDFC FIRST Bank?
          </Typography>
          <Stack gap="12px" marginTop={"40px"}>
            {options.map((item, index) => (
              <Stack
                direction={"row"}
                key={index}
                border={"1px solid #54545680"}
                padding={"8px"}
                height={"90px"}
                alignItems={"center"}
                gap={"10px"}
                onClick={() => setSelectedOption(item)}
              >
                <Stack
                  alignItems={"center"}
                  justifyContent={"center"}
                  width={"28px"}
                  height="28px"
                  border={"1px solid #fff"}
                >
                  {item === selectedOption ? <Check /> : null}
                </Stack>
                <Typography>{item}</Typography>
              </Stack>
            ))}
          </Stack>
          <Button
            variant="outlined"
            disabled={!selectedOption}
            onClick={handleSubmit}
            sx={{
              width: "max-content",
              textTransform: "none",
              borderRadius: "48px",
              fontSize: "18px",
              padding: "0 18px",
              height: "40px",
              border: "2px solid #fff",
              color: "#fff",
              margin:"20px 0",
              "&.Mui-disabled": {
                color: "#333738",
                border: "2px solid #333738",
              },
            }}
          >
            Results
          </Button>
        </Stack>
      </UpperTriangleBox>
    </Stack>
  );
};

export default Feedback;
