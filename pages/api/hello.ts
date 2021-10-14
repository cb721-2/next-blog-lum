import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let randomElement = Math.floor(Math.random() * 8) + 1;
  if (randomElement === 7) {
    randomElement = 1;
  }
  const data = await (
    await fetch(
      `https://avatar-api-cb.herokuapp.com/api/characters/all?element=${randomElement}`
    )
  ).json();

  res.status(200).json({ data });
}
