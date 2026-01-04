import React from "react";
import {ThemeProvider} from "@/components/theme-provider";
import Toaster from "@/components/ui/toaster";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";


export default function RootLayout({ children }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem
      disableTransitionOnChange
    >
      <div className="min-h-screen flex flex-col font-inter">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
      <Toaster />
    </ThemeProvider>
  );
}
