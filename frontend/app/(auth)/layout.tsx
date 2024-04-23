import "../globals.css";
import { Inter } from "next/font/google";
import React from "react";
import ConvexClientProvider from "../../providers/ConvexClientProvider";
import AuthProvider from '../../providers/AuthProvider';
import { Toaster } from "../../components/ui/toaster";
import Image from "next/image";


const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
      <html lang="en">
          <body className={inter.className}>
            
            <AuthProvider>
              <ConvexClientProvider>
  
   
              <main className="max-h-screen justify-center">
                  <section className = "main-container">
                   
                      <div className="mt-20 items-center pb-2 flex flex-row justify-center gap-2">
                            <Image src="/assets/atomic.png" className="w-12 h-auto"  alt="logo" width={100} height={100} />
                            <p className="text-3xl font-bold text-black">
                              quantaIQ
                            </p>
                      </div>

                    {children}
                  </section>
                  
              </main>
              <Toaster />
              </ConvexClientProvider>
              
            
            </AuthProvider>
            
        </body>
      </html>
      
    );
  }
  