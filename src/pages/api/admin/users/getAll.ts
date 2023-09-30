// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { checkAdminApi } from "@/server/auth-lib/checkAdmin";
import { db } from "@/server/db";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  checkAdminApi({ req, res });
  try {
    const users = await db.user.findMany({
      select: {
        id: true,
        email: true,
        role: true,
      },
    });
    return res.status(200).json({ users });
  } catch (error) {
    console.log("error fetching users from database", error);
    return res
      .status(500)
      .json({ message: "server error : error fetching users from database" });
  }
}
