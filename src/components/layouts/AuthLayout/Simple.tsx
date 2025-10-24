import { cloneElement } from 'react'
import type { ReactNode, ReactElement } from 'react'
import type { CommonProps } from '@/@types/common'
import TopBar from '../PostLoginLayout/components/TopBar'

interface SimpleProps extends CommonProps {
    content?: ReactNode
}

const Simple = ({ children, content, ...rest }: SimpleProps) => {
    return (
        <div className="flex flex-col items-center h-full bg-none bg-[url('/bg_lines.png')] bg-right bg-cover bg-no-repeat">
            <div className="w-full justify-center flex">
                <TopBar />
            </div>
            <div className="flex flex-col justify-center items-center h-full p-6">
                <div className="xl:max-w-[500px] px-1 md3:max-w-[380px] w-[340px] xs1:w-[380px] xs:w-[500px]">
                    <div className="mb-8">{content}</div>
                    {children
                        ? cloneElement(children as ReactElement, {
                              ...rest,
                          })
                        : null}
                </div>
            </div>
        </div>
    )
}

export default Simple
