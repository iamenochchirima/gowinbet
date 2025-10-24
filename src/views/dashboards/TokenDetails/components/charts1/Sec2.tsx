import { useApp } from "@/store/appStore"
import InfoCard from "../InfoCard"
import { TwitterUser } from "../CardsVisuals"
import { FC } from "react"
import { gray, green, orange, red } from "./constents"


type Props = {
    twitter: TwitterUser | null
}

const Sec2: FC<Props> = ({ twitter }) => {
    const { selectedMagicToken } = useApp()
    const twitterDate = () => {
        if (twitter) {
            return formatDate(twitter.created_at)
        }
        return "--"
    }

    const formatDate = (date: string) => {
        const d = new Date(date)
        return `${d.getDate()}-${d.getMonth() + 1}-${d.getFullYear()}`
    }

    const twiterDateColor = (data: string) => {
        const currentDate = new Date()
        const twitterDate = new Date(data)
        const diff = currentDate.getTime() - twitterDate.getTime()
        const diffHours = Math.floor(diff / (1000 * 60 * 60))
        const diffDays = Math.floor(diff / (1000 * 60 * 60 * 24))
        if (diffHours < 24) {
            return red
        } else if (diffDays < 3) {
            return orange
        } else {
            return green
        }
    }

    return (
        <>
            <div className="grid grid-cols-2 gap-2">
                <InfoCard
                    color={twiterDateColor(twitter?.created_at || "")}
                    gap="8px"
                    section={2}
                    title="Twitter Date"
                    value={twitterDate()}
                />
                <InfoCard
                    color={gray}
                    gap="8px"
                    section={2}
                    title="Fake Follow %"
                    value={"--"}
                />
                <InfoCard
                    color={gray}
                    gap="8px"
                    section={2}
                    title="Dev %"
                    value={"--"}
                />
                <InfoCard
                    color={gray}
                    gap="8px"
                    section={2}
                    title="Bot Vol%"
                    value={"--"}
                />
                <InfoCard
                    color={gray}
                    gap="8px"
                    section={2}
                    title="DexTool Paid"
                    value={"--"}
                />
                <InfoCard
                    color={gray}
                    gap="8px"
                    section={2}
                    title="DexTool Update"
                    value={"--"}
                />
                <InfoCard
                    color={selectedMagicToken.metadata.dexscreenerPaid ? green : red}
                    gap="8px"
                    section={2}
                    title="Dexscreener Paid"
                    value={selectedMagicToken.metadata.dexscreenerPaid ? "Yes" : "No"}
                />
                <InfoCard
                    color={selectedMagicToken.metadata.dexscreenerPaid ? green : red}
                    gap="8px"
                    section={2}
                    title="Dexscreener Update"
                    value={selectedMagicToken.metadata.dexscreenerPaid ? "Yes" : "No"}
                />
            </div>
        </>
    )
}

export default Sec2