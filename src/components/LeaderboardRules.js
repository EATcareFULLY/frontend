import { useState } from "react";
import { Collapse } from "react-bootstrap";
import { FaChevronDown, FaChevronRight } from "react-icons/fa";

const LeaderboardRules = () => {
    const [open, setOpen] = useState(false);

    return (
        <div className="mt-4 text-center">
            <div
                onClick={() => setOpen(!open)}
                aria-controls="leaderboard-rules"
                aria-expanded={open}
                className="d-flex align-items-center justify-content-center cursor-pointer"
                style={{ cursor: "pointer" }}
            >
                <p className="mb-0 "><strong>Leaderboard Rules and Scoring</strong></p>
                <span className="ms-2">
                    {open ? <FaChevronDown /> : <FaChevronRight />}
                </span>
            </div>
            <Collapse in={open}>
                <div id="leaderboard-rules" className="p-3 mt-2">
                    <strong>Points for products:</strong>
                    <br />
                    Nutri-Score A: 100 points<br />
                    Nutri-Score B: 80 points<br />
                    Nutri-Score C: 50 points<br />
                    Nutri-Score D: 30 points<br />
                    Nutri-Score E: 10 points<br />
                    Nutri-Score ?: 10 points<br />

                    <strong>Leaderboard reset:</strong>
                    <br />
                    The leaderboard resets every Monday at 12:00 AM.
                    <br />

                    <strong>Weekly scoring limitation:</strong>
                    <br />
                    Points for a specific product can only be earned once per week.

                    <p className="text-muted mb-0">Good luck and enjoy the challenge!</p>
                </div>
            </Collapse>
        </div>
    );
};

export default LeaderboardRules;
