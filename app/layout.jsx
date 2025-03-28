import "./globals.css";
import { DM_Sans } from "next/font/google";
import Sidebar from "./components/Sidebar";
import SessionWrapper from "./components/SessionWrapper";
import AddFeedbackBtn from "./components/AddFeedbackBtn";
import { ToastContainer } from "react-toastify";
import { ThemeProvider } from "./components/ThemeProvider";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
});

export const metadata = {
  title: "Client Feedback Management Portal | AhnafFarhan",
  description:
    "A comprehensive platform for managing client feedback, providing actionable insights to enhance service quality and engagement.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>{/* ... any head elements ... */}</head>
      <body className={`${dmSans.variable} antialiased flex`}>
        <SessionWrapper>
          <ThemeProvider>
            <ToastContainer position="bottom-right" autoClose={3000} />
            <Sidebar />
            <AddFeedbackBtn />
            {children}
          </ThemeProvider>
        </SessionWrapper>
      </body>
    </html>
  );
}
