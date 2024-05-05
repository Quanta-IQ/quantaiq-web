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
import SidebarProvider from "@/providers/SidebarProvider";
import CollapseLayout from "@/components/shared/CollapseLayout";
import Head from "next/head";
export const metadata: Metadata = {
  title: "Quanta IQ",
  description: "Revolutionizing education one lesson at a time with AI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  return (
    <html lang="en">
      <Head>
          <link rel="shortcut icon" href="/images/favicon.ico" />
          <link rel="apple-touch-icon" sizes="180x180" href="/images/apple-touch-icon.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/images/favicon-32x32.png"/>
          <link rel="icon" type="image/png" sizes="16x16" href="/images/favicon-16x16.png"/>
      </Head>
      <body className={inter.className}>
      <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
      <AuthProvider>

        
        <ConvexClientProvider>
          <SidebarProvider>

            <NavBar/>
          
            <LeftSidebar />
              <CollapseLayout>
              {children}
              </CollapseLayout>
              
            </SidebarProvider>
          <Toaster />
          
        </ConvexClientProvider>
      </AuthProvider>
      </ThemeProvider>
      </body>
    </html>
  );
}
