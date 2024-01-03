import express from "express";
import HttpClient from "../utils/api";
import { LightUrl } from "../constans/BaseUrl";
import { Request, Response } from "express";

const httpClient = new HttpClient(LightUrl);

const router = express.Router();

router.get<{}, any>("/", async (req, res) => {
  try {
    const responseData = await httpClient.get<{ data: string }>("/lights", {
      rejectUnauthorized: false,
    });
    res.status(200).json(responseData);
  } catch (error) {
    res.status(500).json(error);
    console.error("Error:", error);
  }
});

router.get<{}, any>("/:light/status", async (req: Request, res: Response) => {
  try {
    let lightStateNumber: string = req.params.light;
    const responseData = await httpClient.get<{ data: string }>(
      `/lights/${lightStateNumber}/state`,
      {
        rejectUnauthorized: false,
      }
    );
    res.status(200).json(responseData);
  } catch (error) {
    res.status(500).json(error);
    console.error("Error:", error);
  }
});

router.put<{}, any>(
  "/:light/status/:status",
  async (req: Request, res: Response) => {
    try {
      let lightStateNumber: string = req.params.light;
      let state: string = req.params.status;
      let lightOn: boolean = false;
      let saturation: string = req.body.sat;
      let brightness: string = req.body.brightness;
      let hue: string = req.body.hue;

      if (state == "on") {
        lightOn = true;
      }

      const responseData = await httpClient.put<{ data: string }>(
        `/lights/${lightStateNumber}/state`,
        { on: lightOn, sat: saturation, bri: brightness, hue: hue },
        {
          rejectUnauthorized: false,
        }
      );
      res.status(200).json(responseData);
    } catch (error) {
      res.status(500).json(error);
      console.error("Error:", error);
    }
  }
);

export default router;
