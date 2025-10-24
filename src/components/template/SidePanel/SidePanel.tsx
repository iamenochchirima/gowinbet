import classNames from 'classnames'
import Drawer from '@/components/ui/Drawer'
import { PiGearLight } from "react-icons/pi";
import SidePanelContent, { SidePanelContentProps } from './SidePanelContent'
import withHeaderItem from '@/utils/hoc/withHeaderItem'
import { useThemeStore } from '@/store/themeStore'
import type { CommonProps } from '@/@types/common'

type SidePanelProps = SidePanelContentProps & CommonProps

const _SidePanel = (props: SidePanelProps) => {
    const { className, ...rest } = props

    const panelExpand = useThemeStore((state) => state.panelExpand)
    const direction = useThemeStore((state) => state.direction)
    const setPanelExpand = useThemeStore((state) => state.setPanelExpand)

    const openPanel = () => {
        setPanelExpand(true)
    }

    const closePanel = () => {
        setPanelExpand(false)

        if (document) {
            const bodyClassList = document.body.classList
            if (bodyClassList.contains('drawer-lock-scroll')) {
                bodyClassList.remove('drawer-lock-scroll', 'drawer-open')
            }
        }
    }

    return (
        <>
            <div
                className="bg-gray-700 p-1.5 rounded-xl"
                onClick={openPanel}
                {...rest}
            >
                <PiGearLight size={25} />
            </div>
            {/* TODO: Modify */}
            {/* <Drawer
                title="Theme Config"
                isOpen={panelExpand}
                placement={direction === 'rtl' ? 'left' : 'right'}
                width={375}
                onClose={closePanel}
                onRequestClose={closePanel}
            >
                <SidePanelContent callBackClose={closePanel} />
            </Drawer> */}
        </>
    )
}

const SidePanel = withHeaderItem(_SidePanel)

export default SidePanel
