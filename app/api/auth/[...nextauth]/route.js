import NextAuth from 'next-auth'
// import AppleProvider from 'next-auth/providers/apple'
// import FacebookProvider from 'next-auth/providers/facebook'
import GoogleProvider from 'next-auth/providers/google'
import GithubProvider from "next-auth/providers/github"
import User from '@/models/User'
import Payments from '@/models/Payments'
import connectDB from '@/db/ConnectDb'

export const authOptions = NextAuth({
    providers: [
        // OAuth authentication providers...
        // AppleProvider({
        //     clientId: process.env.APPLE_ID,
        //     clientSecret: process.env.APPLE_SECRET
        // }),
        // FacebookProvider({
        //     clientId: process.env.FACEBOOK_ID,
        //     clientSecret: process.env.FACEBOOK_SECRET
        // }),
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET
        }),
        GithubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
        }),
        // LinkedInProvider({
        //     clientId: process.env.LINKEDIN_CLIENT_ID,
        //     clientSecret: process.env.LINKEDIN_CLIENT_SECRET
        // }),
        // TwitterProvider({
        //     clientId: process.env.TWITTER_CLIENT_ID,
        //     clientSecret: process.env.TWITTER_CLIENT_SECRET
        // })
    ],
    callbacks: {
        async signIn({ user, account, profile, email, credentials }) {
            connectDB()
            const userExists = await User.findOne({ email: user.email })
            if (!userExists) {
                await User.create({
                    email: user.email,
                    username: user.email.split('@')[0],
                    name: user.name,
                    profilePicture: user.image,
                })
            }
            return true
        }
    }
})

export { authOptions as GET, authOptions as POST }