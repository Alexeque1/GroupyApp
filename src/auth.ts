import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/db/db";
import { User } from "@/model/User";
import { loginSchema } from "@/lib/validation/auth";

export const { handlers, auth, signIn, signOut } = NextAuth({
    providers: [
        Credentials({
            credentials: { email: {}, password: {} },

            // YOUR function: verifies the "entry"
            authorize: async (credentials) => {
                const parsed = loginSchema.safeParse(credentials);
                if (!parsed.success) return null;

                const { email, password } = parsed.data;

                await connectDB();
                const user = await User.findOne({ email: email.toLowerCase() }).select("+passwordHash");
                if (!user) return null;

                const passwordOk = await bcrypt.compare(password, user.passwordHash);
                if (!passwordOk) return null;

                // Whatever you return here is what Auth.js stores in the session
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
    session: { strategy: "jwt" },
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