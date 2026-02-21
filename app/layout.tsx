import { DraftAlert } from "@/components/misc/DraftAlert"
import type { Metadata } from "next"
import type { ReactNode } from "react"
import { Space_Grotesk } from 'next/font/google';
import Head from 'next/head';
import "@/styles/globals.css"
import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-space-grotesk',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'),
  title: {
    default: 'Nunca Fuimos Normales | El Lado B del Disco',
    template: '%s | Nunca Fuimos Normales',
  },
  description:
    'El podcast definitivo sobre la cultura, los excesos y la genialidad del rock and roll. Historias no contadas de las bandas que marcaron la historia.',
  keywords: [
    'rock',
    'podcast',
    'música',
    'historia del rock',
    'backstage',
    '70s',
    '80s',
    '90s',
    'rock clásico',
    'nunca fuimos normales',
  ],
  authors: [{ name: 'Nunca Fuimos Normales' }],
  creator: 'Nunca Fuimos Normales',
  publisher: 'Riff Media',
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    siteName: 'Nunca Fuimos Normales',
  },
  twitter: {
    card: 'summary_large_image',
    creator: '@nuncafuimosnormales',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children,
}: {
  children: ReactNode
}) {
  return (
    <html lang="es" className="dark">
      <Head>
        {/* Google Material Symbols */}
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body className={`${spaceGrotesk.variable} font-display antialiased min-h-screen flex flex-col`}>
        <DraftAlert />
        <div className="flex-1">
          <Navbar />
          <main >{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  )
}
