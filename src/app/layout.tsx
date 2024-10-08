import { Inter } from "next/font/google";
import './globals.css';
import { Metadata } from 'next';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer"
import AuthProvider from '@/components/AuthCheck';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Byte",
  description: "...Fast and hungry!",
  generator: "Next.js",
  manifest: "/manifest.json",
  keywords: ["nextjs", "next14", "pwa", "next-pwa"],
  themeColor: [{ color: "#fff" }],
  authors: [
    {
      name: "Diidee",
      url: "https://github.com/oyindee",
    },
  ],
  viewport: {
    width: 'device-width',
    initialScale: 1,
  },
  icons: [
    { rel: "apple-touch-icon", url: "icons/pizza.png" },
    { rel: "icon", url: "icons/pizza.png" },
  ],
};

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {

  return (
    <html>
        <body>
        <AuthProvider>
            <Navbar />
              {children}
          </AuthProvider>
          </body>
    </html>
  );
}
