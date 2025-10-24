import SideNav from '@/components/template/SideNav'
import Header from '@/components/template/Header'
import SideNavToggle from '@/components/template/SideNavToggle'
import MobileNav from '@/components/template/MobileNav'
import Search from '@/components/template/Search'
import Notification from '@/components/template/Notification'
import UserProfileDropdown from '@/components//template/UserProfileDropdown'
import SidePanel from '@/components//template/SidePanel'
import LayoutBase from '@/components//template/LayoutBase'
import useResponsive from '@/utils/hooks/useResponsive'
import { LAYOUT_COLLAPSIBLE_SIDE } from '@/constants/theme.constant'
import type { CommonProps } from '@/@types/common'
import Buttons from './Buttons'
import MenuSection from './MenuSection'
import { useSessionUser } from '@/store/authStore'
import { useEffect, useState } from 'react'
import SubscribeModal from '@/views/general/Subscribe/components/SubscribeModal'

const CollapsibleSide = ({ children }: CommonProps) => {
    const { larger, smaller } = useResponsive()
    const [subscribeModalOpen, setSubscribeModalOpen] = useState(false)
    const { selectedPackage, setSelectedPackage, user } = useSessionUser((state) => state)
    useEffect(() => {
        if (selectedPackage && !user.subscription?.priceId) {
            setSubscribeModalOpen(true)
        }
    }, [selectedPackage, user])

    useEffect(() => {
        if (!user.subscription?.priceId) {
            setSubscribeModalOpen(true)
        }
    }, [user])


    const handleSubscribeClose = () => {
        setSubscribeModalOpen(false)
        setSelectedPackage(null)
    }

    return (
        <LayoutBase
            type={LAYOUT_COLLAPSIBLE_SIDE}
            className="app-layout-collapsible-side flex flex-auto flex-col"
        >
            <div className="flex flex-auto min-w-0">
                {larger.lg && <SideNav />}
                <div className="flex flex-col flex-auto min-h-screen min-w-0 relative w-full">
                    <Header
                        className="shadow dark:shadow-2xl"
                        headerStart={
                            <>
                                <MenuSection />
                                {larger.lg && <SideNavToggle />}
                                <Buttons />
                                <div className="2md:block hidden"><Search /></div>
                            </>
                        }
                        headerEnd={
                            <>
                                <SubscribeModal subscribeModalOpen={subscribeModalOpen} handleClose={handleSubscribeClose} />
                                {/* <LanguageSelector /> */}
                                <div className="xs2:flex hidden items-center gap-2">
                                    <div className="2md:hidden"><Search /></div>
                                    <SidePanel />
                                </div>
                                <Notification />
                                <UserProfileDropdown hoverable={false} />
                                <div className="2md:m-0.5">  {smaller.lg && <MobileNav />}</div>
                            </>
                        }
                    />
                    <div className="h-full flex flex-auto flex-col">
                        {children}
                    </div>
                </div>
            </div>
        </LayoutBase>
    )
}

export default CollapsibleSide
