import { authOptions } from "@/server/auth-lib/authOptions";
import NextAuth from "next-auth";

export default NextAuth(authOptions);
