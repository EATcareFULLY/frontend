import LeaderboardCell from "./LeaderboardCell";

const LeaderboardRow = ({ position, username, score, isCurrentUser }) => {
    const getBackgroundColor = () => {
        switch (position) {
            case 1: return "bg-gold";
            case 2: return "bg-silver";
            case 3: return "bg-bronze";
            default: return isCurrentUser ? "bg-primary-subtle" : "";
        }
    };

    return (
        <div
            className={`d-flex align-items-center p-3 rounded border-bottom text-center ${getBackgroundColor()} ${
                isCurrentUser ? "font-bold" : ""
            }`}
        >
            <LeaderboardCell width="20%">{position}.</LeaderboardCell>
            <LeaderboardCell width="55%" className="text-left">{username}</LeaderboardCell>
            <LeaderboardCell width="25%">{score}</LeaderboardCell>
        </div>
    );
};

export default LeaderboardRow;
