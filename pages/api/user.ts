import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { compareSync } from "bcryptjs";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const prisma = new PrismaClient();
    const { body } = req;

    if (!body?.email || !body?.password) {
      return res.status(400).json({ error: "Invalid request" });
    }

    const data = await prisma.user.findUnique({
      where: {
        email: body.email,
      },
      include: {
        posts: true,
        profile: true,
      },
    });

    if (data?.password && compareSync(body.password, data.password)) {
      delete data.password;
      return res.status(200).json({ data });
    } else {
      return res.status(404).json({ error: "User not found" });
    }
  }
}
