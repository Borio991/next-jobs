import { withAuth, type NextRequestWithAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(request: NextRequestWithAuth) {
    console.log(" request.nextUrl.pathname :", request.nextUrl.pathname);
    if (
      request.nextUrl.pathname.startsWith("/admin") &&
      request.nextauth.token?.role !== "admin"
    ) {
      console.log("request.nextUrl.pathname :", request.nextUrl.pathname);
      return NextResponse.rewrite(new URL("/denied", request.url));
    }
  },
  {
    callbacks: {
      authorized({ token }) {
        return !!token;
      },
    },
    pages: {
      signIn: "/authPages/SignInPage",
    },
  }
);
export const config = { matcher: ["/admin"] };
