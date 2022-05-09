import React from "react";
const options = [
  {
    label: "Small",
    value: "5x4",
    x: 5,
    y: 4,
  },
  {
    label: "Medium",
    value: "8x7",
    x: 8,
    y: 7,
  },
  {
    label: "Large",
    value: "20x12",
    x: 20,
    y: 12,
  },
];
export default function Select({ setGridState }) {
  const [selectState, setSelectState] = React.useState(options[0].value);

  const updateGrid = () => {
    const data = options.filter((item) => item.value === selectState)[0];
    setGridState({ x: data.x, y: data.y });
  };

  React.useEffect(() => {
    updateGrid();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectState]);

  return (
    <select
      value={selectState}
      onChange={(e) => {
        setSelectState(e.target.value);
        console.log(e.target.value);
      }}
      className="bg-white/10 rounded-lg  py-2"
    >
      {options.map((option, i) => (
        <option key={i} className="bg-dark" value={option.value}>
          {option.label}({option.value})
        </option>
      ))}
    </select>
  );
}
