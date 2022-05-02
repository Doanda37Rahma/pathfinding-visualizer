import React from "react";
import Button from "./component/Button";
import Input from "./component/Input";
import Select from "./component/Select";
import clsxm from "./lib/clsxm";

const initialCoordinateState = {
  x: 0,
  y: 0,
};

const initialGridState = {
  x: 5,
  y: 4,
};

let result = [...Array(initialGridState.x)].map(() =>
  [...Array(initialGridState.y)].map(() => ({
    type: "node",
    value: false,
  }))
);
export default function App() {
  const [sizeGrid, setSizeGrid] = React.useState(initialGridState);
  const [startNode, setStartNode] = React.useState(null);
  const [endNode, setEndNode] = React.useState(initialCoordinateState);

  const [startCoordinateState, setStartCoordinatState] = React.useState(
    initialCoordinateState
  );
  const [endCoordinateState, setEndCoordinatState] = React.useState(
    initialCoordinateState
  );
  const [gridCoordinateState, setGridCoordinatState] = React.useState(result);

  React.useEffect(() => {
    let result = [...Array(sizeGrid.x)].map(() =>
      [...Array(sizeGrid.y)].map(() => ({
        type: "node",
        value: false,
      }))
    );
    setGridCoordinatState(result);
  }, [sizeGrid]);

  //#region  //*=========== Gris State Management ===========
  const updateStartCoordinateState = (key, value) => {
    if (value >= sizeGrid[key] || value < 0) {
      return;
    }
    setStartCoordinatState((prevState) => {
      return {
        ...prevState,
        [key]: value,
      };
    });
  };

  const updateEndCoordinateState = (key, value) => {
    if (value >= sizeGrid[key] || value < 0) {
      return;
    }
    setEndCoordinatState((prevState) => {
      return {
        ...prevState,
        [key]: value,
      };
    });
  };

  // pakai fungsi ini untuk tandain node yang sudah di visited, atau lihat implementasi ada dibawah
  const updateGridCoordinateState = (x, y, value) => {
    const temp = [...gridCoordinateState];
    temp[x][y].value = value;
    setGridCoordinatState(temp);
  };

  const updateStartGridCoordinate = (x, y) => {
    if (endNode && x === endNode.x && y === endNode.y) {
      return;
    }
    const temp = [...gridCoordinateState];
    if (startNode !== null) {
      temp[startNode.x][startNode.y] = {
        type: "node",
        value: false,
      };
    }
    temp[x][y] = {
      type: "start",
      value: true,
    };
    setGridCoordinatState(temp);
    setStartNode({ x: x, y: y });
  };

  const updateEndGridCoordinate = (x, y) => {
    console.log(startNode, x, y);
    if (startNode && x === startNode.x && y === startNode.y) {
      return;
    }
    const temp = [...gridCoordinateState];
    if (endNode !== null) {
      temp[endNode.x][endNode.y] = {
        type: "node",
        value: false,
      };
    }
    temp[x][y] = {
      type: "end",
      value: true,
    };
    setGridCoordinatState(temp);
    setEndNode({ x: x, y: y });
  };
  //#endregion  //*======== Gris State Management ===========

  return (
    <div className="bg-dark flex items-center justify-center">
      <div className="layout py-20 min-h-screen flex flex-col gap-4 md:gap-8">
        <header>
          <p className="text-primary-1">Pathfinding Visualizer</p>
          <h1 className="text-pink-200">DAA C</h1>
        </header>
        <hr />
        {/* Input Start & End Coordinate */}
        <div className="grid md:grid-cols-2 gap-16">
          <div className="flex flex-col gap-4">
            <h4>
              Start <span className="text-primary-1">Coordinate</span>
            </h4>
            <div className="grid grid-cols-3 gap-2">
              <Input
                type="number"
                placeholder="number"
                label="X coordinate"
                value={startCoordinateState.x}
                onChange={(e) =>
                  updateStartCoordinateState("x", e.target.value)
                }
              />
              <Input
                type="number"
                placeholder="number"
                label="Y coordinate"
                value={startCoordinateState.y}
                onChange={(e) =>
                  updateStartCoordinateState("y", e.target.value)
                }
              />
              <div className="flex items-end">
                <Button
                  onClick={() =>
                    updateStartGridCoordinate(
                      startCoordinateState.x,
                      startCoordinateState.y,
                      "start"
                    )
                  }
                >
                  update
                </Button>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <h4>
              End <span className="text-primary-3">Coordinate</span>
            </h4>
            <div className="grid grid-cols-3 gap-2">
              <Input
                type="number"
                placeholder="number"
                label="X coordinate"
                value={endCoordinateState.x}
                onChange={(e) => updateEndCoordinateState("x", e.target.value)}
              />
              <Input
                type="number"
                placeholder="number"
                label="Y coordinate"
                value={endCoordinateState.y}
                onChange={(e) => updateEndCoordinateState("y", e.target.value)}
              />
              <div className="flex items-end">
                <Button
                  onClick={() =>
                    updateEndGridCoordinate(
                      endCoordinateState.x,
                      endCoordinateState.y
                    )
                  }
                >
                  update
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div>
          <p>Grid Size</p>
          <Select setGridState={setSizeGrid} />
        </div>
        <div className="flex justify-center ">
          <div
            className=" grid divide-y"
            style={{
              gridTemplateColumns: `repeat(${sizeGrid.x}, minmax(0, 1fr))`,
            }}
          >
            {gridCoordinateState.map((data, x) => (
              <div className="flex flex-col">
                {data.map((_, y) => (
                  <div
                    key={`${x}${y}`}
                    className={clsxm(
                      "border aspect-square p-1 w-12 cursor-pointer transition-all duration-100 ease-in",
                      [x === sizeGrid.x - 1 && "border-r"],
                      [gridCoordinateState[x][y].value && "bg-white/10"],
                      [
                        gridCoordinateState[x][y].type === "start" &&
                          "bg-primary-1",
                      ],
                      [
                        gridCoordinateState[x][y].type === "end" &&
                          "bg-primary-3",
                      ]
                    )}
                    onClick={() =>
                      updateGridCoordinateState(
                        x,
                        y,
                        !gridCoordinateState[x][y].value
                      )
                    }
                  >
                    <small className="text-white/20"> {`(${x},${y})`}</small>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
