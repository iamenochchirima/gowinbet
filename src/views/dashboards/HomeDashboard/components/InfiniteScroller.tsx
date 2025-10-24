import { FC, useEffect, useRef } from "react";
import "./InfiniteScroller.css";
import CryptoCard from "./CryptoCard";
import { MagicToken } from "@/@types/tokens";

const adjustScrollerWidth = () => {
  const scrollers = document.querySelectorAll(".scroller");
  const screenWidth = window.innerWidth;

  scrollers.forEach((scroller) => {
    let maxWidth;
    if (screenWidth <= 344) {
      maxWidth = "300px";
    } else if (screenWidth >= 2500) {
      maxWidth = "3000px";
    } else {
      maxWidth = `${(screenWidth / 1700) * 1500}px`;
    }
    (scroller as HTMLElement).style.maxWidth = maxWidth;
  });
};

type Props = {
  direction: "left" | "right";
  tokens: MagicToken[];
}

const InfiniteScroller: FC<Props> = ({ direction, tokens }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    adjustScrollerWidth();
    window.addEventListener("resize", adjustScrollerWidth);

    return () => {
      window.removeEventListener("resize", adjustScrollerWidth);
    };
  }, []);

  useEffect(() => {
    const scroller = scrollRef.current;
    if (!scroller || tokens.length === 0) return;

    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      scroller.setAttribute("data-animated", "true");
      scroller.setAttribute("data-direction", direction); // Ensure direction is set

      const scrollerInner = scroller.querySelector(".scroller__inner");
      if (!scrollerInner) return;

      const scrollerContent = Array.from(scrollerInner.children[0].children) as HTMLElement[];
      const scrollerWidth = scroller.offsetWidth;
      const contentWidth = scrollerContent.reduce(
        (total, item) => total + item.offsetWidth + 20,
        0
      );

      const duplicatesNeeded = Math.ceil(scrollerWidth / contentWidth) + 1;

      // Clear existing duplicates before adding new ones
      while (scrollerInner.children[0].children.length > tokens.length) {
        scrollerInner.children[0].removeChild(scrollerInner.children[0].lastChild!);
      }

      for (let i = 0; i < duplicatesNeeded; i++) {
        scrollerContent.forEach((item) => {
          const duplicatedItem = item.cloneNode(true) as HTMLElement;
          duplicatedItem.setAttribute("aria-hidden", "true");
          scrollerInner.children[0].appendChild(duplicatedItem);
        });
      }
    }
  }, [tokens, direction]); 

  return (
    <div className="text-center">
      <div className="scroller mt-5" data-direction={direction} ref={scrollRef}>
        <div className="scroller__inner">
          <ul className="flex gap-5">
            {tokens.map((token, index) => (
              <CryptoCard key={`first-${index}`} token={token} />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default InfiniteScroller;