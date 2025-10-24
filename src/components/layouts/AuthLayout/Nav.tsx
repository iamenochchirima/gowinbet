import { useEffect, useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { GoArrowUpRight } from "react-icons/go";
import { MdOutlineMenu } from "react-icons/md";
import Menu from "./Menu";

const Nav = () => {
    const [openMenu, setOpenMenu] = useState(false)
    const [showRegisterButtons, setShowRegisterButtons] = useState(false)


    const currentPath = useLocation().pathname

    useEffect(() => {
        if (currentPath !== '/sign-up' && currentPath !== '/sign-in') {
            setShowRegisterButtons(true)
        } else {
            setShowRegisterButtons(false)
        }
    }, [currentPath])

    return (
        <>
            <div className="w-full 2md:hidden  bg-gray-800 pt-5 pb-4">
                <div className="flex items-center justify-between px-4 xs:px-10 2md:px-20">
                    <Link to="/"><img className="h-8" src="/logo.png" alt="Logo" /></Link>
                    <button
                        onClick={() => setOpenMenu(true)}
                        className=" rounded-lg border border-gray-600">
                        <MdOutlineMenu className="text-custom-green" size={30} />
                    </button>
                </div>
                {openMenu && <Menu setOpenMenu={setOpenMenu} />}
            </div>
            <div className="py-5 relative w-full">
                <div className="flex gap-20 justify-center">
                    <ul className="2md:flex hidden  justify-between font-GeistLight text-sm items-center gap-5 border border-primary p-1.5 rounded-2xl  ">
                        <li>
                            <Link className=" px-2 py-1 rounded-full" to="/pricing">
                                Pricing
                            </Link>
                        </li>
                        <li>
                            <Link to="/" >
                                FAQ
                            </Link>

                        </li>
                        <li>
                            <Link to="/">
                                Documentation
                            </Link>
                        </li>

                        <li>
                            <Link to="/">
                                Contact
                            </Link>
                        </li>
                    </ul>
                    {showRegisterButtons && (
                        <div className="lg2:absolute hidden top-4.5 right-20 2md:flex items-center gap-2">
                            <Link to="">
                                <button className="flex text-white bg-primary hover:bg-primary-mild py-2 px-4 gap-3 items-center rounded-lg">
                                    <span>Login</span>
                                    <GoArrowUpRight />
                                </button>
                            </Link>
                            <Link to="">
                                <button className="flex text-white bg-primary hover:bg-primary-mild py-2 px-4 gap-3 items-center rounded-lg">
                                    <span>Create Account</span>
                                    <GoArrowUpRight />
                                </button>
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}

export default Nav