import React from "react";
import { Table } from "react-bootstrap";

const LabelAnalysisHarmfulAdditivesTable = ({ title, additives }) => {
    if (!additives || additives.length === 0) {
        return <p>No harmful additives found.</p>;
    }

    return (
        <div>
            <Table striped bordered hover responsive>
                <thead>
                <tr>
                    <th>Code</th>
                    <th>Name</th>
                    <th>Description</th>
                </tr>
                </thead>
                <tbody>
                {additives.map((additive, index) => (
                    <tr key={index}>
                        <td>{additive.code}</td>
                        <td>{additive.name}</td>
                        <td>{additive.desc}</td>
                    </tr>
                ))}
                </tbody>
            </Table>
        </div>

    );
};

export default LabelAnalysisHarmfulAdditivesTable;
