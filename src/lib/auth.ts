import NextAuth from "next-auth";
import { nextAuthOptions } from "./nextAuthOptions";

export const { handlers, auth, signIn, signOut } = NextAuth(nextAuthOptions);
