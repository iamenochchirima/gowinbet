import MobileNav from "@/components/template/MobileNav"
import useResponsive from "@/utils/hooks/useResponsive"
import { Link } from "react-router-dom"


const MenuSection = () => {
    const { larger, smaller } = useResponsive()
    return (
        <>
            <Link className="2md:hidden" to="/">
                <img className="h-8 " src="/logo.png" alt="Logo" />
            </Link>
            <div className="2md:block hidden"> {smaller.lg && <MobileNav />}</div>
        </>
    )
}

export default MenuSection