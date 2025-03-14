import React from 'react';
import Slider from '@mui/material/Slider';
import '../styles/Filter.css';

interface FilterProps {
    filters: {
        transport: string[],
        price: {min: number, max: number}
        travelTime: {minHours: number, maxHours: number}
    },
    setFilters: React.Dispatch<React.SetStateAction<{
        transport: string[],
        price: {min: number, max: number}
        travelTime: {minHours: number, maxHours: number}
    }>>
}

const labelStyles: React.CSSProperties = {
    padding: '0.5em',
    fontSize: '13px',
    color: 'white',
};

const options = ['Car', 'Bus', 'Train', 'Flight'];

const Filter: React.FC<FilterProps> = ({filters, setFilters}) => {

    const [values, setValues] = React.useState<number[]>([0, 1000]);
    const [transport, setTransport] = React.useState<string[]>(['Car', 'Bus', 'Train', 'Flight']);
    const marks = [
        {
            value: 0,
            label: <span style={labelStyles}>$0</span>,
        },
        {
            value: 1000,
            label: <span style={labelStyles}>$1000</span>,
        }
    ]

    return (
        <div style={{ marginBottom: '1em' }}>
            <label htmlFor="filter" style={{ marginRight: '0.5em' }}>Filters:</label>

            <br></br>
            {options.map((option) => (
                <div key={option} className='filter-option'>
                    <input
                        type="checkbox"
                        id={option}
                        value={option}
                        checked={transport.includes(option)}
                        onChange={(e) => {
                            if (e.target.checked) {
                                setTransport([...transport, option]);
                            } else {
                                setTransport(transport.filter((t) => t !== option));
                            }

                            setFilters(() => ({
                                ...filters,
                                transport: [...transport, option]
                            }));
                        }}
                    />
                    <label htmlFor={option}>{option}</label>
                </div>
                )
            )}
            <label htmlFor="price" style={{ marginRight: '0.5em' }}>Price:</label>
            <br/>
            <Slider
                value={values}
                onChange={(event, newValue) => 
                    {
                        setValues(newValue as number[])
                        setFilters(() => ({
                            ...filters,
                            price: {
                                min: (newValue as number[])[0],
                                max: (newValue as number[])[1]
                            }
                        }))
                    }
                }
                valueLabelDisplay="auto"
                min={0}
                max={1000}
                marks={marks}
                style={{ width: '300px', margin: '1em 0', color: '#5fc798' }}
            />
        </div>


    );
};

export default Filter;