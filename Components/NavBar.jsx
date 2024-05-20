import Image from "next/image"
import Link from "next/link"
const NavBar = () => {
  return (
    <nav className="nav px-2 py-5 sm:px-8 app">
        <div className="flex justify-between items-center">
            <Link href="/">
                <Image src='/assets/images/logo.png' width={120} height={50} ></Image>
            </Link>
            <div className="flex justify-between items-center gap-x-5">
                <Link target="_blank" href="tel:+919403890334" className="flex items-center gap-x-2">
                    <Image src='/assets/social/phone.png' height={20} width={30} />
                    <p className="font-bold text_primary text-[20px] hidden sm:block" >9403890334 </p>
                </Link>
                <Link  target="_blank" href="https://api.whatsapp.com/send?phone=+919403890334&amp;text=Hi ERIP, I would like to book a service for my Device" className="flex items-center gap-x-2">
                    <Image src='/assets/social/whatsapp.png' height={30} width={40} />
                    <p className="font-bold text_primary text-[20px] hidden sm:block  " >WhatsApp Us </p>
                </Link>
            </div>
        </div>
    </nav>
  )
}

export default NavBar