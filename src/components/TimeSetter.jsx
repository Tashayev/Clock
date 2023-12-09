import React, {useContext} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowDown, faArrowUp} from "@fortawesome/free-solid-svg-icons";
import {ClockContext} from "../clock-context/ClockContext.jsx";

const TimeSetter = () => {
    const {
        breakLength,
        sessionLength,
        increaseBreakLength,
        decreaseBreakLength,
        increaseSessionLength,
        decreaseSessionLength,
    } = useContext(ClockContext);
    return (
        <>
            <div className="length-control">
                <div id='break-label'>Break Length:</div>
                <button id="break-decrement" className="btn-level" onClick={decreaseBreakLength}>
                    <FontAwesomeIcon icon={faArrowDown} />
                </button>
                <p className="btn-level">{breakLength}</p>
                <button id="breack-increment" className="btn-level" onClick={increaseBreakLength}>
                    <FontAwesomeIcon icon={faArrowUp} />
                </button>
            </div>
            <div className="length-control">
                <div id="session-label">Session Length:</div>
                <button id="session-decrement" className="btn-level" onClick={decreaseSessionLength}>
                    <FontAwesomeIcon icon={faArrowDown} />
                </button>
                <p className="btn-level">{sessionLength}</p>
                <button id="session-increment" className="btn-level" onClick={increaseSessionLength}>
                    <FontAwesomeIcon icon={faArrowUp} />
                </button>
            </div>
        </>
    );
};

export default TimeSetter;