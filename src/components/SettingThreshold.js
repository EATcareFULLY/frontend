import React, { useState, useEffect } from "react";
import { Form, Row, Col } from "react-bootstrap";

const SettingThreshold = ({ name, value, unit, valueRange, onUpdate }) => {
    const [tempValue, setTempValue] = useState(value);

    useEffect(() => {
        setTempValue(value);
    }, [value]);

    const handleRangeChange = (event) => {
        const newValue = parseInt(event.target.value, 10);
        setTempValue(newValue);
        onUpdate(name, newValue);
    };

    const handleInputChange = (event) => {
        setTempValue(event.target.value);
    };

    const handleInputBlur = () => {
        let newValue = parseInt(tempValue, 10);

        if (isNaN(newValue)) {
            newValue = minValue;
        } else if (newValue < minValue) {
            newValue = minValue;
        } else if (newValue > maxValue) {
            newValue = maxValue;
        }

        setTempValue(newValue);
        onUpdate(name, newValue);
    };

    const [minValue, maxValue] = valueRange;

    return (
        <Form.Group as={Row} className="align-items-center mb-3">
            <Col sm={5} className="text-left">
                <Form.Label>{name}</Form.Label>
            </Col>
            <Col sm={4}>
                <Form.Range
                    value={value}
                    onChange={handleRangeChange}
                    min={minValue}
                    max={maxValue}
                    step={1}
                />
            </Col>
            <Col sm={2}>
                <Form.Control
                    type="number"
                    value={tempValue}
                    onChange={handleInputChange}
                    onBlur={handleInputBlur}
                    className="text-right"
                />
            </Col>
            <Col sm={1} className="text-right">
                <span className="text-muted">{unit}</span>
            </Col>
        </Form.Group>
    );
};

export default SettingThreshold;
