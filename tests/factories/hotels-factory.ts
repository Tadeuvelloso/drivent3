import faker from "@faker-js/faker";
import { prisma } from "@/config";

export function createHotel() {
  return prisma.hotel.create({
    data: {
      name: faker.name.findName(),
      image: faker.image.imageUrl(),
      createdAt: new Date("2023-02-06T00:00:00.000Z").toISOString(),
      updatedAt: new Date("2023-03-06T00:00:00.000Z").toISOString(),
    },
  });
}
