// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { verifyJwt } from "@/server/auth-lib/createJWT";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  name: string | undefined;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  // const session = await getServerAuthSession({ req, res });
  const accessToken = req.headers.authorization?.split(" ")[1];
  if (!accessToken || !verifyJwt(accessToken)) {
    return res.status(401).json({ name: "Unauthorized" });
  }
  const payload = verifyJwt(accessToken);
  if (payload?.role !== "admin") {
    return res.status(403).json({ name: "only admin can acces this" });
  }
  return res.status(200).json({ name: "Hello admin" });
}
