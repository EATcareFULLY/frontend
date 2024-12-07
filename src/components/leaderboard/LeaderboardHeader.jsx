import LeaderboardCell from "./LeaderboardCell";

const LeaderboardHeader = () => {
    return (
        <div className="d-flex align-items-center p-3 fw-bold text-muted text-center">
            <LeaderboardCell width="20%">#</LeaderboardCell>
            <LeaderboardCell width="55%" className="text-left">Username</LeaderboardCell>
            <LeaderboardCell width="25%">Points</LeaderboardCell>
        </div>
    );
};

export default LeaderboardHeader;
