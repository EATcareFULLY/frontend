import React, { useState } from "react";
import {Button, FormControl, InputGroup} from "react-bootstrap";
import {Search, X} from "react-bootstrap-icons";
import {errorToast} from "../../utils/Toasts";

const LeaderboardSearchBar = ({ initialUsername, onSearch, onReset }) => {
    const [input, setInput] = useState("");
    const [currentUsername, setCurrentUsername] = useState(initialUsername);

    const handleSearch = async () => {
        const newUsername = input.trim();

        if (validateUsername(newUsername)) {
            try {
                await onSearch(newUsername);
                setCurrentUsername(newUsername);
                setInput("");
            } catch (error) {
                console.error("Error during search:", error);
            }

        } else {
            errorToast("Invalid username format.");
        }
    };

    const handleReset = () => {
        setCurrentUsername(initialUsername);
        onReset();
    }

    const validateUsername = (username) => {
        const forbiddenPattern = /[`<>${} ]/;

        if (!username || forbiddenPattern.test(username)) {
            return false;
        }

        return true;
    };


    return (
        <div>
            <InputGroup className="my-3">
                <FormControl
                    type="text"
                    placeholder="Search for a username..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                />
                <Button onClick={handleSearch}>
                    <Search/>
                </Button>
            </InputGroup>
            {currentUsername !== initialUsername &&
                <div className="d-flex align-items-center justify-content-center ">
                    <p className="mb-0">Leaderboard displayed for: <strong>{currentUsername}</strong></p>
                    <X color="red" size={24} style={{cursor: "pointer"}} onClick={handleReset} data-testid="resetButton" />
                </div>
            }
        </div>
    );
};

export default LeaderboardSearchBar;
