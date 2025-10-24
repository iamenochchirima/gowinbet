import { cloneElement } from 'react';
import type { ReactNode } from 'react';
import type { CommonProps } from '@/@types/common';
import TopBar from '../PostLoginLayout/components/TopBar';
import Nav from './Nav';
import PublicFooter from '@/components/template/PublicFooter';

interface SplitProps extends CommonProps {
    content?: ReactNode;
}

const Split = ({ children, content, ...rest }: SplitProps) => {
    return (
        <div className="flex flex-col min-h-screen">
            <div className="flex flex-col w-full max-w-[1536px] mx-auto flex-grow">
                <TopBar />
                <div className="flex justify-center relative">
                    <Nav />
                </div>
                <div className="flex flex-col w-full flex-grow items-start"> {/* Changed from items-center to items-start */}
                    <div className="mb-8">{content}</div>
                    {children
                        ? cloneElement(children as React.ReactElement, {
                            ...rest,
                        })
                        : null}
                </div>
            </div>
            <PublicFooter className="" pageContainerType="contained" />
        </div>
    );
};

export default Split;
