import React from "react";

export default function StepSection() {
  return (
    <div className="mb-20 flex flex-col gap-4">
      <h1 className="h0 ">Visualization</h1>
      <div>
        <small className="text-gray-500">how to start visualize?</small>
        <p className="text-xs">1. Select your Grid Size</p>
        <p className="text-xs">
          2. Select your Start Coordinate and click Update
        </p>
        <p className="text-xs">
          3. Select your End Coordinate and click Update
        </p>
        <p className="text-xs">
          4. Create your maze by clicking the squares on the grid area
        </p>
        <p className="text-xs">
          5. Select one of four algorithm to visualize path searching
        </p>
      </div>
    </div>
  );
}
