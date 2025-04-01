import React from "react";
import Slider from "@mui/material/Slider";
import "../styles/Filter.css";

interface FilterProps {
  filters: {
    location: string;
    transport: string[];
    price: { min: number; max: number };
    travelTime: { minHours: number; maxHours: number };
  };
  setFilters: React.Dispatch<
    React.SetStateAction<{
      location: string;
      transport: string[];
      price: { min: number; max: number };
      travelTime: { minHours: number; maxHours: number };
    }>
  >;
}

const labelStyles: React.CSSProperties = {
  padding: "0.5em",
  fontSize: "13px",
  color: "white",
};

const options = ["Car", "Bus", "Train", "Flight"];

const Filter: React.FC<FilterProps> = ({ filters, setFilters }) => {
  const [values, setValues] = React.useState<number[]>([0, 1000]);
  const [selectedTransport, setSelectedTransport] = React.useState<string[]>(filters.transport);

  const marks = [
    {
      value: 0,
      label: <span style={labelStyles}>$0</span>,
    },
    {
      value: 1000,
      label: <span style={labelStyles}>$1,000</span>,
    },
  ];

  const handleTransportChange = (option: string) => {
    setSelectedTransport((prevTransport) => {
      const newTransport = prevTransport.includes(option)
        ? prevTransport.filter((t) => t !== option)
        : [...prevTransport, option];

      setFilters((prevFilters) => ({
        ...prevFilters,
        transport: newTransport,
      }));

      return newTransport;
    });
  };

  return (
    <div style={{ marginBottom: "1em" }}>
      <label htmlFor="filter" style={{ marginRight: "0.5em" }}>
        Filters:
      </label>

      <div className="filter-container">
        {options.map((option) => (
          <label key={option} className="filter-option">
            <input
              type="checkbox"
              id={option}
              value={option}
              checked={selectedTransport.includes(option)}
              onChange={() => handleTransportChange(option)}
            />
            {option}
          </label>
        ))}
      </div>

      <br />

      <label htmlFor="price" style={{ marginRight: "0.5em" }}>
        Price:
      </label>
      <br />
      <Slider
        value={values}
        onChange={(event, newValue) => {
          setValues(newValue as number[]);
          setFilters((prevFilters) => ({
            ...prevFilters,
            price: {
              min: (newValue as number[])[0],
              max: (newValue as number[])[1],
            },
          }));
        }}
        valueLabelDisplay="auto"
        min={0}
        max={1000}
        marks={marks}
        style={{ width: "300px", margin: 0, color: "#5fc798" }}
      />
    </div>
  );
};

export default Filter;
