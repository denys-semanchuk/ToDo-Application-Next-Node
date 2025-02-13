import { Geist, Geist_Mono } from "next/font/google";
import Head from 'next/head';
import "../styles/globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Head>
        <title>Todo App</title>
        <meta name="description" content="A modern task management application" />
        <link rel="icon" type="image/svg+xml" href="/assets/favicon.svg" />
      </Head>
      <html lang="en">
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          {children}
        </body>
      </html>
    </>
  );
}
