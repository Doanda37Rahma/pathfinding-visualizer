import React from "react";
import { breadthFirstSearch } from "./algorithm/breadthFirstSearch";
import { depthFirstSearch } from "./algorithm/depthFirstSearch";
import { greedyBestFirstSearch } from "./algorithm/greedyBestFirstSearch";
import { aStarSearch } from "./algorithm/aStarSearch";
import Button from "./component/Button";
import Input from "./component/Input";
import Select from "./component/Select";
import clsxm from "./lib/clsxm";
import CoverSection from "./container/CoverSection";
import ContentSection from "./container/ContentSection";
import StepSection from "./container/StepSection";
import ColorSection from "./container/ColorSection";
import Footer from "./container/Footer";

//#region  //*=========== Initial State ===========
const initialCoordinateState = {
  x: 0,
  y: 0,
  type: "node",
  value: false,
  isWall: false,
  isVisited: false,
};

const initialGridState = {
  x: 5,
  y: 4,
};

let result = [...Array(initialGridState.x)].map(() =>
  [...Array(initialGridState.y)].map(() => ({
    x: 0,
    y: 0,
    type: "node",
    value: false,
    isWall: false,
    isVisited: false,
  }))
);
//#endregion  //*======== Initial State ===========

export default function App() {
  /**
   *
   * sizeGrid = koordinat menggambarkan besarnya ukuran grid, {x:number, y:number}
   * startNode = koordinat menggambarkan dimana node awal berada, {x:number, y:number}
   * endNode = koordinat menggambarkan dimana node tujuan berada, {x:number, y:number}
   */
  const [sizeGrid, setSizeGrid] = React.useState(initialGridState);
  const [startNode, setStartNode] = React.useState(initialCoordinateState);
  const [endNode, setEndNode] = React.useState(initialCoordinateState);

  /**
   * gridCoordinateState = ini isinya semua data di gridnya, bentuknya array dua dimensi
   * @example aksesnya bisa seperti gridCoordinateState[2][9]
   * isinya object 
    {
      type: string;
      value: boolean;
    }
   * @type bisa 'node' || 'start' || 'end' || 'wall' || 'visited' || 'path'
   */
  const [gridCoordinateState, setGridCoordinatState] = React.useState(result);

  const [startCoordinateState, setStartCoordinatState] = React.useState(
    initialCoordinateState
  );
  const [endCoordinateState, setEndCoordinatState] = React.useState(
    initialCoordinateState
  );

  React.useEffect(() => {
    let result = [...Array(sizeGrid.x)].map((_, x) =>
      [...Array(sizeGrid.y)].map((_, y) => ({
        x: parseInt(x),
        y: parseInt(y),
        type: "node",
        value: false,
        isWall: false,
        isVisited: false,
      }))
    );
    setGridCoordinatState(result);
  }, [sizeGrid]);

  /**
   * @function untuk mengubah suatu atribut dari suatu sel dalam grid
   * @param x : koordinat x -> number, [0,n]
   * @param y : koordinat y -> number, [0,n]
   * @param key : key dari properti yang akan diubah
   * @param value : value yang menggantikan value lama
   */
  const updateGridCoordinateState = (x, y, key, value) => {
    if (
      x < 0 ||
      x > gridCoordinateState.length - 1 ||
      y < 0 ||
      y > gridCoordinateState[0].length - 1
    ) {
      return;
    }

    const temp = [...gridCoordinateState];

    temp[x][y] = {
      ...temp[x][y],
      [key]: value,
    };

    setGridCoordinatState(temp);
  };

  // update grid menjadi wall onClick
  const updateWallGridCoordinate = (x, y, isWall) => {
    const temp = [...gridCoordinateState];
    if (!isWall) {
      temp[x][y] = {
        x: parseInt(x),
        y: parseInt(y),
        type: "node",
        value: isWall,
        isWall: isWall,
        isVisited: false,
      };
    } else {
      temp[x][y] = {
        x: parseInt(x),
        y: parseInt(y),
        type: "wall",
        value: isWall,
        isWall: isWall,
        isVisited: false,
      };
    }
    setGridCoordinatState(temp);
  };

  /**
   * diabaikan saja fungsi dibawah ini, tekan Ctrl + K + 8 untuk collapse bagian ini ya
   */
  //#region  //*=========== Grid State Management ===========
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

  const updateStartGridCoordinate = (x, y) => {
    if (endNode && x === endNode.x && y === endNode.y) {
      return;
    }
    const temp = [...gridCoordinateState];
    if (startNode !== null) {
      temp[startNode.x][startNode.y] = {
        ...temp[startNode.x][startNode.y],
        type: "node",
        value: false,
      };
    }
    temp[x][y] = {
      ...temp[x][y],
      type: "start",
      value: true,
    };
    // console.log("start node updated");
    setGridCoordinatState(temp);
    setStartNode({ ...startNode, x: parseInt(x), y: parseInt(y) });
  };

  const updateEndGridCoordinate = (x, y) => {
    if (startNode && x === startNode.x && y === startNode.y) {
      return;
    }
    const temp = [...gridCoordinateState];
    if (endNode !== null) {
      temp[endNode.x][endNode.y] = {
        ...temp[endNode.x][endNode.y],
        type: "node",
        value: false,
      };
    }
    temp[x][y] = {
      ...temp[x][y],
      type: "end",
      value: true,
    };
    // console.log("end node updated");
    setGridCoordinatState(temp);
    setEndNode({ ...endNode, x: parseInt(x), y: parseInt(y) });
  };

  const updateVisitedGridCoordinate = (x, y) => {
    if (startNode && x === startNode.x && y === startNode.y) {
      return;
    }
    const temp = [...gridCoordinateState];

    temp[x][y] = {
      ...temp[x][y],
      type: "visited",
    };
    setGridCoordinatState(temp);
  };

  const updatePathGridCoordinate = (x, y) => {
    if (startNode && x === startNode.x && y === startNode.y) {
      return;
    }
    const temp = [...gridCoordinateState];

    temp[x][y] = {
      ...temp[x][y],
      type: "path",
    };
    setGridCoordinatState(temp);
  };

  //#endregion  //*======== Grid State Management ===========

  /**
   *
   * @param data: Visited nodes in order of first expanded and
   * nodes in the resulting path
   */
  const simulateSearch = (data) => {
    gridCoordinateState.forEach((data, x) => {
      data.forEach((node, y) => {
        if (node.type === "visited" || node.type === "path")
          updateGridCoordinateState(node.x, node.y, "type", "node");
      });
    });

    data.visitedNodes.forEach((node, i) => {
      setTimeout(() => {
        if (node.type !== "start" && node.type !== "end")
          updateVisitedGridCoordinate(node.x, node.y);
      }, i * 30);
    });

    if (data.pathNodes.length > 0) {
      setTimeout(() => {
        data.pathNodes.forEach((node, i) => {
          setTimeout(() => {
            if (node.type !== "start" && node.type !== "end")
              updatePathGridCoordinate(node.x, node.y);
          }, i * 30);
        });
      }, data.visitedNodes.length * 30);
    }
  };

  return (
    <div className="bg-dark flex flex-col items-center justify-center">
      <CoverSection />
      <ContentSection />
      <div className="layout min-h-screen py-20 flex flex-col gap-4 md:gap-8">
        <StepSection />
        {/* Select Grid Size */}
        <div>
          <h4>
            <small>01.</small> Grid{" "}
            <span className="text-secondary-1">Size</span>
          </h4>
          <Select setGridState={setSizeGrid} />
        </div>
        <hr />
        {/* Input Start & End Coordinate */}
        <div className="grid md:grid-cols-2 gap-16">
          <div className="flex flex-col gap-4">
            <h4>
              <small>02.</small>
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
              <small>03.</small>
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
        <hr />
        {/* Path Grid Visualizer*/}
        <h4 className="w-full">
          <small>04.</small>
          Create <span className="text-primary-1">Maze</span>
        </h4>
        <div className="flex justify-center overflow-auto">
          <div
            className="grid divide-y  min-w-max"
            style={{
              gridTemplateColumns: `repeat(${sizeGrid.x}, minmax(0, 1fr))`,
            }}
          >
            {gridCoordinateState.map((data, x) => (
              <div className="flex flex-col ">
                {data.map((_, y) => (
                  <div
                    key={`${x}${y}`}
                    className={clsxm(
                      "border aspect-square text-white/10 p-1 w-12  cursor-pointer transition-all duration-200 ease-in",
                      [x === sizeGrid.x - 1 && "border-r"],
                      [
                        gridCoordinateState[x][y].value &&
                          "bg-white text-black",
                      ],
                      [
                        gridCoordinateState[x][y].type === "start" &&
                          "bg-primary-1 text-white",
                      ],
                      [
                        gridCoordinateState[x][y].type === "end" &&
                          "bg-primary-3 text-white",
                      ],
                      [
                        gridCoordinateState[x][y].type === "visited" &&
                          "bg-orange-300",
                      ],
                      [
                        gridCoordinateState[x][y].type === "path" &&
                          "bg-green-300",
                      ]
                    )}
                    onClick={() =>
                      updateWallGridCoordinate(
                        x,
                        y,
                        !gridCoordinateState[x][y].isWall
                      )
                    }
                  >
                    <small>{`(${x},${y})`}</small>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
        <hr />
        {/* Algo Buttons (temporary?) */}
        <div className="flex flex-wrap gap-4 items-center ">
          <h4>
            <small>05.</small>
            Start <span className="text-primary-1">Visualize</span>
          </h4>
          <Button
            onClick={() =>
              simulateSearch(
                breadthFirstSearch(gridCoordinateState, startNode, endNode)
              )
            }
          >
            BFS
          </Button>
          <Button
            onClick={() =>
              simulateSearch(
                depthFirstSearch(gridCoordinateState, startNode, endNode)
              )
            }
          >
            DFS
          </Button>
          <Button
            onClick={() =>
              simulateSearch(
                greedyBestFirstSearch(gridCoordinateState, startNode, endNode)
              )
            }
          >
            Greedy
          </Button>
          <Button
            onClick={() =>
              simulateSearch(
                aStarSearch(gridCoordinateState, startNode, endNode)
              )
            }
          >
            A Star
          </Button>
        </div>
        <hr />
        <ColorSection />
      </div>
      <Footer />
    </div>
  );
}
