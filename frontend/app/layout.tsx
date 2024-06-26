import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'Sniff & Step',
    description: '강아지 산책 대행 서비스'
}

export default function RootLayout({
    children
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en">
            <link rel="icon" href="/favicons/favicon-96x96.png" sizes="any" />
            <body className={`${inter.className} bg-[#fcfcfc]`}>{children}</body>
        </html>
    )
}
