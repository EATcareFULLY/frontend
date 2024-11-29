import React, {useEffect} from "react";
import {observer} from "mobx-react";
import {labelStore} from "../stores/LabelStore";
import Loading from "../components/Loading";
import {Button, Card, CardBody, Container} from "react-bootstrap";
import LabelButtonsWrapper from "../components/LabelButtonsWrapper";
import {useNavigate} from "react-router-dom";
import LabelAnalysisTextField from "../components/LabelAnalysisTextField";
import LabelAnalysisBooleanField from "../components/LabelAnalysisBooleanField";
import LabelAnalysisTableField from "../components/LabelAnalysisTableField";

const LabelAnalysis = observer(() => {
    useEffect(() => {
        async function fetchData() {
            await labelStore.analyzeLabel();
        }

        fetchData();

        return () => {
            labelStore.resetLabelDescription();
        };
    }, []);

    const navigate = useNavigate();

    const generalAnalysis = () => {
        if(labelStore.labelAnalysis) {
            console.log("label", labelStore.labelAnalysis);
            return labelStore.labelAnalysis.chat_response;
        }
    }

    const additives = () => {
        if(labelStore.labelAnalysis) {
            return labelStore.labelAnalysis.harmful_additive_list;
        }
    }

    const handleRegenerateAnalysis = () => labelStore.analyzeLabel();

    const handleAnalyzeAnotherLabel = () => navigate('/Label');

    if (!labelStore.labelAnalysis) {
        return (
            <Loading />
        );
    }

    return (
        <Container className="mt-4">
            <Card>
                <CardBody>
                    <div className="row">
                        <div className="col-md-6 d-flex justify-content-center align-items-center">
                            <div className="bg-black rounded h-100 w-100 d-flex justify-content-center align-items-center">
                                <img src={labelStore.labelImg} alt="Label" className="img-fluid"/>
                            </div>
                        </div>
                        <div className="col-md-6 mt-2 text-center">
                            <h2>Our analysis</h2>
                            <LabelAnalysisTextField title={"Harmful ingridients"} value={generalAnalysis().harmful_ingredients}/>
                            <LabelAnalysisTextField title={"Harmful ingridients in excess"} value={generalAnalysis().harmful_in_excess}/>
                            <LabelAnalysisTextField title={"Allergens"} value={generalAnalysis().allergens}/>
                            <LabelAnalysisTextField title={"Food additives"} value={generalAnalysis().food_additives}/>
                            <LabelAnalysisBooleanField title={"Highly processed"} value={generalAnalysis().is_highly_processed}/>
                            <LabelAnalysisBooleanField title={"Contains gluten"} value={generalAnalysis().contains_gluten}/>
                            <LabelAnalysisBooleanField title={"Vegan"} value={generalAnalysis().is_vegan}/>
                            <LabelAnalysisBooleanField title={"Vegetarian"} value={generalAnalysis().is_vegetarian}/>
                            <LabelAnalysisTableField  additives={additives()}/>
                            <LabelButtonsWrapper>
                                <Button onClick={handleRegenerateAnalysis}>
                                    Regenerate analysis
                                </Button>
                                <Button onClick={handleAnalyzeAnotherLabel}>
                                    Analyze another label
                                </Button>
                            </LabelButtonsWrapper>
                        </div>
                    </div>
                </CardBody>
            </Card>
        </Container>
    );
});

export default LabelAnalysis;
