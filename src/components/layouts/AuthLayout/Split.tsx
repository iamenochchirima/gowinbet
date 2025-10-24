import { cloneElement } from 'react'
import type { ReactNode } from 'react'
import type { CommonProps } from '@/@types/common'
import TopBar from '../PostLoginLayout/components/TopBar'
import Nav from './Nav'

interface SplitProps extends CommonProps {
    content?: ReactNode
}

const Split = ({ children, content, ...rest }: SplitProps) => {
    return (
        <>
            <div
                className="flex flex-col items-center h-full bg-none lg:bg-[url('/bg_lines.png')] lg:bg-right lg:bg-cover lg:bg-no-repeat "
            >
                <div className="w-full justify-center   flex">
                    <TopBar />
                </div>
                <Nav />
                <div className="grid lg:grid-cols-2 h-full p-6">
                    <div className="flex flex-col justify-center items-center">
                        <div className=" xl:max-w-[500px] px-1 md3:max-w-[380px] w-[340px] xs1:w-[380px] xs:w-[500px] ">
                            <div className="mb-8">{content}</div>
                            {children
                                ? cloneElement(children as React.ReactElement, {
                                    ...rest,
                                })
                                : null}
                        </div>
                    </div>
                    <div className="py-6 px-10 flex-col justify-center items-center hidden lg:flex rounded-3xl">
                        <div className="flex flex-col items-center gap-12">
                            <img
                                className="max-w-[450px] md:max-w-[600px] 2xl:max-w-[700px]"
                                src="/welcome.png"
                                alt="Welcome"
                            />
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Split
