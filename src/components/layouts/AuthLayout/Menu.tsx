import { FC, useEffect, useRef, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { GoArrowUpRight } from "react-icons/go";
import { Link, useLocation } from "react-router-dom";

type MenuProps = {
    setOpenMenu: (arg0: boolean) => void;
};

const Menu: FC<MenuProps> = ({ setOpenMenu }) => {
    const menuRef = useRef<HTMLDivElement>(null);
    const [showRegisterButtons, setShowRegisterButtons] = useState(false)

    const currentPath = useLocation().pathname

    useEffect(() => {
        if (currentPath !== '/sign-up' && currentPath !== '/sign-in') {
            setShowRegisterButtons(true)
        } else {
            setShowRegisterButtons(false)
        }
    }, [currentPath])


    useEffect(() => {
        const handleOutsideClick = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setOpenMenu(false);
            }
        };

        document.addEventListener("mousedown", handleOutsideClick);
        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
        };
    }, [setOpenMenu]);

    return (
        <div className="fixed top-0 left-0 right-0 bottom-0 z-50 bg-black bg-opacity-80">
            <div
                ref={menuRef}
                className="absolute top-0 left-0 min-w-[300px] bg-gray-800 h-full shadow-md"
            >
                <div className="flex justify-between items-center px-5 py-4 border-b border-gray-700">
                    <Link to="/" className="">
                        <img className="h-[35px] ss:h-10 xs:h-9 w-24 ts:w-auto" src="/logo.png" alt="Logo" />
                    </Link>
                    <button
                        className="text-xl"
                        onClick={() => setOpenMenu(false)}
                    >
                        <AiOutlineClose />
                    </button>
                </div>
                <ul className="list-none mt-5 px-5">
                    <li className="text-lg font-semibold mb-3 cursor-pointer">
                        <Link to="/pricing">Pricing</Link>
                    </li>
                    <li className="text-lg font-normal mb-3 cursor-pointer">
                        <Link to="/support">Support</Link>
                    </li>
                    <li className="text-lg font-normal mb-3 cursor-pointer">
                        <Link to="/">FAQ</Link>
                    </li>
                    <li className="text-lg font-normal mb-3 cursor-pointer">
                        <Link to="/">Documentation</Link>
                    </li>
                    <li className="text-lg font-normal mb-3 cursor-pointer">
                        <Link to="/contact">Contact</Link>
                    </li>
                    {showRegisterButtons && <li className="text-lg font-normal mb-3 cursor-pointer flex flex-col gap-3">
                        <Link to="/sign-in">
                            <button className="flex w-full text-white bg-primary hover:bg-primary-mild py-2 px-4 gap-3 items-center ">
                                <span>Login</span>
                                <GoArrowUpRight />
                            </button>
                        </Link>
                        <Link to="/sign-up">
                            <button className="flex w-full text-white bg-primary hover:bg-primary-mild py-2 px-4 gap-3 items-center ">
                                <span>Create Account</span>
                                <GoArrowUpRight />
                            </button>
                        </Link>
                    </li>}
                </ul>
            </div>
        </div>
    );
};

export default Menu;
