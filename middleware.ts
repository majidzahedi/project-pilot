import { withAuth } from "next-auth/middleware";

// middleware is applied to all routes, use conditionals to select

const publicRoutes = ["/", "/signin"];

export default withAuth(function middleware(req) {}, {
  callbacks: {
    authorized: ({ token }) => token != null,
  },
  pages: {
    signIn: "/signin",
  },
});
