import React from "react";
import clsxm from "../lib/clsxm";
import useMounted from "../lib/useMounted";

export default function CoverSection() {
  const isMounted = useMounted();
  return (
    <div className="bg-home relative flex  w-full bg-cover bg-fixed bg-no-repeat">
      <article className="min-h-screen layout z-10 flex flex-col">
        <header className="flex items-center h-20 sticky top-0">
          <small>QUIZ 2 Design & Analysis of Algorithms (C) REPORT</small>
        </header>
        <div
          className={clsxm(
            "flex items-center h-full",
            isMounted && "fade-in-start"
          )}
        >
          <div className="flex flex-col gap-4">
            <div>
              <h1 data-fade="1" className="text-white h0">
                Pathfinding Visualizer
              </h1>
              <h2 data-fade="2" className="text-pink-200">
                DAA C
              </h2>
            </div>
            <hr />
            <div className="grid grid-cols-2 gap-x-4">
              <p data-fade="3">Doanda Dresta Rahma</p>
              <p data-fade="4">5025201049</p>
              <p data-fade="5">Warren Gerald Polandra</p>
              <p data-fade="6">5025201233</p>
              <p data-fade="7">Wina Tungmiharja</p>
              <p data-fade="8">5025201242</p>
            </div>
          </div>
        </div>
      </article>
      <div className="absolute inset-0 pointer-events-none bg-dark opacity-60 "></div>
    </div>
  );
}
