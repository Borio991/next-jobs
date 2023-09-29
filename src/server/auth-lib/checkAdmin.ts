import type { NextApiRequest, NextApiResponse } from "next";
import { Payload, verifyJwt } from "./createJWT";

interface Params {
  req: NextApiRequest;
  res: NextApiResponse;
}

export function checkAdminApi({ req, res }: Params) {
  const accessToken = req.headers.authorization?.split(" ")[1];
  if (!accessToken) {
    return res.status(401).json({ name: "Unauthorized" });
  }
  if (!verifyJwt(accessToken)) {
    return res.status(401).json({ name: "Unauthorized cant veryfy token" });
  }
  const payload = verifyJwt(accessToken);
  if (payload?.role !== "admin") {
    return res
      .status(403)
      .json({ name: `only admin can acces this - role ${payload?.role}` });
  }
}
