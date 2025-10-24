import Avatar from '@/components/ui/Avatar'
import Dropdown from '@/components/ui/Dropdown'
import withHeaderItem from '@/utils/hoc/withHeaderItem'
import { useSessionUser } from '@/store/authStore'
import { Link } from 'react-router-dom'
import { IoLogOutOutline } from "react-icons/io5";
import {
    PiUserDuotone,
    PiGearDuotone,
    PiPulseDuotone,
    PiSignOutDuotone,
} from 'react-icons/pi'
import { useAuth } from '@/auth'
import { IoIosArrowDown } from "react-icons/io";
import { JSX } from 'react'

type DropdownList = {
    label: string
    path: string
    icon: JSX.Element
}

const dropdownItemList: DropdownList[] = [
    {
        label: 'Profile',
        path: '/dashboards/profile',
        icon: <PiUserDuotone />,
    },
    {
        label: 'Account',
        path: '/concepts/account/settings',
        icon: <PiGearDuotone />,
    }
]

const _UserDropdown = () => {
    const { avatar, firstname, lastname, email } = useSessionUser((state) => state.user)

    const { signOut } = useAuth()

    const handleSignOut = () => {
        signOut()
    }
    const avatarProps = {
        ...(avatar ? { src: avatar } : { icon: <PiUserDuotone /> }),
    }

    const showUsername = (firstname = '', lastname = '') => {
        if (!firstname && !lastname) {
            return 'Anonymous';
        }
        const fullName = lastname ? `${firstname} ${lastname}` : firstname;
        if (fullName.length > 20) {
            return `${fullName.slice(0, 17)}...`;
        }
        return fullName;
    };

    return (
        <Dropdown
            className="flex"
            toggleClassName="flex items-center"
            renderTitle={
                <div className="cursor-pointer flex items-center gap-1 bg-gray-700 py-1 px-1 rounded-md">
                    <img
                        src={avatar ? avatar : "/img/others/bluecard.png"}
                        alt="Profile"
                        className="w-7 h-7 rounded-full object-cover"
                    />
                    <IoIosArrowDown size={18} className='ss:hidden' />
                    <span className='text-white font-bold ss:block hidden'>
                        {showUsername(firstname, lastname)}
                    </span>
                </div>
            }
            placement="bottom-end"
        >
            <Dropdown.Item variant="header">
                <div className="py-2 px-3 flex items-center gap-3">
                    <img
                        src={avatar ? avatar : "/img/others/bluecard.png"}
                        alt="Profile"
                        className="w-7 h-7 rounded-full object-cover"
                    />
                    <div>
                        <div className="font-bold text-gray-900 dark:text-gray-100">
                            {showUsername(firstname, lastname)}
                        </div>
                        <div className="text-xs">
                            {email}
                        </div>
                    </div>
                </div>
            </Dropdown.Item>
            <Dropdown.Item variant="divider" />
            {dropdownItemList.map((item) => (
                <Dropdown.Item
                    key={item.label}
                    eventKey={item.label}
                    className="px-0"
                >
                    <Link className="flex h-full w-full px-2" to={item.path}>
                        <span className="flex gap-2 items-center w-full">
                            <span className="text-xl">{item.icon}</span>
                            <span>{item.label}</span>
                        </span>
                    </Link>
                </Dropdown.Item>
            ))}
            <Dropdown.Item variant="divider" />
            <Dropdown.Item
                eventKey="Sign Out"
                className="gap-2"
                onClick={handleSignOut}
            >
                <span className="text-xl">
                    <IoLogOutOutline size={25} />
                </span>
                <span>Log Out</span>
            </Dropdown.Item>
        </Dropdown>
    )
}

const UserDropdown = withHeaderItem(_UserDropdown)

export default UserDropdown
