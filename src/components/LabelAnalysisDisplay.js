import React from "react";
import {Row, Col} from "react-bootstrap";
import LabelAnalysisTextField from "./LabelAnalysisTextField";
import LabelAnalysisBooleanField from "./LabelAnalysisBooleanField";
import LabelAnalysisTableField from "./LabelAnalysisTableField";

const LabelAnalysisDisplay = ({ analysis, additives }) => {
    return (
        <div>
            <Row className="mb-4">
                <Col >
                    <LabelAnalysisTextField
                        title="Harmful Ingredients"
                        value={analysis?.harmful_ingredients}
                    />
                    <LabelAnalysisTextField
                        title="Harmful Ingredients in Excess"
                        value={analysis?.harmful_in_excess}
                    />
                    <LabelAnalysisTextField
                        title="Allergens"
                        value={analysis?.allergens}
                    />
                    <LabelAnalysisTextField
                        title="Food Additives"
                        value={analysis?.food_additives}
                    />
                </Col>
            </Row>

            <Row className="mb-4">
                <Col>
                    <LabelAnalysisBooleanField
                        title="Highly Processed"
                        value={analysis?.is_highly_processed}
                    />
                </Col>
                <Col>
                    <LabelAnalysisBooleanField
                        title="Contains Gluten"
                        value={analysis?.contains_gluten}
                    />
                </Col>
                <Col>
                    <LabelAnalysisBooleanField
                        title="Vegan"
                        value={analysis?.is_vegan}
                    />
                </Col>
                <Col>
                    <LabelAnalysisBooleanField
                        title="Vegetarian"
                        value={analysis?.is_vegetarian}
                    />
                </Col>
            </Row>

            <div className="mt-3">
                <LabelAnalysisTableField additives={additives} />
            </div>
        </div>
    );
};

export default LabelAnalysisDisplay;
