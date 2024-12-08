import React from 'react';
import {Button} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import { FaHome } from "react-icons/fa";
import logo from "../assets/logos/logo-full.svg";

const PageNotFound = () => {

    const navigate = useNavigate();

    const handleHome = () => {
        navigate("/");
    }

    return (
        <div className="container mt-5">
            <div className=" mt-3 d-flex align-items-center justify-content-center">
                <img src={logo} width="150" alt="EATcareFULLY-logo"/>
            </div>
            <div className="mt-3 text-center">
                <h2>Page Not Found</h2>
                <p>Sorry, the page you are looking for does not exist.</p>
            </div>
            <div className="d-flex align-items-center justify-content-center">
                <Button
                    className="mt-3 d-flex align-items-center justify-content-center gap-2"
                    onClick={handleHome}
                    data-testid="home-button"
                >
                    <span>Take me home</span>
                    <FaHome size={20}/>
                </Button>
            </div>
        </div>
    );
};

export default PageNotFound;
