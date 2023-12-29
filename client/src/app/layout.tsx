import NavBar from '@/components/navigation/NavBar'
import PreHeader from '@/components/navigation/PreHeader'
import Provider from '@/redux/wrappers/Provider'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Refresh from '@/redux/wrappers/Refresh'
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Midas',
  description: 'There I have to change SEO',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} flex flex-col min-h-[100vh]`}>
        <Provider>
          <Refresh>
            <PreHeader />
            <NavBar />
            {children}
            <Footer />
          </Refresh>
        </Provider>
      </body>
    </html>
  )
}
