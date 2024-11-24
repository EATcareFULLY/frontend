import React from "react";
import { Form, Row, Col } from "react-bootstrap";
import { settingsStore } from "../stores/SettingsStore";

const SettingThreshold = ({ name, onUpdate }) => {
    const handleChange = (event) => {
        const newValue = parseInt(event.target.value, 10);
        onUpdate(name, newValue);
    };

    const [minValue, maxValue] = settingsStore.getDynamicRangeForNutrient(name);

    return (
        <Form.Group as={Row} className="align-items-center mb-3">
            <Col sm={7} className="text-left">
                <Form.Label>{name}</Form.Label>
            </Col>
            <Col sm={4}>
                <Form.Range
                    value={settingsStore.getThreshold(name)}
                    onChange={handleChange}
                    min={minValue}
                    max={maxValue}
                />
            </Col>
            <Col sm={1} className="text-center">
                <span className="text-muted">{settingsStore.getThreshold(name)}</span>
            </Col>
        </Form.Group>
    );
};

export default SettingThreshold;
