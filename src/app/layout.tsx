import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ReduxProvider from "@/services/redux/provider";
import ThemeProvider from "./theme-provider";
import WorkspaceProvider from "./workspace-provider";
import ReactQueryProvider from "@/services/rquery/provider";

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
          <ReactQueryProvider>
            <WorkspaceProvider>
              <ThemeProvider>{children}</ThemeProvider>
            </WorkspaceProvider>
          </ReactQueryProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
