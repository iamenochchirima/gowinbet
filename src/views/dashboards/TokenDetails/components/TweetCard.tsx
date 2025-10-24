import { FC } from "react"
import { FiMessageSquare } from "react-icons/fi";
import { HiOutlineArrowPathRoundedSquare } from "react-icons/hi2";
import { IoIosHeartEmpty } from "react-icons/io";
import { BsUpload } from "react-icons/bs";
import { DetailedTweet } from "@/@types/tokens";


type Props = {
  tweet: DetailedTweet
}
const TweetCard: FC<Props> = ({ tweet }) => {

  const createdAt = (date: string) => {
    const d = new Date(date)
    return `${d.getDate()}-${d.getMonth() + 1}-${d.getFullYear()}`
  }

  return (
    <div
      key={tweet.id}
      className="flex items-start gap-2 border-gray-700 p-2 rounded-lg border bg-gray-800 "
    >
      <img
        src={tweet.user.profile_image_url}
        alt="Avatar"
        className="w-10 h-10 rounded-full"
      />
      <div>
        <div className="flex  gap-2">
          <span className="font-bold text-gray-200">{tweet.user.name}</span>
          <span className="text-sm ">@{tweet.user.handle}{"  .  "}</span>
          <span className="text-sm ">{createdAt(tweet.created_at)}</span>
        </div>
        <p className="mt-2 text-xs">{tweet.text}</p>
        <div className="flex items-center justify-between pr-4 mt-3  text-xs">
          <div className="flex items-center gap-1">
            <button>
              <FiMessageSquare size={18} />
            </button>
            <span>{tweet.replies_count}</span>
          </div>
          <div className="flex items-center gap-1">
            <button>
              <HiOutlineArrowPathRoundedSquare size={18} className="font-thin" />
            </button>
            <span>{tweet.retweet_count}</span>
          </div>
          <div className="flex items-center gap-1">
            <button>
              <IoIosHeartEmpty size={18} />
            </button>
            <span>{tweet.likes_count}</span>
          </div>
          <button>
            <BsUpload size={15} />
          </button>
        </div>
      </div>
    </div>
  )
}

export default TweetCard