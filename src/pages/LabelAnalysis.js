import React, {useEffect} from "react";
import {observer} from "mobx-react";
import {labelStore} from "../stores/LabelStore";
import Loading from "../components/Loading";
import {Button, Card, CardBody, Col, Container} from "react-bootstrap";
import LabelButtonsWrapper from "../components/LabelButtonsWrapper";
import {useNavigate} from "react-router-dom";
import LabelSubmitted from "../components/LabelSubmitted";
import LabelAnalysisDisplay from "../components/LabelAnalysisDisplay";

const LabelAnalysis = observer(() => {
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchData() {
            try {
                await labelStore.analyzeLabel();
            } catch (error) {
                navigate("/Label");
            }
        }

        fetchData();

        return () => {
            labelStore.resetLabelDescription();
        };
    }, [navigate]);

    const generalAnalysis = () => labelStore.labelAnalysis?.chat_response;
    const additives = () => labelStore.labelAnalysis?.harmful_additive_list;

    const handleRegenerateAnalysis = () => labelStore.analyzeLabel();
    const handleAnalyzeAnotherLabel = () => navigate('/Label');

    if (!labelStore.labelAnalysis) {
        return <Loading />;
    }

    return (
        <Container className="mt-4">
            <Card>
                <CardBody>
                    <Col>
                        <h2>Submitted label</h2>
                        <LabelSubmitted image={labelStore.labelImg} text={labelStore.labelText} />
                        <div className="mt-2">
                            <h2>Our analysis</h2>
                            <LabelAnalysisDisplay analysis={generalAnalysis()} additives={additives()} />
                            <LabelButtonsWrapper>
                                <Button onClick={handleRegenerateAnalysis}>
                                    Regenerate analysis
                                </Button>
                                <Button onClick={handleAnalyzeAnotherLabel}>
                                    Analyze another label
                                </Button>
                            </LabelButtonsWrapper>
                        </div>
                    </Col>
                </CardBody>
            </Card>
        </Container>
    );
});

export default LabelAnalysis;
