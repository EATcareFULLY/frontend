import React from "react";
import { ToggleButton, ButtonGroup } from "react-bootstrap";

const SettingPreference = ({ name, status, onUpdate}) => {

    const handleChange = (value) => {
        onUpdate(name, value);
    };

    const options = [
        { value: -1, label: "Avoid", variant: "danger" },
        { value: 0, label: "Neutral", variant: "secondary" },
        { value: 1, label: "Recommend", variant: "success" },
    ];

    return (
        <div className="d-flex justify-content-between align-items-center mb-3">
            <p >{name}</p>
            <ButtonGroup>
                {options.map(({ value, label, variant }) => (
                    <ToggleButton
                        key={value}
                        id={`${name}-${value}`}
                        type="radio"
                        variant={value === status ? variant : `outline-${variant}`}
                        name={name}
                        value={value}
                        checked={status === value}
                        onChange={() => handleChange(value)}
                        style={{ color: value === status ? 'white' : 'inherit' }}
                    >
                        {label}
                    </ToggleButton>
                ))}
            </ButtonGroup>
        </div>
    );
};

export default SettingPreference;
