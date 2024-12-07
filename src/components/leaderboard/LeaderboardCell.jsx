const LeaderboardCell = ({ children, width, className }) => {
    return (
        <div className={`${className}`} style={{ width }}>
            {children}
        </div>
    );
};

export default LeaderboardCell;
