import React from 'react';
import AchievementWrapper from "./AchievementWrapper";

const AchievementCard = ({ name, level, description }) => {

    const badgePath = () => {
        console.log(`${name} - ${level} - ${description}`);
        const formattedName = name.toLowerCase().replace(/\s+/g, '_');
        const formattedLevel = level.toLowerCase();
        return require(`../assets/achivement-badges/${formattedLevel}_${formattedName}.svg`);
    };

    return (
        <AchievementWrapper>
            <img
                src={badgePath()}
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
