import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import { ThemeProvider } from "@/providers/ThemeProvider"
const inter = Inter({ subsets: ["latin"] });
import AuthProvider from '@/providers/AuthProvider';
import ConvexClientProvider from "@/providers/ConvexClientProvider";
import NavBar from "@/components/shared/navbar/topbar";
import LeftSidebar from "@/components/shared/navbar/leftnav";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
      <AuthProvider>
        <ConvexClientProvider>
          
          <NavBar />
          <div className="flex flex-row ">
            <LeftSidebar />
            <div className="flex  flex-col pt-12  pr-4 w-full">
            
              {children}
            </div>
          </div>
          <Toaster />
          
        </ConvexClientProvider>
      </AuthProvider>
      </ThemeProvider>
      </body>
    </html>
  );
}
