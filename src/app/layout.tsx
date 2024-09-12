import { Inter } from "next/font/google";
import './globals.css';
import { Metadata } from 'next';
import RestaurantNavbar from '@/components/RestaurantNavbar';
import UserNavbar from '@/components/UserNavbar';
import PublicNavbar from '@/components/PublicNavbar';
import { usePathname } from 'next/navigation';

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
  const pathname = usePathname();

  const renderNavbar = () => {
    if (pathname.startsWith('/restaurant')) {
      return <RestaurantNavbar />;
    } else if (pathname.startsWith('/user')) {
      return <UserNavbar />;
    } else {
      return <PublicNavbar />;
    }
  };

  return (
    <html>
      <body className={inter.className}>
          {renderNavbar()}
          <main>{children}</main>
      </body>
    </html>
  );
}
