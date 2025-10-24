import { useApp } from "@/store/appStore"
import { token } from "../../constants"
import ChartInfoCard from "../ChartInfoCard"
import InfoCard from "../InfoCard"
import { green, orange, red } from "./constents"

const Black = () => {
    const { selectedMagicToken } = useApp()


    const engagementRating = () => {
        if (selectedMagicToken.analysis?.engagement_rating) {
            return selectedMagicToken.analysis.engagement_rating * 100
        }
        return 0
    }

    const contactSafeScore = () => {
        return 0
    }

    const potentialSuccess = () => {
        if (selectedMagicToken.analysis?.confidence) {
            return selectedMagicToken.analysis.confidence * 100
        }
        return 0
    }

    const volatility = () : number => {
        if (selectedMagicToken.analysis?.volatility_probability) {
            return Number((selectedMagicToken.analysis.volatility_probability * 100).toFixed(0))
        }
        return 0
    }

    const sentiMentalPump = () => {
        if (selectedMagicToken.analysis?.pump_probability) {
            return (selectedMagicToken.analysis.pump_probability * 100).toFixed(0)
        }
        return 0
    }

    const sentmentalDump = () => {
        if (selectedMagicToken.analysis?.dump_probability) {
            return Number((selectedMagicToken.analysis.dump_probability * 100).toFixed(0))
        }
        return 0
    }

    const percentageColor = (value: number) => {
        if (value < 30) {
            return red
        } 
        else if (value < 60) {
            return orange
        } else {
            return green
        }
    }

    return (
        <>
            <div className="grid grid-cols-2 gap-2">
                <ChartInfoCard
                    color="#292C2D"
                    gap="10px"
                    title="Engagement  Rating"
                    image="/img/others/90.png"
                    height={80}
                    width={80}
                    value={engagementRating()}
                    strokeWidth={13}
                />
                <ChartInfoCard
                    color="#181A1C"
                    gap="10px"
                    title="Magic Score"
                    image="/img/others/60.png"
                    height={120}
                    width={120}
                    value={selectedMagicToken.magicScore}
                    strokeWidth={13}
                />
                <ChartInfoCard
                    color="#292C2D"
                    gap="10px"
                    title="Contract Safe Score "
                    image="/img/others/70.png"
                    height={80}
                    width={80}
                    value={"--"}
                    strokeWidth={13}
                />
                <ChartInfoCard
                    color="#292C2D"
                    gap="10px"
                    title="Potential Success"
                    image="/img/others/90.png"
                    height={80}
                    width={80}
                    value={potentialSuccess()}
                    strokeWidth={13}
                />
            </div>
            <div className="grid grid-cols-3 gap-2 mt-2">
                <InfoCard
                    color={percentageColor(volatility())}
                    gap="30px"
                    section={0}
                    title="Volatility %"
                    value={volatility()}
                />
                <InfoCard
                    color={percentageColor(engagementRating())}
                    gap="30px"
                    section={0}
                    title="Sentiment Pump %"
                    value={sentiMentalPump()}
                />

                <InfoCard
                    color={percentageColor(sentmentalDump())}
                    gap="30px"
                    section={0}
                    title="Sentiment Dump %"
                    value={sentmentalDump()}
                />
            </div>
        </>
    )
}

export default Black