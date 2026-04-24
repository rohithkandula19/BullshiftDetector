import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'BullshiftDetector — LinkedIn Cringe Analyzer',
  description: 'AI-powered LinkedIn post cringe detector, roaster, and rewriter',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body>{children}</body>
    </html>
  )
}
