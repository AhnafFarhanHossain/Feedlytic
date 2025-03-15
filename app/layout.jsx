import "./globals.css";
import { Inter } from "next/font/google";
import Sidebar from "./components/Sidebar";
import SessionWrapper from "./components/SessionWrapper";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata = {
  title: "Client Feedback Management Portal | AhnafFarhan",
  description:
    "A comprehensive platform for managing client feedback, providing actionable insights to enhance service quality and engagement.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <SessionWrapper>
        <body className={`${inter.variable} antialiased flex`}>
          <Sidebar />
          {children}
        </body>
      </SessionWrapper>
    </html>
  );
}
