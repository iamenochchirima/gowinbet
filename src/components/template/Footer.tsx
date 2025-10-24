import Container from '@/components/shared/Container'
import classNames from '@/utils/classNames'
import { APP_NAME } from '@/constants/app.constant'
import { PAGE_CONTAINER_GUTTER_X } from '@/constants/theme.constant'
import { FaFacebookF, FaTelegramPlane, FaLinkedinIn, FaYoutube, FaDiscord} from "react-icons/fa";
import { FaInstagram, FaXTwitter } from "react-icons/fa6";


export type FooterPageContainerType = 'gutterless' | 'contained'

type FooterProps = {
    pageContainerType: FooterPageContainerType
    className?: string
}

const socials = [
    {
        name: "Facebook",
        icon: <FaFacebookF />,
        link: "#",
    },
    {
        name: "Instagram",
        icon: <FaInstagram />,
        link: "#",
    },
    {
        name: "Telegram",
        icon: <FaTelegramPlane />,
        link: "#",
    },
    {
        name: "Twitter",
        icon: <FaXTwitter />,
        link: "#",
    },
    {
        name: "Linkedin",
        icon: <FaLinkedinIn />,
        link: "#",
    },
    {
        name: "Youtube",
        icon: <FaYoutube />,
        link: "#",
    },
    {
        name: "Discord",
        icon: <FaDiscord />,
        link: "#",
    },
];

const FooterContent = () => {
    return (
        <footer className="ss:py-4 px-12 py-6 flex-auto w-full justify-center  text-sm">
            <div className=" ss:pt-3 mx-2px-6">
                <div className="flex mt-5 flex-col ss:justify-between ss:flex-row">
                    <div className="w-full flex justify-center text-center ss:text-start ss:justify-start">
                        <div className="max-w-[300px]">
                            <div className="flex justify-center ss:justify-start">
                                <img className="h-10" src="/logo.png" alt="Logo" />
                            </div>
                            <p className="mt-3 text-[12px] ts:text-sm text-faint-text-color">
                                <span className="text-nowrap">Magicvest aims for a user-friendly interface, ensuring</span> ease of navigation and feature comprehension.
                            </p>
                            <div className="flex justify-center">
                                <div className="mt-4 flex ss:max-w-[700px]  max-w-[200px] ss:flex-nowrap flex-wrap justify-center gap-1 mb-4 ss:mb-0">
                                    {socials.map((social, index) => (
                                        <a
                                            href={social.link}
                                            key={index}
                                            className="  h-10 w-10 ss:h-9 ss:w-9 p-2 bg-gray-800 rounded-full flex items-center justify-center"
                                        >
                                            {social.icon}
                                        </a>

                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex  justify-between ss:ml-10 w-full">
                        {/* Service */}
                        <div>
                            <span className="dark:text-gray-300 font-bold">Service</span>
                            <ul className="mt-4 space-y-2">
                                <li>
                                    <a href="#" className="text-gray-600 ">
                                        Swap
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="text-gray-600 ">
                                        Pro
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="text-gray-600 ">
                                        Token
                                    </a>
                                </li>
                            </ul>
                        </div>

                        {/* Resources */}
                        <div>
                            <span className="dark:text-gray-300 font-bold">Resources</span>
                            <ul className="mt-4 space-y-2">
                                <li>
                                    <a href="#" className="text-gray-600 ">
                                        User Docs
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="text-gray-600 ">
                                        Integration Docs
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="text-gray-600 ">
                                        ETH Wars
                                    </a>
                                </li>
                            </ul>
                        </div>

                        {/* Other */}
                        <div>
                            <span className="dark:text-gray-300 font-bold">Other</span>
                            <ul className="mt-4 space-y-2">
                                <li>
                                    <a href="#" className="text-gray-600 ">
                                        About
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="text-gray-600 ">
                                        Our Team
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="text-gray-600 ">
                                        Careers
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="text-gray-600 ">
                                        Brand Kit
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>

                </div>


                <div className="mt-8 text-[10px] ts:text-[11px] text-gray-500 border-t dark:border-gray-700 pt-5">
                    <p className="text-center hidden md:block">
                        All content provided on our website, linked websites, applications, forums, blogs, social media accounts, and associated platforms with Magicvest is intended purely for informational purposes. We do not guarantee the accuracy or timeliness of the information. None of our content should be construed as financial, legal, or any other form of advice. Any reliance you place on our content is at your own risk. It is recommended that you conduct your own research, review, and verification before making decisions. Trading involves high risks and potential losses; therefore, it is advisable to consult with a financial advisor before taking any action. Nothing on our site should be interpreted as an invitation or offer to engage in any activity.
                    </p>
                    <p className="text-center md:hidden ">
                        <span className="text-nowrap xs2:text-wrap ">All content provided on our website, linked websites, applications,</span>  <span className="text-nowrap xs2:text-wrap">forums, blogs, social
                            media accounts, and associated platforms with</span> <span> Magicvest is intended purely for informational
                                purposes. We do not </span>
                        <span >guarantee the accuracy or timeliness of the information. None of our </span>
                        <span className="">content should
                            be construed as financial, legal,
                            or any other form of </span> <span className="">advice. Any reliance you place on our content is at your own risk.</span><span className="hidden ss:block"> It is recommended that you conduct your own research, review, and verification before making decisions. Trading involves high risks and potential losses; therefore, it is advisable to consult with a financial advisor before taking any action. Nothing on our site should be interpreted as an invitation or offer to engage in any activity.</span>
                    </p>
                    <p className="ss:hidden text-center mt-5">
                        It is recommended that you conduct your own research, review, and verification before making decisions. Trading involves high risks and potential losses; therefore, it is advisable to consult with a financial advisor before taking any action. Nothing on our site should be interpreted as an invitation or offer to engage in any activity.
                    </p>
                </div>

                {/* Bottom Section */}
                <div className="mt-8 text-[#5F5271] flex flex-col text-center ss:flex-row ss:text-start justify-between items-center border-t border-gray-700 pt-6 ">
                    <p>©{`${new Date().getFullYear()}`}{' '} MagicVest. All rights reserved.</p>
                    <div className="flex gap-1 ss:space-x-4">
                        <a href="#" className="">
                            Terms of Service
                        </a>
                        <span>|</span>
                        <a href="#" className="">
                            Privacy Terms
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default function Footer({
    pageContainerType = 'contained',
    className,
}: FooterProps) {
    return (
        // TODO: clean up
        // <footer
        //     className={classNames(
        //         `footer flex flex-auto items-center h-16 ${PAGE_CONTAINER_GUTTER_X}`,
        //         className,
        //     )}
        // >
        //     {pageContainerType === 'contained' ? (
        //         <Container>
        //             <FooterContent />
        //         </Container>
        //     ) : (
        //         <FooterContent />
        //     )}
        // </footer>
        <Container>
            <FooterContent />
        </Container>
    )
}
