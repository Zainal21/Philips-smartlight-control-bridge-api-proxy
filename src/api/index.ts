import express from "express";

import MessageResponse from "../interfaces/MessageResponse";
import lights from "./lights";

const router = express.Router();

router.get<{}, MessageResponse>("/", (req, res) => {
  res.json({
    message: "API - 👋🌎🌍🌏",
  });
});

router.use("/lights", lights);

export default router;
