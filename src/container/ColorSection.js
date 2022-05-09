import React from "react";

export default function ColorSection() {
  return (
    <div>
      <h4>
        Color <span className="text-primary-1">Meaning</span>
      </h4>
      <div className="grid grid-cols-2 w-fit mt-8">
        <div className="w-12 h-10 bg-white border"></div>
        <p className="inline-flex items-center">Maze wall</p>
        <div className="w-12 h-10 bg-primary-1 border"></div>
        <p className="inline-flex items-center">Start Node</p>
        <div className="w-12 h-10 bg-primary-3 border"></div>
        <p className="inline-flex items-center">End Node</p>
        <div className="w-12 h-10 bg-orange-300 border"></div>
        <p className="inline-flex items-center">Visited Node</p>
        <div className="w-12 h-10 bg-green-300 border"></div>
        <p className="inline-flex items-center">Path</p>
      </div>
    </div>
  );
}
