import jwt, { JwtPayload } from "jsonwebtoken";

import { User } from "next-auth";

export const createJWT = (user: User) => {
  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role ?? "user",
    },
    process.env.NEXTAUTH_SECRET as string
  );
  return token;
};

interface Payload extends JwtPayload {
  id: string;
  email: string;
  role: string;
}

export function verifyJwt(token: string) {
  try {
    const secret_key = process.env.NEXTAUTH_SECRET;
    const decoded = jwt.verify(token, secret_key!);
    return decoded as Payload;
  } catch (error) {
    console.log("error veryfing token");
    return null;
  }
}
