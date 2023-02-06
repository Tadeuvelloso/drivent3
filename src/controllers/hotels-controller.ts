import { Response } from "express";
import httpStatus from "http-status";
import hotelService from "@/services/hotels-service";
import { AuthenticatedRequest } from "@/middlewares";

export async function getAllHotels(req: AuthenticatedRequest, res: Response) {
  const { userId } = req; 
  try {
    const allHotels = await hotelService.getAllHotels(userId);
    return res.status(httpStatus.OK).send(allHotels);
  } catch (error) {
    return res.sendStatus(httpStatus.NO_CONTENT);
  }
}

export async function getHotel(req: AuthenticatedRequest, res: Response) {
  const { hotelId } = res.locals.hotelId;
  const { userId } = req; 
  try {
    const hotelWithRooms = await hotelService.getHotelbyId(userId, hotelId);
    return res.status(httpStatus.OK).send(hotelWithRooms);
  } catch (error) {
    return res.sendStatus(httpStatus.NO_CONTENT);
  }
}
