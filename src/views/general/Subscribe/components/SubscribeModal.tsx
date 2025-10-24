import { Dialog } from '@/components/ui'

import Packages from './Packages'
import { FC } from 'react'
type Props = {
    subscribeModalOpen: boolean,
    handleClose: () => void
}

const SubscribeModal: FC<Props> = ({subscribeModalOpen, handleClose}) => {
    return (
        <Dialog
            contentClassName=""
            isOpen={subscribeModalOpen}
            closable={false}
            width={800}
        >
            <div className="">
                <div className="flex justify-between items-center mb-4">
                    <div className=""></div>
                    <h2 className="text-xl font-bold">Choose Your Plan</h2>
                    <div className=""></div>
                    {/* <button onClick={handleClose} className="text-gray-300 font-bold hover:text-gray-200">
                        Close
                    </button> */}
                </div>
               
            </div>
            <Packages />
        </Dialog>
    )
}

export default SubscribeModal
