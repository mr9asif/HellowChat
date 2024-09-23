import User from "@/modals/userSchema";
import bcrypt from 'bcryptjs';
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

export const handler = NextAuth(
  {
    providers: [
      CredentialsProvider({
        name: "credentials",
        credentials: {
          email: { label: "Email", type: "text" },
          password: { label: "Password", type: "password" },
        },
  
        async authorize(credentials) {
          const { email, password } = credentials;
  
          // Find the user by email
          const user = await User.findOne({ email: email });
          if(!user){
            console.log("email is invalid")
          }

          const pass = await bcrypt.compare(password, user.password)
          if(!pass){
            console.log("invalid password")
          }
          // Check if user exists and compare passwords
          if (user && await bcrypt.compare(password, user.password)) {
            return user; // Return the user object on success
          } else {
            throw new Error("Invalid email or password");
          }
        }
      })
    ],
  
    session: {
      strategy: "jwt"
    },
    secret: process.env.EXT_SECRET,
    pages: {
      signIn: '/login'
    },


    callbacks: {
      async jwt({ token, user }) {
        // If user is logged in, add user details to the token
        if (user) {
          token.id = user.id;
          token.email = user.email;
        }
        return token;
      },
  
      async session({ session, token }) {
        // Pass user details to session
        session.user.id = token.id;
        session.user.email = token.email;
        return session;
      },
    },
  }
  
  
  
)
export { handler as GET, handler as POST };

