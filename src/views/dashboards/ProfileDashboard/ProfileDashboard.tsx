import Loading from '@/components/shared/Loading'
import { apiGetProfileDashboard } from '@/services/DashboardService'
import useSWR from 'swr'
import { GetProfileDashboardResponse } from './types'
import { BiSave } from "react-icons/bi";
import { FaUser } from "react-icons/fa";
import { useSessionUser } from '@/store/authStore';


const ProfileDashboard = () => {
    const { avatar, firstname, lastname, email } = useSessionUser((state) => state.user)
    const { data, isLoading } = useSWR(
        ['/api/dashboard/profile'],
        () => apiGetProfileDashboard<GetProfileDashboardResponse>(),
        {
            revalidateOnFocus: false,
            revalidateIfStale: false,
            revalidateOnReconnect: false,
        },
    )

    return (
        <Loading loading={isLoading}>
            {data && (
                <div>
                    <div className="flex items-center justify-between">
                        <div className="">
                            <h3>
                                Your Profile
                            </h3>
                            <span>Last edit on 12 February 2024</span>
                        </div>
                        <div className="flex  items-center gap-3">
                            <button className='bg-gray-800 rounded-md text-white py-1.5 px-3'>
                                Discord
                            </button>
                            <button className='bg-primary flex gap-2 items-center rounded-md text-black py-1.5 px-3'>
                                <span>Save</span>
                                <BiSave size={17} />
                            </button>
                        </div>
                    </div>

                    {/**************************/}

                    <div className="flex items-center py-5 gap-8">
                        <img
                            src={avatar ? avatar : "/img/others/bluecard.png"}
                            alt="Profile"
                            className="w-24 h-24 rounded-full object-cover"
                        />
                        <div className="flex gap-3">
                            <button className='bg-[#248CE1] py-2 px-4 text-white font-semibold rounded-md'>
                                Change Picture
                            </button>
                            <button className='bg-[#2E1A1F] py-2 px-4 text-white font-semibold rounded-md'>
                                Change Picture
                            </button>
                        </div>
                    </div>

                    {/**************************/}

                    <div className="text-white flex items-center gap-2">
                        <FaUser size={18} />
                        <span className='font-semibold'>Personal Information</span>
                    </div>

                    <div className="py-6 ">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-gray-200 text-sm">First Name</label>
                                <input
                                    type="text"
                                    value={firstname}
                                    readOnly
                                    className="w-full px-3 py-3 mt-2 bg-gray-800  rounded-md border border-gray-600 focus:outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-200 text-sm">Last Name</label>
                                <input
                                    type="text"
                                    value={lastname}
                                    readOnly
                                    className="w-full px-3 py-3 mt-2 bg-gray-800  rounded-md border border-gray-600 focus:outline-none"
                                />
                            </div>


                            {/* Date of Birth and Phone Number */}
                            <div>
                                <label className="block text-gray-200 text-sm">Date of Birth</label>
                                <input
                                    type="text"
                                    value={""}
                                    readOnly
                                    className="w-full px-3 py-3 mt-2 bg-gray-800  rounded-md border border-gray-600 focus:outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-200 text-sm">Phone Number</label>
                                <input
                                    type="text"
                                    value={""}
                                    readOnly
                                    className="w-full px-3 py-3 mt-2 bg-gray-800  rounded-md border border-gray-600 focus:outline-none"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-gray-200 mt-4 text-sm">
                                Email Address
                            </label>
                            <input
                                type="text"
                                value={email}
                                readOnly
                                className="w-full px-3 py-3 mt-2 bg-gray-800  rounded-md border border-gray-600 focus:outline-none"
                            />
                        </div>

                        <div className="text-white flex items-center my-6 gap-2">
                            <FaUser size={18} />
                            <span className='font-semibold'>Personal Location</span>
                        </div>

                        <div className="mt-4">
                            {/* Address */}

                            {/* City, Region, Postal Code, Country */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                                <div>
                                    <label className="block text-gray-200 text-sm">City</label>
                                    <input
                                        type="text"
                                        value={""}
                                        readOnly
                                        className="w-full px-3 py-3 mt-2 bg-gray-800  rounded-md border border-gray-600 focus:outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-200 text-sm">Region</label>
                                    <input
                                        type="text"
                                        value={""}
                                        readOnly
                                        className="w-full px-3 py-3 mt-2 bg-gray-800  rounded-md border border-gray-600 focus:outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-200 text-sm">Postal Code</label>
                                    <input
                                        type="text"
                                        value={""}
                                        readOnly
                                        className="w-full px-3 py-3 mt-2 bg-gray-800  rounded-md border border-gray-600 focus:outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-200 text-sm">Country</label>
                                    <input
                                        type="text"
                                        value={""}
                                        readOnly
                                        className="w-full px-3 py-3 mt-2 bg-gray-800  rounded-md border border-gray-600 focus:outline-none"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </Loading>
    )
}

export default ProfileDashboard
