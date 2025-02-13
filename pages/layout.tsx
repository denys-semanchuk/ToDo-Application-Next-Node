import { Geist, Geist_Mono } from "next/font/google";
import "../styles/globals.css";
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Todo App',
  description: 'A modern task management application',
  icons: {
    icon: [
      {
        url: '/assets/favicon.svg',
        type: 'image/svg+xml',
      }
    ]
  }
}
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
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
          {children}
      </body>
    </html>
  );
}
