import React from "react";
import { Table } from "react-bootstrap";

const LabelAnalysisTableField = ({ additives }) => {

    const renderAdditives = () => {
        if (!additives || additives.length === 0) {
            return <p>No harmful additives found.</p>;
        }

        return(
            <div>
                <Table bordered striped>
                    <thead className="table-primary text-white">
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

    return (
        <div>
            <h5 className="mb-2">Harmful additives details</h5>
            {renderAdditives()}
        </div>
    );
};

export default LabelAnalysisTableField;
