import { userService } from "@/services/user-service";
import { AuthOptions } from "next-auth";

import GitlabProvider from "next-auth/providers/gitlab";

export const authOptions: AuthOptions = {
  providers: [
    GitlabProvider({
      authorization: {
        url: "https://git.zoonckan.ir/oauth/authorize",
        params: { scope: "read_user" },
      },
      token: "https://git.zoonckan.ir/oauth/token",
      userinfo: "https://git.zoonckan.ir/api/v4/user",
      clientId: process.env.GITLAB_CLIENT_ID as string,
      clientSecret: process.env.GITLAB_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    jwt: async ({ user, token }) => {
      if (!!user?.email) {
        const profile = await userService.getUserByEmail(user?.email);
        console.log("profile", profile);
        // @ts-ignore
        if (!!profile?.email) {
          // @ts-ignore
          return { user: profile, ...token };
        } else {
          // @ts-ignore
          await userService.create({ ...user, username: user.name });
          throw new Error("Unauthorized");
        }
      }
      return token;
    },
    session: async ({ session, token }) => {
      //   session.user = token.user;
      return session;
    },
  },
  pages: {
    error: "/signin/error",
  },
};
