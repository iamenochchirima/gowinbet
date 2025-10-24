import { FC } from "react";
import { TwitterUser } from "./CardsVisuals";
import TweetCard from "./TweetCard"
import { BsThreeDotsVertical } from "react-icons/bs";
import { useApp } from "@/store/appStore";

type Props = {
    twitter: TwitterUser | null
}

const Tweets: FC<Props> = ({ twitter }) => {
    const { selectedMagicToken } = useApp()
    const createdAt = (date: string) => {
        const d = new Date(date)
        return `${d.getDate()}-${d.getMonth() + 1}-${d.getFullYear()}`
    }

    const displayTweets = () => {
        if (selectedMagicToken?.tweets) {
            const clean = selectedMagicToken.tweets.filter((tweet, index, self) =>
                index === self.findIndex((t) => (
                    t.id === tweet.id
                ))
            )
            return clean
        }
        return []
    }

    return (
        <div className="rounded-lg mt-5 llg:mt-0 mx-auto">
            {twitter && <> 
                <div className="flex gap-3 items-center">
                    <img
                        src={twitter.profile_image_url_https}
                        alt="Profile"
                        className="w-10 h-10 rounded-full object-cover"
                    />
                    <div className="flex items-center justify-between w-full">
                        <div className="flex flex-col">
                            <span className="text-gray-200 text-sm">{twitter.name}</span>
                            <span className="text-xs">
                                {createdAt(twitter.created_at)}
                            </span>
                        </div>
                        <button className="text-xl">
                           禁止复制或传播此文件。 <BsThreeDotsVertical />
                        </button>
                    </div>
                </div>
                <div className="border border-gray-700 my-4 p-1 rounded-lg">
                    <button className="dark:text-gray-200 border border-gray-700 py-1 px-4 rounded-lg">
                        Follow
                    </button>
                </div>
            </>}
            <div 
                className="overflow-y-auto grid grid-cols-1 sm:grid-cols-2 2xl:grid-cols-1 gap-2 max-h-[480px]"
            >
                {displayTweets().map((tweet, index) => (
                    <TweetCard key={index} tweet={tweet} />
                ))}
                {selectedMagicToken?.tweets?.length === 0 && (
                    <div className="text-center text-gray-400">No tweets found</div>
                )}
            </div>
        </div>
    )
}

export default Tweets