import React from 'react';
import AchievementWrapper from "./AchievementWrapper";
import locked from '../assets/achivement-badges/locked.svg'

const AchievementLockedCard = () => {

    return (
        <AchievementWrapper>
            <img
                src={locked}
                alt="locked"
                className="mb-2"
            />
            <h2 >Locked</h2>
            <p className="mb-0">Progress further to uncover this achievement.</p>
        </AchievementWrapper>
    );
};

export default AchievementLockedCard;
