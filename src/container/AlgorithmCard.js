import React from "react";
import clsxm from "../lib/clsxm";
import { IoIosArrowBack } from "react-icons/io";

export default function AlgorithmCard({ title, description, image }) {
  const [cardState, setCardState] = React.useState([true, false]);

  return (
    <div
      className="border-1 aspect-h-1 aspect-w-1 relative flex w-full overflow-hidden  rounded-2xl border-black shadow-md transition-transform duration-700"
      style={{
        transformStyle: "preserve-3d",
        transform: cardState[0]
          ? "rotate3d(0, 0, 0, 0deg)"
          : "rotate3d(0, 1, 0, 180deg)",
      }}
    >
      <div
        onClick={() => setCardState([false, true])}
        className={clsxm(
          "absolute inset-0 z-20 flex w-full cursor-pointer opacity-100 transition-all delay-100 duration-100",
          !cardState[0] && "pointer-events-none"
        )}
      >
        <img alt="" className="object-cover" objectFit="cover" src={image} />
        <div className="pointer-events-none absolute inset-0 flex items-end bg-gradient-to-b from-transparent to-dark p-8">
          <h2 className="mt-auto">{title}</h2>
        </div>
      </div>
      <div
        onClick={() => setCardState([true, false])}
        className={clsxm(
          "absolute inset-0 z-20 w-full  cursor-pointer opacity-100 transition-all delay-100 duration-100",
          !cardState[1] && "pointer-events-none opacity-0"
        )}
        style={{
          transform: "rotate3d(0, 1, 0, 180deg) translateZ(1px)",
        }}
      >
        <div
          className={clsxm(
            "pointer-events-none absolute inset-0  bg-primary-900/90 p-8 backdrop-blur-md md:p-4 lg:p-8",
            cardState[1] && "fade-in-start"
          )}
        >
          <p data-fade="2">{description}</p>
          <IoIosArrowBack size={25} className="absolute bottom-8 right-8" />
        </div>
      </div>
    </div>
  );
}
