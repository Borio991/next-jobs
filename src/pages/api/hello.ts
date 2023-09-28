// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { authOptions } from "@/server/auth-lib/authOptions";
import { verifyJwt } from "@/server/auth-lib/createJWT";
import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { getToken } from "next-auth/jwt";

type Data = {
  name: string | undefined;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const session = await getServerSession(req, res, authOptions);

  // console.log("session from api:", session);
  // const accessToken = req.headers.authorization?.split(" ")[1];
  // if (!accessToken) {
  //   return res.status(401).json({ name: "Unauthorized" });
  // }
  // if (!verifyJwt(accessToken)) {
  //   return res.status(401).json({ name: "Unauthorized" });
  // }
  // const payload = verifyJwt(accessToken);
  if (session?.user.role !== "admin") {
    return res.status(403).json({ name: "only admin can acces this" });
  }
  return res.status(200).json({ name: "Hello admin" });
}
