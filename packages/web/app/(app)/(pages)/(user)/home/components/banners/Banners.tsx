"use client";

import styles from "./banners.module.css";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";

import { TbArrowUpRight } from "react-icons/tb";

export default function Banners2() {
  const [banners, setBanners] = useState<any[]>([]);
  const slides = useRef<HTMLDivElement>(null);


  useEffect(() => {
    let startX: number;
    let isDown: boolean = false;
    let scrollLeft: number | undefined = 0;
    let current: HTMLDivElement | null = slides.current;

    const handleMouseDown = (e: any) => {
      isDown = true;
      current?.classList.add("active");
      startX = e.pageX - (current?.offsetLeft ? current?.offsetLeft : 0);
      scrollLeft = current?.scrollLeft;
    };

    const handleMouseLeave = () => {
      isDown = false;
      current?.classList.remove("active");
    };

    const handleMouseUp = () => {
      isDown = false;
      current?.classList.remove("active");
    };

    const handleMouseMove = (e: any) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - (current?.offsetLeft ? current?.offsetLeft : 0);
      const walk = (x - startX) * 3; // scroll-fast
      if (current) current.scrollLeft = (scrollLeft ? scrollLeft : 0) - walk;
    };

    if (current) {
      current?.addEventListener("mousedown", handleMouseDown);
      current?.addEventListener("mouseleave", handleMouseLeave);
      current?.addEventListener("mouseup", handleMouseUp);
      current?.addEventListener("mousemove", handleMouseMove);
    }

    return () => {
      if (current) {
        current?.removeEventListener("mousedown", handleMouseDown);
        current?.removeEventListener("mouseleave", handleMouseLeave);
        current?.removeEventListener("mouseup", handleMouseUp);
        current?.removeEventListener("mousemove", handleMouseMove);
      }
    };
  }, [slides]);

  return (
    <div className="bg-[#110e19] rounded-2xl p-2">
      <div ref={slides} className={`${styles.items}`}>
        <span
          className={`${styles.item} relative mr-2 rounded-xl overflow-hidden`}
        >
          <Image
            src="/temp/ava1.png"
            alt="Subway"
            draggable="false"
            width="0"
            height="0"
            sizes="100vw"
          />
          {/* <div className="absolute bottom-0 left-0 px-4 pb-4 pt-10 bg-gradient-to-t from-black/60 w-full flex item-center justify-between">
            <p className="flex-1 text-white text-sm whitespace-pre-wrap subheading">
              Its an out of sandwich experience
            </p>
            <TbArrowUpRight className="text-white w-6 self-end" />
          </div> */}
        </span>
        <span
          className={`${styles.item} relative mr-2 rounded-xl overflow-hidden`}
        >
          <Image
            src="/temp/ava2.png"
            alt="Subway"
            draggable="false"
            width="0"
            height="0"
            sizes="100vw"
          />
          {/* <div className="absolute bottom-0 left-0 px-4 pb-4 pt-10 bg-gradient-to-t from-black/60 w-full flex item-center justify-between">
            <p className="text-white text-sm whitespace-pre-wrap subheading">
              Subway sandwiches and cookies
            </p>
            <TbArrowUpRight className="text-white w-6 self-end" />
          </div> */}
        </span>
        <span
          className={`${styles.item} relative mr-2 rounded-xl overflow-hidden`}
        >
          <Image
            src="/temp/ava3.png"
            alt="Subway"
            draggable="false"
            width="0"
            height="0"
            sizes="100vw"
          />
          {/* <div className="absolute bottom-0 left-0 px-4 pb-4 pt-10 bg-gradient-to-t from-black/60 w-full flex item-center justify-between">
            <p className="text-white text-sm whitespace-pre-wrap subheading">
              Subway Sandwiches
            </p>
            <TbArrowUpRight className="text-white w-6 self-end" />
          </div> */}
        </span>
        <span
          className={`${styles.item} relative mr-2 rounded-xl overflow-hidden`}
        >
          <Image
            src="/temp/ava4.png"
            alt="Subway"
            draggable="false"
            width="0"
            height="0"
            sizes="100vw"
          />
          {/* <div className="absolute bottom-0 left-0 px-4 pb-4 pt-10 bg-gradient-to-t from-black/60 w-full flex item-center justify-between">
            <p className="text-white text-sm whitespace-pre-wrap subheading">
              Subway Sandwiches
            </p>
            <TbArrowUpRight className="text-white w-6 self-end" />
          </div> */}
        </span>
      </div>
    </div>
  );
}