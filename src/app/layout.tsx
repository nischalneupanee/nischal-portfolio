import type { Metadata } from "next";
import { Inter, Fira_Code } from "next/font/google";
import "./globals.css";
import "./blog.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ParticleBackground from "@/components/ParticleBackground";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const firaCode = Fira_Code({ subsets: ["latin"], variable: "--font-fira-code" });

export const metadata: Metadata = {
  metadataBase: new URL('https://www.nischalneupane.name.np'),
  title: "Nischal Neupane - AI/ML Developer & CSIT Student",
  description: "Portfolio of Nischal Neupane - CSIT student passionate about AI/ML, Data Science, and Open Source development.",
  keywords: [
    "Nischal Neupane",
    "AI/ML Developer", 
    "Data Science",
    "CSIT Student",
    "Nepal",
    "Python",
    "Machine Learning",
    "Open Source",
    "Portfolio"
  ],
  authors: [{ name: "Nischal Neupane" }],
  creator: "Nischal Neupane",
  icons: {
    icon: [
      { url: '/navlogo.png', sizes: '32x32', type: 'image/png' },
      { url: '/navlogo.png', sizes: '16x16', type: 'image/png' }
    ],
    apple: { url: '/navlogo.png', sizes: '180x180', type: 'image/png' },
    shortcut: '/navlogo.png'
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.nischalneupane.name.np",
    title: "Nischal Neupane - AI/ML Developer & CSIT Student",
    description: "Portfolio of Nischal Neupane - CSIT student passionate about AI/ML, Data Science, and Open Source development.",
    siteName: "Nischal Neupane Portfolio",
    images: [
      {
        url: "/Website Profile.png",
        width: 1200,
        height: 630,
        alt: "Nischal Neupane - AI/ML Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nischal Neupane - AI/ML Developer & CSIT Student",
    description: "Portfolio of Nischal Neupane - CSIT student passionate about AI/ML, Data Science, and Open Source development.",
    images: ["/Website Profile.png"],
  },
  robots: {
    index: true,
    follow: true,
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} ${firaCode.variable} font-mono antialiased`}>
        <ParticleBackground />
        <div className="relative z-10 min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-grow pt-16">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
