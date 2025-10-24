import { useApp } from "@/store/appStore"
import InfoCard from "../InfoCard"
import { gray, green, orange, red } from "./constents";

interface FormattedTokenData {
    date: () => string;
    age: () => string;
  }

const Sec1 = () => {
    const { selectedMagicToken } = useApp()

    const formatTokenData = (
        creationDate: number | null,
        ageInSeconds: number | null
      ): FormattedTokenData => {
        const date = (): string => {
          if (!creationDate) return "--";
          
          const dateObj = new Date(creationDate * 1000);
          const day = String(dateObj.getUTCDate()).padStart(2, '0');
          const month = String(dateObj.getUTCMonth() + 1).padStart(2, '0'); 
          const year = dateObj.getUTCFullYear();
          return `${day}-${month}-${year}`;
        };
    
        const age = (): string => {
          if (!ageInSeconds) return "--";
    
          const seconds = parseInt(ageInSeconds.toString());
          const minutes = seconds / 60;
          const hours = minutes / 60;
          const days = hours / 24;
          const years = days / 365;
    
          if (years >= 1) {
            const yearValue = Math.floor(years);
            return `${yearValue} year${yearValue !== 1 ? 's' : ''}`;
          } else if (days >= 1) {
            const dayValue = Math.floor(days);
            return `${dayValue} day${dayValue !== 1 ? 's' : ''}`;
          } else if (hours >= 1) {
            const hourValue = Math.floor(hours);
            return `${hourValue} hour${hourValue !== 1 ? 's' : ''}`;
          } else if (minutes >= 1) {
            const minuteValue = Math.floor(minutes);
            return `${minuteValue} minute${minuteValue !== 1 ? 's' : ''}`;
          } else {
            return `${seconds} second${seconds !== 1 ? 's' : ''}`;
          }
        };
    
        return { date, age };
      };
    
      const { date, age } = formatTokenData(
        selectedMagicToken.metadata.creationDate ? selectedMagicToken.metadata.creationDate : null,
        selectedMagicToken.metadata.age ? selectedMagicToken.metadata.age : null
      );

    const initInsiders = () : string => {
        if (selectedMagicToken.initialInsiders) {
            return selectedMagicToken.initialInsiders.length.toString()
        }
        return "--"
    }

    const currentInsiders = () : string => {
        if (selectedMagicToken.currentInsiders) {
            return selectedMagicToken.currentInsiders.length.toString()
        }
        return "--"
    }

    const initBuyers = () : string => {
        if ((selectedMagicToken.initialBuyers?.length ?? 0) > 0) {
            return selectedMagicToken.initialBuyers?.length?.toString() ?? "--"
        }
        return "--"
    }

    const currentBuyers = () : string => {
        if ((selectedMagicToken.currentBuyersScore ?? 0) > 0) {
            return selectedMagicToken.currentBuyersScore?.toString() ?? "--"
        }
        return "--"
    }

        const ageColor = (ageInseconds: string) => {
            const age = parseInt(ageInseconds.split(" ")[0]);
            const unit = ageInseconds.split(" ")[1];
            if (unit === "day" && age < 3) {
                return red;
            } else if (unit === "day" && age >= 3) {
                return green;
            } else if (unit === "hour" && age < 24) {
                return red;
            } else if (unit === "hour" && age >= 24) {
                return orange;
            } else if (unit === "minute" && age < 60) {
                return red;
            } else if (unit === "minute" && age >= 60) {
                return orange;
            } else {
                return green;
            }
        }
    

    return (
        <>
            <div className="grid grid-cols-2 gap-2">
                <InfoCard
                    color={green}
                    gap="60px"
                    section={1}
                    title="Token Date"
                    value={date()}
                />
                <InfoCard
                    color={ageColor(age())}
                    gap="60px"
                    section={1}
                    title="Age"
                    value={age()}
                />
                <InfoCard
                    color={gray}
                    gap="60px"
                    section={1}
                    title="Init Insiders"
                    value={initInsiders()}
                />
                <InfoCard
                    color={gray}
                    gap="60px"
                    section={1}
                    title="Current Insiders"
                    value={"--"}
                />
                <InfoCard
                    color={gray}
                    gap="60px"
                    section={1}
                    title="Init Buyers"
                    value={"--"}
                />
                <InfoCard
                    color={gray}
                    gap="60px"
                    section={1}
                    title="Current Init Buyers"
                    value={"--"}
                />
            </div></>
    )
}

export default Sec1