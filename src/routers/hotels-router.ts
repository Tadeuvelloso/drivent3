import { authenticateToken } from "@/middlewares";
import { getAllHotels, getHotel } from "@/controllers";
import { Router } from "express";

const hotelsRouter = Router();

hotelsRouter.all("/*", authenticateToken);
hotelsRouter.get("", getAllHotels);
hotelsRouter.get("/:id", getHotel);

export { hotelsRouter };
