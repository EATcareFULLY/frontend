import React, { useState } from "react";
import { ToggleButton, ButtonGroup } from "react-bootstrap";

const SettingPreference = ({ name, initialWanted, onUpdate}) => {
    const [selectedValue, setSelectedValue] = useState(initialWanted);

    const handleChange = (value) => {
        setSelectedValue(value);
        onUpdate(name, value);
    };

    const options = [
        { value: -1, label: "Avoid", variant: "danger" },
        { value: 0, label: "Neutral", variant: "secondary" },
        { value: 1, label: "Recommend", variant: "success" },
    ];

    return (
        <div className="d-flex justify-content-between align-items-center mb-3">
            <h5 >{name}</h5>
            <ButtonGroup>
                {options.map(({ value, label, variant }) => (
                    <ToggleButton
                        key={value}
                        id={`${name}-${value}`}
                        type="radio"
                        variant={value === selectedValue ? variant : `outline-${variant}`}
                        name={name}
                        value={value}
                        checked={selectedValue === value}
                        onChange={() => handleChange(value)}
                        style={{ color: value === selectedValue ? 'white' : 'inherit' }}
                    >
                        {label}
                    </ToggleButton>
                ))}
            </ButtonGroup>
        </div>
    );
};

export default SettingPreference;
