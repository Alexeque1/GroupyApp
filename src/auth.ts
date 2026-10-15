import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/db/db";
import { User } from "@/model/User";
import { loginSchema } from "@/lib/validation/auth";
import { SESSION_IDLE_TIMEOUT_SECONDS } from "@/lib/constants/session";

export const { handlers, auth, signIn, signOut } = NextAuth({
    providers: [
        Credentials({
            credentials: { identifier: {}, password: {} },

            authorize: async (credentials) => {
                const parsed = loginSchema.safeParse(credentials);
                if (!parsed.success) return null;

                const { identifier, password } = parsed.data;

                // Usernames can't contain "@" (see registerSchema), so an "@" means it's an email
                const query = identifier.includes("@")
                    ? { email: identifier.toLowerCase() }
                    : { username: identifier };

                await connectDB();
                const user = await User.findOne(query).select("+passwordHash");
                if (!user) return null;

                const passwordOk = await bcrypt.compare(password, user.passwordHash);
                if (!passwordOk) return null;

                return {
                    id: user._id.toString(),
                    name: `${user.firstName} ${user.lastName}`,
                    email: user.email,
                    image: user.profileImage || null,
                    username: user.username,
                };
            },
        }),
    ],

    session: { strategy: "jwt", maxAge: SESSION_IDLE_TIMEOUT_SECONDS },
    pages: { signIn: "/auth" },
    callbacks: {
        jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.username = user.username;
            }
            return token;
        },
        session({ session, token }) {
            session.user.id = token.id as string;
            session.user.username = token.username as string;
            return session;
        },
    },
});