export { default } from "next-auth/middleware"

// Read more: https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
export const config = {
  matcher: [
    "/balance-sheet/:path*",
    "/customer/:path*",
    "/dashboard/:path*",
    "/profile/:path*",
    "/report/:path*",
    "/trips/:path*",
  ],
}