import Link from "next/link";
import { PiCallBell } from "react-icons/pi";
import { IoIosSearch } from "react-icons/io";
import { CiHome } from "react-icons/ci";

export enum TypeLink {
    "BURGER",
    "NAVBAR"
}

interface LinksSearchContactsProps {
    type: TypeLink
}

const LinksSearchContacts = ({ type }: LinksSearchContactsProps) => {
    return (
        <>
          <Link href={'/'} className="m-2 group flex items-center">
                <CiHome size={20} className="transition-transform transform group-hover:scale-110 mr-2" />
                {type === TypeLink.BURGER &&
                    <span className="group-hover">
                        Home!
                    </span>
                }
            </Link>
            <Link href={'/search'} className="m-2 group flex items-center">
                <IoIosSearch size={20} className="transition-transform transform group-hover:scale-110 mr-2" />
                {type === TypeLink.BURGER &&
                    <span className="group-hover">
                        Search!
                    </span>
                }
            </Link>
            <Link href={'/contacts'} className="m-2 group flex items-center">
                <PiCallBell size={20} className="mr-2 transition-transform transform group-hover:scale-110" />
                <span className="group-hover">
                    Contact us!
                </span>
            </Link>
        </>
    )
}

export default LinksSearchContacts