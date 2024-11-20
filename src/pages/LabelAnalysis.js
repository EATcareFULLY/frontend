import React from "react";
import {observer} from "mobx-react";
import {labelStore} from "../stores/LabelStore";
import Loading from "../components/Loading";
import {Button, Card, CardBody, Container} from "react-bootstrap";
import LabelButtonsWrapper from "../components/LabelButtonsWrapper";
import {useNavigate} from "react-router-dom";

const LabelAnalysis = observer(() => {
    const navigate = useNavigate();

    if (labelStore.labelDescription === '') {
        return (
            <Loading />
        );
    }

    const handleRegenerateAnalysis = () => labelStore.analyzeLabelFromImage();

    const handleAnalyzeAnotherLabel = () => navigate('/Label');

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
                            <p>{labelStore.labelDescription}</p>
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
