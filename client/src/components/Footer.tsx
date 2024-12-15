import Link from "next/link";
import { FaInstagram, FaFacebookSquare, FaPinterest, FaTwitter, FaYoutube } from "react-icons/fa";

const Footer = () => {

    return (
        <footer className="mt-auto pt-10">
            <div className='bg-teal-500 h-[10px]'></div>
            <div className="mt-5 px-10 flex flex-wrap justify-center sm:justify-between">
                <div className="flex justify-center flex-wrap">
                    <div className="mx-5 mb-5">
                        <h3 className="font-bold mb-5">Client Care</h3>
                        <div className="mt-2 text-sm">
                            <Link href="/">Contact us!</Link>
                        </div>
                        <div className="mt-2 text-sm">
                            <Link href="/">Products.</Link>
                        </div>
                    </div>
                    <div className="mx-5 mb-5">
                        <h3 className="font-bold mb-5">Our Company</h3>
                        <div className="mt-2 text-sm">
                            <Link href="/">About us!</Link>
                        </div>
                    </div>
                    <div className="mx-5 mb-5">
                        <h3 className="font-bold mb-5">Related Tiffany Sites</h3>
                        <div className="mt-2 text-sm">
                            <Link href="/">About us!</Link>
                        </div>
                    </div>
                </div>
                <div className="min-w-[200px]">
                    <h2 className="text-2xl font-bold">Midas</h2>
                    <p className="mt-3 max-w-[200px] text-sm text-gray-500">Midas - one of the best store in the while world!</p>
                    <div>
                        <button
                            className="mt-5 min-w-[150px] h-[50px] flex justify-center items-center bg-black text-white cursor-pointer border border-black hover:bg-teal-200 hover:text-black transition duration-500"

                        >
                            <Link href={'/customer/registration'} className="min-w-[150px] h-[50px] flex items-center justify-center">
                                Sing up!
                            </Link>
                        </button>
                    </div>
                    <div className="flex justify-between mt-5">
                        <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
                            <FaInstagram size={30} />
                        </a>
                        <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
                            <FaFacebookSquare size={30} />
                        </a>
                        <a href="" target="_blank" rel="noopener noreferrer">
                            <FaPinterest size={30} />
                        </a>
                        <a href="" target="_blank" rel="noopener noreferrer">
                            <FaTwitter size={30} />
                        </a>
                        <a href="https://www.youtube.com/" target="_blank" rel="noopener noreferrer">
                            <FaYoutube size={30} />
                        </a>
                    </div>
                </div>
            </div>
            <div className="text-center m-5">
                © M&CO. {new Date().getFullYear()}
            </div>
        </footer>
    )
}

export default Footer