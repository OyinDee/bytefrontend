import { Metadata } from 'next';

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
