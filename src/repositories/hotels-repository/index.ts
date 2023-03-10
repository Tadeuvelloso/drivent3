import { prisma } from "@/config";

async function findAllHotels() {
  return prisma.hotel.findMany();
}

async function findHotelWithRoomsById(hotelId: number) {
  return prisma.hotel.findFirst({
    where: {
      id: hotelId
    },
    include: {
      Rooms: true
    }
  });
}

const hotelRepository = {
  findAllHotels,
  findHotelWithRoomsById
};

export default hotelRepository;
