import { DraftAlert } from "@/components/misc/DraftAlert"
import type { Metadata } from "next"
import type { ReactNode } from "react"

import "@/styles/globals.css"
import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"

export const metadata: Metadata = {
  title: {
    default: "Next.js for Drupal",
    template: "%s | Next.js for Drupal",
  },
  description: "A Next.js site powered by a Drupal backend.",
  icons: {
    icon: "/favicon.ico",
  },
}

export default function RootLayout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children,
}: {
  children: ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
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
