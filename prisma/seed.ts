import { PrismaClient } from "@prisma/client";
import { hashSync } from "bcryptjs";
import faker from "faker";

const prisma = new PrismaClient();

async function main() {
  console.log(faker.image.imageUrl());
  for (let i = 0; i < 1000; i++) {
    await prisma.user.create({
      data: {
        email: faker.internet.email(),
        password: hashSync("test1234", 10),
        name: faker.name.findName(),
        posts: {
          create: [
            {
              date: faker.date.past(),
              title: faker.lorem.words(),
              content: faker.lorem.paragraph(),
            },
            {
              date: faker.date.past(),
              title: faker.lorem.word(),
              content: faker.lorem.paragraph(),
            },
            {
              date: faker.date.recent(),
              title: faker.lorem.sentence(),
              content: faker.lorem.paragraph(),
            },
          ],
        },
        profile: {
          create: {
            bio: faker.lorem.paragraph(),
          },
        },
      },
    });
  }
}

main()
  .catch((err) => {
    console.log("seed error: ", err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
