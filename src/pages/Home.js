import React from "react";
import {Container, Row, Col, Card, Button} from 'react-bootstrap';
import { useKeycloak } from "@react-keycloak/web";
import {errorToast} from "../utils/Toasts";
import Loading from "../components/Loading";
import {APP_URLS} from "../utils/URLS";
import "./Home.css";
import HomeCard from "../components/HomeCard";

//TODO refactor home i refactor require auth wraz z app

function Home() {

    const { keycloak, initialized } = useKeycloak();


    const handleSignIn = () => {
        if (initialized && !keycloak.authenticated) {

            keycloak.login({
                redirectUri: APP_URLS.home
            });
        }
        else {
            errorToast("Error occured, please try again later.")
        }
    };

    if(!initialized) {
        return <Loading/>;
    }

    return (
        <div className="home-bg">
            <video autoPlay muted loop id="bg-video">
                <source src="https://videos.pexels.com/video-files/3209239/3209239-uhd_2560_1440_25fps.mp4" type="video/mp4" />
            </video>
            <Container className="text-center text-white content-container">
                <Row className="justify-content-md-center align-items-center min-vh-100">
                    <Col md="8">
                        {keycloak.authenticated ? (
                            <>
                                <HomeCard
                                    title={`Welcome, ${keycloak.tokenParsed?.preferred_username}!`}
                                    body="We're glad to have you here at EATcareFULLY."
                                />
                            </>
                        ) : (
                            <>
                                <HomeCard
                                    title="Welcome to EATcareFULLY!"
                                    body="Discover a new way to manage your dietary habits and stay healthy. Our application helps you keep track of your meals, provides nutritional insights, and guides you towards a balanced diet. Whether you want to lose weight, gain muscle, or simply eat healthier, EATcareFULLY is your perfect companion on the journey to a better you."
                                />
                                <Button className="btn-lg mt-5 w-100" onClick={handleSignIn}>
                                    Sign in
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
