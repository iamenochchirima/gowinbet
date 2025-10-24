
import Tweets from "./Tweets";
import { useEffect, useRef, useState } from "react";
import Black from "./charts1/Black";
import Sec2 from "./charts1/Sec2";
import Sec1 from "./charts1/Sec1";
import { useApp } from "@/store/appStore";
import { get } from "http";
import { apiGetUsernameTwitter } from "@/services/MagicTokensService";
import { T } from "@fullcalendar/core/internal-common";
import { data } from '../../common/constants';

export type TwitterUser = {
    id: string;
    rest_id: string;
    name: string;
    screen_name: string;
    description: string;
    location: string;
    followers_count: number;
    friends_count: number;
    statuses_count: number;
    profile_image_url_https: string;
    profile_banner_url?: string;
    verified: boolean;
    created_at: string;
    is_blue_verified: boolean;
    professional?: {
      category?: {
        id: number;
        name: string;
        icon_name: string;
      }[];
      professional_type: string;
    };
  };

  
const CardsVisuals = () => {
    const referenceDivRef = useRef<HTMLDivElement | null>(null);
    const targetDivRef = useRef<HTMLDivElement | null>(null);
    const [maxHeight, setMaxHeight] = useState<number>(0);
    const { selectedMagicToken } = useApp()
    const [twitter, setTwitter] = useState<TwitterUser | null>(null)

    useEffect(() => {
        if (!referenceDivRef.current) return;
        const observer = new ResizeObserver((entries) => {
            for (const entry of entries) {
                if (entry.target === referenceDivRef.current) {
                    const height = entry.contentRect.height;
                    setMaxHeight(height);
                }
            }
        });
        observer.observe(referenceDivRef.current);
        return () => {
            observer.disconnect();
        };
    }, []);

    const [screenW, setScreenW] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => setScreenW(window.innerWidth);
        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        if (selectedMagicToken) {
            getTwitterData(selectedMagicToken.metadata.twitter)
        }
    }, [selectedMagicToken])

    const getTwitterData = async (twitterHandle?: string) => {
        if (!twitterHandle) {
            return
        }
        try {
            const username = extractUsernameFromUrl(twitterHandle)

            if (!username) {
                return
            }

            const response = await apiGetUsernameTwitter(username)
            
            if (response) {
               const data = getData(response)
                setTwitter(data)
            }
        } catch (error) {
            console.log("Error in getting twitter data", error)
        }
    }
    const extractUsernameFromUrl = (url: string): string | null => {
        const regex = /https?:\/\/(?:www\.)?(?:x\.com|twitter\.com)\/([A-Za-z0-9_]+)/;
        const match = url.match(regex);
        return match ? match[1] : null;
    };

    const getData =  (data: any ): TwitterUser => {
        const twitterUser: TwitterUser = {
            id: data.result.data.user.result.id,
            rest_id: data.result.data.user.result.rest_id,
            name: data.result.data.user.result.legacy.name,
            screen_name: data.result.data.user.result.legacy.screen_name,
            description: data.result.data.user.result.legacy.description,
            location: data.result.data.user.result.legacy.location,
            followers_count: data.result.data.user.result.legacy.followers_count,
            friends_count: data.result.data.user.result.legacy.friends_count,
            statuses_count: data.result.data.user.result.legacy.statuses_count,
            profile_image_url_https: data.result.data.user.result.legacy.profile_image_url_https,
            profile_banner_url: data.result.data.user.result.legacy.profile_banner_url,
            verified: data.result.data.user.result.legacy.verified,
            created_at: data.result.data.user.result.legacy.created_at,
            is_blue_verified: data.result.data.user.result.is_blue_verified,
            professional: data.result.data.user.result.professional,
          };
        return twitterUser
    }

    return (
        <div className="">
            <div className="flex 2xl:flex-row flex-col w-full  gap-3">
                <div className="md3:flex hidden w-full 2xl:w-3/4 flex-col gap-2"
                    ref={referenceDivRef}
                >
                    <div className="grid gap-2 grid-cols-7">
                        <div className="col-span-4 gap-2 grid grid-cols-2">
                            <Sec1 />
                            <Sec2 twitter={twitter} />
                        </div>
                        <div className="col-span-3">
                            <Black />
                        </div>
                    </div>
                    {/* <div className="">
                        <Sec3 />
                    </div> */}
                </div>
                <div className="flex md3:hidden flex-col gap-3"
                >
                    <div className="grid gap-2  ss:grid-cols-2">
                        <div className="">
                            <Black />
                        </div>
                        <Sec1 />
                        <Sec2 twitter={twitter} />
                    </div>
                    {/* <Tweets twitter={twitter} /> */}
                </div>
                <div className="overflow-hidden 2xl:w-1/4"
                    ref={targetDivRef}
                    style={{
                        maxHeight: screenW < 1532 ? "" : `${maxHeight}px`,
                        WebkitMask: "linear-gradient(to bottom, white 0%, white 75%, rgba(0, 0, 0, 0.5) 100%)",
                        mask: "linear-gradient(to bottom, white 0%, white 75%, rgba(0, 0, 0, 0.5) 100%)",
                        WebkitMaskImage: "linear-gradient(to bottom, white 0%, white 75%, rgba(0, 0, 0, 0.5) 100%)",
                        maskImage: "linear-gradient(to bottom, white 0%, white 75%, rgba(0, 0, 0, 0.5) 100%)",
                    }}
                >
                    <Tweets twitter={twitter} />
                </div>
            </div>
        </div>
    )
}

export default CardsVisuals