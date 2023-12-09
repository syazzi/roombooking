import { Inter } from 'next/font/google'
import './globals.css'
import 'flowbite'
import 'bootstrap/dist/css/bootstrap.min.css'
import Navbar from './components/Navbar'
import Footer from './components/footer'



const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <script src="../path/to/flowbite/dist/flowbite.min.js"></script>
      </body>

    </html>
  )
}
