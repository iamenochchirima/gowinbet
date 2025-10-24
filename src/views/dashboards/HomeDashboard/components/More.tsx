import { FC } from "react"
import { MdKeyboardArrowRight } from "react-icons/md"
import { Link } from "react-router-dom"

type Props = {
    url: string
}

const More: FC<Props> = ({ url }) => {
    return (
        <Link to={url} className="flex items-center text-xs text-primary">
            <span>
                More
            </span>
            <MdKeyboardArrowRight />
        </Link>
    )
}

export default More