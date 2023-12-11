import Link from "next/link"
import Image from "next/image"
import Logo from "../images/logo.png"
export default function Navbar() {
  return (
    <nav>
        <div className="text-center">
            <Image
            src={Logo}
            alt="UBD Logo"
            width={100}
            placeholder='blur'
            quality={100}
            />
            <span className="ps-2 text-xs text-center align-top" style={{ 
             }}>Room Booking</span>
        </div>
        <div className="flex gap-5 flex-1 justify-end">
            <Link href='/'>Home</Link>
            <Link href='/dashboard/customer'>Dashboard</Link>
            <Link href='/timetable'>Timetable</Link>
            <span className="text-white">Logout</span>
        </div>
        
    </nav>
  )
}
