import { Inter } from "next/font/google";
import './globals.css';
import NavbarWrapper from './NavbarWrapper'; 
import { CartProvider } from "./user/cartContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Byte",
  description: "...Fast and hungry!",
  generator: "Next.js",
  manifest: "/manifest.json",
  keywords: ["nextjs", "next14", "pwa", "next-pwa"],
  themeColor: "#fff",
  viewport: {
    width: 'device-width',
    initialScale: 1,
  },
  icons: {
    icon: "/icons/pizza.png",
    apple: "/icons/pizza.png",
  },
};

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <CartProvider>
        <NavbarWrapper />
        <main>{children}</main>
    </CartProvider>
      </body>
    </html>
  );
}
