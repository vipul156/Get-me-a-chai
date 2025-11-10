import { Barlow_Semi_Condensed } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SessionWrapper from "@/components/SessionWrapper";

const barlow = Barlow_Semi_Condensed({
  variable: "--font-zalando-sans",
  subsets: ["latin"],
  weight: ["400", "700"],
});


export const metadata = {
  title: "Get Me A Chai!",
  description: "Get Me A Chai lets fans support their favorite creators with a cup of chai! A fun, easy way to send tips, appreciation, and love — one sip at a time.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${barlow.variable}antialiased text-white`}
      >
        <SessionWrapper>
        <Navbar/>
        <div className="inset-0 -z-10 h-full w-full [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]">
        {children}
        </div>
        <Footer/>
        </SessionWrapper>
      </body>
    </html>
  );
}
