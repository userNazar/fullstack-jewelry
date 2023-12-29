import Link from "next/link";
import { RiAccountPinBoxFill } from "react-icons/ri";
import { BsBookmarkHeartFill } from "react-icons/bs";
import { HiShoppingCart } from "react-icons/hi";
import NavBurger from "./partsOfNavbar/NavBurger";
import LinksSearchContacts, { TypeLink } from "./partsOfNavbar/LinksSearchContacts";

const NavBar = () => {
    return (
        <>
            <div className='container mx-auto flex justify-between items-center mt-2'>
                <div className="hidden sm:block">
                    <div className="flex justify-center items-center">
                        <LinksSearchContacts type={TypeLink.NAVBAR}/>
                    </div>
                </div>

                <div className="block sm:hidden m-2">
                    <NavBurger />
                </div>

                <div>
                    <h2 className="text-2xl sm:text-3xl font-semibold">
                        <Link href={'/'}>Midas&Co.</Link>
                    </h2>
                </div>
                <div className="flex items-center justify-center">
                    <Link href={'/customer'} className="transition-transform transform hover:scale-110 m-2">
                        <RiAccountPinBoxFill size={24} />
                    </Link>
                    <Link href={'/saved'} className="transition-transform transform hover:scale-110 m-2">
                        <BsBookmarkHeartFill size={20} />
                    </Link>
                    <Link href={'/cart'} className="transition-transform transform hover:scale-110 m-2">
                        <HiShoppingCart size={24} />
                    </Link>
                </div>
            </div>
        </>
    )
}

export default NavBar;