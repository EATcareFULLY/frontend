import React from "react";

const LabelSubmitted = ({ image, text }) => {

    return (
        <div>
            {image ? (
                <div className="d-flex justify-content-center align-items-center">
                    <div className="bg-black rounded h-100 w-100 d-flex justify-content-center align-items-center">
                        <img src={image} alt="Label" className="img-fluid" />
                    </div>
                </div>
            ) : text ? (
                <div className="mt-2">
                    <p className="p-4 text-muted bg-primary-subtle rounded border">{text}</p>
                </div>
            ) : (
                <p>No label submitted - try reloading page.</p>
            )}
        </div>
    );
};

export default LabelSubmitted;
