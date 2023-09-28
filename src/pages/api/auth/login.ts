import type { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs";
import { db } from "@/server/db";
import { createJWT } from "@/server/auth-lib/createJWT";

type UserToReturn = {
  id: string;
  email: string;
  role: string;
  accessToken: string;
};

type ErrorMessage = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<UserToReturn | ErrorMessage>
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "method not allowed" });
  }
  try {
    const { email, password } = await req.body;
    if (!email || !password) {
      return res
        .status(401)
        .json({ message: "UnAuthorized : wrong email or password" });
    }
    try {
      const userDB = await db.user.findFirst({
        where: { email },
      });

      if (!userDB) {
        return res
          .status(401)
          .json({ message: "UnAuthorized : wrong email or password" });
      }

      const passwordsMatch = await bcrypt.compare(password!, userDB.password);

      if (!passwordsMatch) {
        return res
          .status(401)
          .json({ message: "UnAuthorized : wrong email or password" });
      }
      const accessToken = createJWT(userDB);

      return res.status(200).json({
        id: userDB.id,
        email: userDB.email,
        role: userDB.role,
        accessToken,
      });
    } catch (error) {
      console.log("something went wrong , can't sign in : ", error);
      return res.status(500).json({
        message: "Server Error :Something went wrong , Cant log user in",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Server Error :Something went wrong , Cant log user in",
    });
  }
}
