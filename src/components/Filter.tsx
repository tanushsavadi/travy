import React, { useState } from "react";
import Slider from "@mui/material/Slider";
import { MdFilterAlt, MdFilterAltOff } from "react-icons/md";
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
  const [isCollapsed, setIsCollapsed] = useState(false);

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
    <div className="m-0 sm:mb-1">
      <button
        className="toggle-button m-auto bg-gray-800 text-white rounded-md p-2 mb-2"
        onClick={() => setIsCollapsed(!isCollapsed)}
        style={{backgroundColor: isCollapsed ? "#4A5568" : "#2D3748"}}
      >
        <div className="flex flex-row items-center justify-center">
         {isCollapsed ? (
          <MdFilterAlt size={20} color="white" />
          ) : (
          <MdFilterAltOff size={20} color="white" />
          )}
          <span className="pl-2">Filters</span>
        </div>
      </button>

      {!isCollapsed && (
        <div className="rounded-xl backdrop-blur-md  p-3 filter-box">
          <div className="filter-container" >
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

          <label htmlFor="price" className="text-md">
            Price:
          </label>
          <br />
          <Slider
            aria-label="Price Range"
            value={values}
            onChange={(_, newValue) => {
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
            className="price-slider"
          />
        </div>
      )}
    </div>
  );
};

export default Filter;
