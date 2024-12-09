import {BsThreeDots} from "react-icons/bs";

const LeaderboardDivider = () => {
    return (
        <div className="d-flex align-content-center justify-content-center p-2 w-100">
            <BsThreeDots size={32} color="grey darken-2" data-testid="divider-icon"/>
        </div>
    );
};

export default LeaderboardDivider;
