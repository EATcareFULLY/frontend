import React from "react";
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useKeycloak } from "@react-keycloak/web";
import { errorToast } from "../utils/Toasts";
import Loading from "../components/Loading";
import { APP_URLS } from "../utils/URLS";
import HomeCard from "../components/HomeCard";
import videoBg from "../assets/video-home.mp4";


function Home() {

    const { keycloak, initialized } = useKeycloak();

    const handleSignIn = () => {
        if (initialized && !keycloak.authenticated) {
            keycloak.login({
                redirectUri: APP_URLS.home
            });
        } else {
            errorToast("Error occured, please try again later.")
        }
    };

    const displayMessage = () => {
        return welcomeMessages[Math.floor(Math.random() * welcomeMessages.length)];
    }

    const welcomeMessages = [
        "We're glad to have you here at EATcareFULLY.",
        "Your health is in your hands. We're here to help.",
        "Take control of your health, one bite at a time.",
        "Fuel your body, nourish your mind.",
        "Eat well, live well.",
        "Empower yourself with healthy choices.",
        "Together, we can make a difference."
    ]

    if (!initialized) {
        return <Loading />;
    }

    return (
        <div style={{ position: "relative" }}>
            <video autoPlay muted loop style={{
                position: "fixed",
                right: "0",
                bottom: "0",
                minWidth: "100%",
                minHeight: "100%",
                zIndex: "-2",
                objectFit: "cover"
            }}>
                <source src={videoBg} type="video/mp4" />
            </video>

            <div style={{
                position: "fixed",
                top: "0",
                left: "0",
                width: "100%",
                height: "100%",
                backgroundColor: "rgba(0, 0, 0, 0.3)",
                zIndex: "-1"
            }}></div>

            <Container style={{ position: "relative", zIndex: "1" }} className="text-center text-white">
                <Row className="justify-content-md-center align-items-center min-vh-100">
                    <Col md="8">
                        {keycloak.authenticated ? (
                            <HomeCard
                                title={`Welcome, ${keycloak.tokenParsed?.preferred_username}!`}
                                body={displayMessage()}
                            />
                        ) : (
                            <>
                                <HomeCard
                                    title="Welcome to EATcareFULLY!"
                                    body="Discover a new way to manage your dietary habits and stay healthy. Our application helps you keep track of your meals, provides nutritional insights, and guides you towards a balanced diet. Whether you want to lose weight, gain muscle, or simply eat healthier, EATcareFULLY is your perfect companion on the journey to a better you."
                                />
                                <Button className="btn-lg mt-3 w-75" onClick={handleSignIn}>
                                    Get started
                                </Button>
                            </>
                        )}
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default Home;
