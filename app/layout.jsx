import { AuthProvider } from "@/components/auth-context"
import { Suspense } from "react"
import "./globals.css"

export const metadata = {
  title: "Water Disease Management System",
  description: "Healthcare system for tracking waterborne diseases and water quality",
  generator: "v0.app",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        <Suspense fallback={<div>Loading...</div>}>
          <AuthProvider>{children}</AuthProvider>
        </Suspense>
      </body>
    </html>
  )
}
