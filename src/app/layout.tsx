import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ReduxProvider from "@/services/redux/provider";
import ThemeProvider from "./(layout)/theme-provider";
import ReactQueryProvider from "@/services/rquery/provider";
import Auth from "./auth";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Project Management",
  description: "Project Management",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReduxProvider>
          <ReactQueryProvider>{children}</ReactQueryProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
