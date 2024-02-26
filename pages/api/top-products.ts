import { getTopProducts } from "@/services/spot-prices";
import { NextApiRequest, NextApiResponse } from "next";

async function getHandler(req: NextApiRequest, res: NextApiResponse) {
  const data = await getTopProducts(
    req.query.getBy as any,
    req.query.search as string
  );
  return res.send(data);
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case "GET":
      return getHandler(req, res);
    default:
      return res.status(405).send({ message: "method not allowed" });
  }
}
