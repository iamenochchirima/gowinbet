
import type { CommonProps } from '@/@types/common'
import { HiOutlineMenu } from 'react-icons/hi';
import { RiMenuFold2Line, RiMenuUnfold2Line } from "react-icons/ri";

export interface NavToggleProps extends CommonProps {
    toggled?: boolean
}

const NavToggle = ({ toggled, className }: NavToggleProps) => {
    return (
        <div className={className}>
            {toggled ? <RiMenuFold2Line /> : <>
                <RiMenuUnfold2Line className='2md:block hidden' />
                <div className="2md:hidden block border-2 border-gray-600 rounded-lg">
                    <HiOutlineMenu size={26} />
                </div>
            </>}
        </div>
    )
}

export default NavToggle
