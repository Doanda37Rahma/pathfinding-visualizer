import React from "react";
import { algorithm_data } from "../data/Algorithm";
import AlgorithmCard from "./AlgorithmCard";

export default function ContentSection() {
  return (
    <div className="bg-dark relative flex w-full min-h-screen py-20">
      <div className="layout">
        <p>Visualizaton of the</p>
        <h1 className="h0">Graph Algorithm</h1>
        <p>
          in solving the <span className="text-primary-1">maze problem</span>
        </p>
        <div className="grid md:grid-cols-2 gap-16 py-20">
          {algorithm_data.map((data, i) => (
            <AlgorithmCard
              title={data.title}
              description={data.description}
              image={data.image}
              key={i}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
