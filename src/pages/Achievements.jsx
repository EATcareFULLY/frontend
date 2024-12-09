import React, { useEffect } from 'react';
import { observer } from "mobx-react-lite";
import { Container, Row, ProgressBar } from "react-bootstrap";
import { achievementsStore } from '../stores/AchievementsStore';
import AchievementCard from "../components/achievements/AchievementCard";
import AchievementLockedCard from "../components/achievements/AchievementLockedCard";
import Loading from "../components/layout/Loading";

const Achievements = observer(() => {
    useEffect(() => {
        async function fetchData() {
            await achievementsStore.fetchAchievements();
            achievementsStore.sortAchievements();
        }

        fetchData();
    }, []);

    if (!achievementsStore.achievements) {
        return <Loading />;
    }

    //TODO unhardcode ???

    return (
        <Container>
            <h2>Achievements</h2>
            <ProgressBar
                now={achievementsStore.achievementsCompletedProcentage()}
                label={`${achievementsStore.achievementsCompletedProcentage()}%`}
                className="mb-3 font-bold mx-auto w-75"
                style={{ height: '2rem' }}
            />
            <Row>
                {achievementsStore.achievements.map((achievement, index) => (
                    achievement.level === "NONE" || achievement.achievementName==="???"
                        ? <AchievementLockedCard key={index} />
                        : <AchievementCard
                            key={index}
                            name={achievement.achievementName}
                            level={achievement.level}
                            description={achievement.achievementDescription}
                        />
                ))}
            </Row>
        </Container>
    );
});

export default Achievements;
