import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const randomElement = Math.floor(Math.random() * 8) + 1;
  
  const data = await (await fetch(`https://avatar-api-cb.herokuapp.com/api/characters/all?element=${randomElement}`)).json()

  res.status(200).json({ data });
}
