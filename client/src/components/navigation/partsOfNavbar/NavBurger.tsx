'use client';

import { useState } from "react";
import LinksSearchContacts, { TypeLink } from "./LinksSearchContacts";
import { CiMenuBurger } from "react-icons/ci";

const YourComponent = () => {
    const [isNavOpen, setIsNavOpen] = useState(false);

    const toggleNav = () => {
        setIsNavOpen(!isNavOpen);
    };

    return (
        <div>
            <div className="block sm:hidden m-2" onClick={toggleNav}>
                <CiMenuBurger size={20} className="cursor-pointer hover:scale-110 transition duration-200" />
            </div>

            <div
                className={`fixed inset-0 bg-gray-800 bg-opacity-75 z-50 transition-opacity ${isNavOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
                    }`}
                onClick={toggleNav}
            >
                <div className="fixed left-0 top-0 h-full bg-white w-64 p-4 transform translate-x-0 transition-transform ease-in-out duration-300">
                    <LinksSearchContacts type={TypeLink.BURGER} />
                </div>
            </div>
        </div>
    );
};

export default YourComponent;