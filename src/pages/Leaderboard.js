import { useEffect } from "react";
import { observer } from "mobx-react";
import { useKeycloak } from "@react-keycloak/web";
import {Container} from "react-bootstrap";
import LeaderboardHeader from "../components/LeaderboardHeader";
import LeaderboardRow from "../components/LeaderboardRow";
import Divider from "../components/LeaderboardDivider";
import Loading from "../components/Loading";
import { leaderboardStore } from "../stores/LeaderboardStore";
import LeaderboardSearchBar from "../components/LeaderboardSearchBar";
import LeaderboardRules from "../components/LeaderboardRules";

const Leaderboard = observer(() => {
    useEffect(() => {
        async function fetchData() {
            await leaderboardStore.fetchUsersLeaderboard();
        }
        fetchData();
    }, []);

    const { keycloak } = useKeycloak();

    const handleSearch = async (username) => {

        await leaderboardStore.fetchAnotherUsersLeaderboard(username);

    };

    const handleReset = async () => {
        await leaderboardStore.fetchUsersLeaderboard();
    };

    if (!leaderboardStore.totalPositions) {
        return <Loading />;
    }

    return (
        <Container className="mt-2">
            <h2>Leaderboard</h2>

            <LeaderboardSearchBar initialUsername={keycloak.tokenParsed?.preferred_username} onSearch={handleSearch} onReset={handleReset} />

            <section className="mb-5">
                <LeaderboardHeader />
                <div className="gap-2">
                    <div>
                        {leaderboardStore.topPositions.map((user) => (
                            <LeaderboardRow
                                key={user.position}
                                position={user.position}
                                username={user.username}
                                score={user.points}
                                isCurrentUser={
                                    user.position === leaderboardStore.userPosition
                                }
                            />
                        ))}
                    </div>
                    {leaderboardStore.totalPositions > 2 &&
                        leaderboardStore.userContext.length > 0 &&
                        leaderboardStore.userContext[0].position !== 4 && <Divider />}
                    <div className="border-top">
                        {leaderboardStore.userContext.length > 0 &&
                            leaderboardStore.userContext.map((user) => (
                                <LeaderboardRow
                                    key={user.position}
                                    position={user.position}
                                    username={user.username}
                                    score={user.points}
                                    isCurrentUser={
                                        user.position === leaderboardStore.userPosition
                                    }
                                />
                            ))}
                    </div>
                    {((leaderboardStore.totalPositions > 12 && leaderboardStore.totalPositions>leaderboardStore.userPosition+4) ||
                        (leaderboardStore.totalPositions > 10 && leaderboardStore.userPosition<9))
                        &&
                        <Divider />}
                </div>
            </section>
            <div>
                <p>Number of people in leaderboard: <strong>{leaderboardStore.totalPositions}</strong></p>
                <LeaderboardRules />
            </div>
        </Container>
    );
});

export default Leaderboard;
