import express from "express";
import {
  handleAnalysis,
  // handleConnectRequest,
  handleCreateUser,
  handleStorage,
  handleGetUser,
} from "../../controllers/user.controller.js";
import { handleGetQuestion } from "../../controllers/questions.controller.js";

const router = express.Router();

router.post("/create", handleCreateUser);
router.get("/getUser", handleGetUser);
router.post("/ques", handleGetQuestion);
router.get("/analysis", handleAnalysis);
router.post("/storedata", handleStorage);
// router.post("/connectionRequest",handleConnectRequest)

export default router;
