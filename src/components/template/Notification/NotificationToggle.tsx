import classNames from '@/utils/classNames'
import Badge from '@/components/ui/Badge'
import { TbBellFilled } from "react-icons/tb";

const NotificationToggle = ({
    className,
    dot,
}: {
    className?: string
    dot: boolean
}) => {
    return (
        <div className="bg-gray-700 p-1.5 mx-1 rounded-xl"
        >
            {dot ? (
                <Badge badgeStyle={{ top: '3px', right: '6px' }}>
                    <TbBellFilled size={23}/>
                </Badge>
            ) : (
                <TbBellFilled size={23}/>
            )}
        </div>
    )
}

export default NotificationToggle
