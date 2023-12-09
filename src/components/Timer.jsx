import React, { useContext, useState, useEffect } from 'react';
import { faArrowsRotate, faPause, faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ClockContext } from "../clock-context/ClockContext.jsx";

const Timer = () => {
    const [lastMinute, setLastMinute] = useState("");
    const { isSession, timer, handleReset, handleStartTimer, handlePauseTimer } = useContext(ClockContext);

    const minutes = Math.floor(timer / 60);
    const seconds = timer % 60;

    useEffect(()=>{
        minutes < 1 ? setLastMinute("red") : setLastMinute("white");
    },[minutes])

    return (
        <>
            <div className="timer">
                <div className="timer-wrapper">
                    <div className="timer-label" style={{ color: `${lastMinute}` }}>
                        {isSession ? "Session" : "Break"}
                    </div>
                    <div className="timer-left" style={{ color: `${lastMinute}` }}>
                        {minutes.toString().padStart(2, "0")}:{seconds.toString().padStart(2, "0")}
                    </div>
                </div>
            </div>
            <div className="timer-control">
                <button onClick={handleStartTimer}>
                    <FontAwesomeIcon icon={faPlay} />
                </button>
                <button onClick={handlePauseTimer}>
                    <FontAwesomeIcon icon={faPause} />
                </button>
                <button onClick={handleReset}>
                    <FontAwesomeIcon icon={faArrowsRotate} />
                </button>
            </div>
        </>
    );
};

export default Timer;
