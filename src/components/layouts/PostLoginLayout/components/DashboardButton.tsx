import { useSessionUser } from "@/store/authStore";
import { useNavigate } from "react-router-dom"

const DashboardButton = () => {
    const navigate = useNavigate()
    const { setSelectedPackage } = useSessionUser((state) => state);
    const handleClick = () => {
        setSelectedPackage(null)
        navigate("/dashboard")
    }
    return (
        <button
            onClick={handleClick}
            className="inline-flex p-2  items-center rounded-lg bg-gray-800 border border-gray-700 text-sm text-gray-300 text-white shadow-sm hover:bg-gray-700"
        >
            Dashboard
        </button>
    )
}

export default DashboardButton
