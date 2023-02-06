import { notFoundError } from "@/errors";
import enrollmentRepository from "@/repositories/enrollment-repository";
import ticketRepository from "@/repositories/ticket-repository";
import hotelRepository from "@/repositories/hotels-repository";

async function getAllHotels(userId: number) {
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
  const allHotels = await hotelRepository.findAllHotels();
  const ticket = await ticketRepository.findTicketByEnrollmentId(enrollment.id);
  const tickedType = await ticketRepository.findTickeWithTypeById(ticket.id);
  if(!allHotels || !enrollment || !ticket) {
    throw notFoundError();
  }
  
  if(ticket.status !== "PAID" || tickedType.TicketType.isRemote || !tickedType.TicketType.includesHotel) {
    throw Error("payment required");
  }
  return allHotels;
}

async function getHotelbyId(userId: number, hotelId: number) {
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
  const ticket = await ticketRepository.findTicketByEnrollmentId(enrollment.id);
  const hotelWithRooms = await hotelRepository.findHotelWithRoomsById(hotelId);
  const tickedType = await ticketRepository.findTickeWithTypeById(ticket.id);
  if(!hotelWithRooms || !enrollment || !ticket) {
    throw notFoundError();
  }
  if(ticket.status !== "PAID" || tickedType.TicketType.isRemote || !tickedType.TicketType.includesHotel) {
    throw Error("payment required");
  }

  return hotelWithRooms;
}

const hotelService = {
  getAllHotels,
  getHotelbyId
};

export default hotelService;
