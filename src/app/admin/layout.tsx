import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });


interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {

  return (
    <html>
        <body>
              {children}
          </body>
    </html>
  );
}
