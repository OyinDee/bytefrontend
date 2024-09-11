
"use client";

import Head from 'next/head';

export default function MetaTags() {
  return (
    <Head>
      <title>Byte</title>
      <meta name="description" content="...Fast and hungry!" />
      <meta name="generator" content="Next.js" />
      <meta name="manifest" content="/manifest.json" />
      <meta name="keywords" content="nextjs, next14, pwa, next-pwa" />
      <meta name="theme-color" content="#fff" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="apple-touch-icon" href="icons/pizza.png" />
      <link rel="icon" href="/icons/pizza-32x32.png" sizes="32x32" />
      <link rel="icon" href="/icons/pizza-192x192.png" sizes="192x192" />
    </Head>
  );
}
