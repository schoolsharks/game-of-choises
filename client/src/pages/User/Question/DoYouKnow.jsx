import { Button, Stack, Typography } from "@mui/material";
import doYouKnow1 from "../../../assets/DoYouKnow/do-you-know-1.png";
import doYouKnow2 from "../../../assets/DoYouKnow/do-you-know-2.png";
import doYouKnow3 from "../../../assets/DoYouKnow/do-you-know-3.png";

const Content1 = () => {
  return (
    <Stack>
      <Typography fontWeight={"600"} marginTop={"44px"}>
        If your monthly expense is ₹40,000 today, how much it will be after 25
        years?
      </Typography>
      <img
        src={doYouKnow1}
        alt="Do You Know"
        style={{ width: "277px", margin: "48px 0 20px" }}
      />
      <Typography fontWeight="600">
        INFLATION Reduces Purchasing Power
      </Typography>
    </Stack>
  );
};
const Content2 = () => {
  return (
    <Stack>
      <Typography fontWeight={"600"} marginTop={"44px"}>
      If you have ₹ 1 and it doubles daily for a month, how much will you receive at the end of the month (31 days)?
      </Typography>
      <img
        src={doYouKnow2}
        alt="Do You Know"
        style={{ width: "277px", margin: "48px 0 20px" }}
      />
      <Typography fontWeight="600">
      That’s the POWER OF COMPOUNDING
      </Typography>
    </Stack>
  );
};
const Content3 = () => {
  return (
    <Stack>
      <Typography fontWeight={"600"} marginTop={"44px"}>
      If A started investing ₹ 5,000 a month at age 25 and B started investing ₹ 15,000 a month at age 45, what will be the difference in their investment value at age 55?
      </Typography>
      <img
        src={doYouKnow3}
        alt="Do You Know"
        style={{ width: "277px", margin: "48px 0 20px" }}
      />
      <Typography fontWeight="400" fontSize={"12px"}>
      *Rate of return of 12% is used for illustrative purpose only, names are fictitious
      </Typography>
      <Typography fontWeight="600" textAlign={"center"} marginTop={"20px"}>
      That’s the COST OF DELAY
      </Typography>
    </Stack>
  );
};

const DoYouKnow = ({ id ,handleClose}) => {
  const handleNext = () => {
    handleClose();
  };
  return (
    <Stack
      position={"fixed"}
      top={0}
      left={0}
      right={0}
      bottom={0}
      alignItems={"center"}
      bgcolor={"#000000"}
      color={"#ffffff"}
      zIndex={100}
      padding={"35px"}
    >
      <Typography fontSize={"24px"} fontWeight={"700"} marginTop={"10px"}>
        Do You Know?
      </Typography>
      {id === 1 && <Content1 />}
      {id === 2 && <Content2 />}
      {id === 3 && <Content3 />}
      <Stack direction={"row"} margin={"auto 0 40px"} width={"100%"}>
        <Button
          variant="outlined"
          onClick={handleNext}
          sx={{
            width: "max-content",
            textTransform: "none",
            borderRadius: "48px",
            fontSize: "18px",
            padding: "0 18px",
            height: "40px",
            border: "2px solid #fff",
            color: "#fff",
          }}
        >
          Continue
        </Button>
      </Stack>
    </Stack>
  );
};

export default DoYouKnow;
