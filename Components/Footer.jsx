import Image from "next/image"
import Link from "next/link"

const Footer = () => {
    return (
        <footer className='bg_primary mt-[4rem] '>
            <section className='app px-4 py-8 sm:px-8 flex justify-between text_white flex-col sm:flex-row gap-12 sm:gap-4'>
                <div className="flex flex-col gap-5 items-center ">
                    <div className="flex flex-col gap-2">
                        <Image src="/assets/images/logo_white.svg" width={200} height={100} />
                        <p className="text-center text-[20px]">Repair in Peace</p>
                    </div>
                    <div>
                        <p className="text-center text-[18px]">2020-2023 &copy; All Rights Reserved</p>
                    </div>
                    <div>
                        <p className="text-center text-[18px]">Secure Payment</p>
                        <Image src='/assets/images/footer-payment-cards.svg' width={250} height={100} />
                    </div>
                </div>
                <div className="flex flex-col gap-5 items-center sm:items-start">
                    <h2 className="text-left text-[24px]">Company</h2>
                    <div className="flex flex-col">
                        <Link href="/">About us</Link>
                        <Link href="/">Contact us</Link>
                        <Link href="/">Terms Of Use</Link>
                        <Link href="/">Terms And Conditions</Link>
                        <Link href="/">Cancellation Policy</Link>
                        <Link href="/">Privacy Policy</Link>
                        <Link href="/">Warranty Policy</Link>
                        <Link href="/">Blogs</Link>
                    </div>
                </div>
                <div className="flex flex-col gap-5 items-center">
                    <p className="text-center text-[20px]">We are just a call away</p>
                    <p className="flex gap-2 items-center text-[24px]"> <Image src="/assets/images/footer-phone.svg" height={30} width={30}/> +91 9403890334</p>
                    <div className="flex items-center justify-center gap-2">
                        <Link href="/">
                            <Image src="/assets/social/facebook.svg" height={50} width={50}/>
                        </Link>
                        <Link href="/">
                            <Image src="/assets/social/twitter.svg" height={50} width={50}/>
                        </Link>
                        <Link href="/">
                            <Image src="/assets/social/instagram.svg" height={50} width={50}/>
                        </Link>
                        <Link href="/">
                            <Image src="/assets/social/youtube.svg" height={50} width={50}/>
                        </Link>
                    </div>
                </div>
            </section>
        </footer>
    )
}

export default Footer