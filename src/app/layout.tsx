import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Verflow — The AI OS for modern teams",
  description: "Replace Slack, Notion, Jira with one AI-native workspace.",
  icons: {
    icon: "/favicon.ico",
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <meta name="google-site-verification" content="IPI3dDFmtL2IFFyyPMEuuBcpTWapn2H0X0XiRKuAMcA" />
      </head>
      <body>{children}</body>
    </html>
  )
}
