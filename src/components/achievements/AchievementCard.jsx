import React from 'react';
import AchievementWrapper from "./AchievementWrapper";
import {achievementBadgePath} from "../../utils/ImagePaths";

const AchievementCard = ({ name, level, description }) => {

    return (
        <AchievementWrapper>
            <img
                src={achievementBadgePath(name, level)}
                alt={`${name} - ${level}`}
                className="mb-2"
            />
            <h3>{name}</h3>
            <h4>{level}</h4>
            <p className=" mb-0">{description}</p>
        </AchievementWrapper>
    );
};

export default AchievementCard;
