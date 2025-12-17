import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import AppSidebar from "@/components/Sidebar/app-sidebar"


const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "0Luggage",
  description: "Created with Next.js",
  generator: "Next.js",
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased`}>
        <SidebarProvider defaultOpen={true}>
          <div className="flex min-h-screen w-full">
            <AppSidebar />

            <div className="flex flex-col flex-1 min-w-0">
              {/* Mobile header with sidebar trigger */}
              <header className="flex h-14 items-center gap-3 border-b px-4 md:hidden bg-white sticky top-0 z-20">
                <SidebarTrigger />
                <span className="font-semibold text-lg text-sky-700">ZeroLuggage</span>
              </header>

              {/* Page Content */}
              <main className="flex-1 overflow-y-auto p-6 bg-gray-50">{children}</main>
            </div>
          </div>
        </SidebarProvider>
      </body>
    </html>
  )
}
