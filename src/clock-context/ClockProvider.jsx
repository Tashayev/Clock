import React, {useEffect, useRef, useState} from 'react';
import { ClockContext } from './ClockContext.jsx';

export const ClockProvider = ({ children }) => {

    const [breakLength, setBreakLength] = useState(5);
    const [sessionLength, setSessionLength] = useState(25);
    const [isSession, setIsSession] = useState(true);
    const [timer, setTimer] = useState(sessionLength * 60);
    const [isPaused, setIsPaused] = useState(false);
    const intervalRef = useRef(null);

    const setTimerBasedOnState = () => {
        const newTimerLength = isSession ? sessionLength : breakLength;
        setTimer(newTimerLength * 60);
    };

    useEffect(() => {
        setTimerBasedOnState();
    }, [sessionLength, breakLength, isSession]);

    useEffect(() => {
        if (timer === 0) {
            // Play notification sound
            const audio = new Audio("https://cdn.freecodecamp.org/testable-projects-fcc/audio/BeepSound.wav");
            audio.play().then(() => {
                console.log("Audio played successfully");
                setIsSession(!isSession);
                setTimerBasedOnState();
            }).catch((error) => {
                console.error("Error playing audio:", error);
                setIsSession(!isSession);
                setTimerBasedOnState();
            });
        }
    }, [timer, sessionLength, breakLength, isSession]);

    const handleReset = () => {
        clearInterval(intervalRef.current);
        setSessionLength(25);
        setTimer(sessionLength * 60);
        setIsSession(true);
        setIsPaused(false);
    };

    const handleStartTimer = () => {
        clearInterval(intervalRef.current);        
        if (!isPaused) {
            intervalRef.current = setInterval(() => {
                setTimer((prevTimer) => Math.max(prevTimer - 1, 0));
            }, 1000);
        }
    };

    const handlePauseTimer = () => {
        clearInterval(intervalRef.current);
        setIsPaused(true);
    };

    const increaseBreakLength = () => {
        setBreakLength(prevBreakLength => Math.min(prevBreakLength + 1, 60));
    };
    const decreaseBreakLength = () => {
        setBreakLength(prevBreakLength => Math.max(prevBreakLength - 1, 1));
    };
    const increaseSessionLength = () => {
        if (isSession) {
            setSessionLength((prevSessionLength) => Math.min(prevSessionLength + 1, 60));
            setTimer((prevTimer) => Math.min(prevTimer + 60, sessionLength * 60));
        } else {
            setSessionLength((prevSessionLength) => Math.min(prevSessionLength + 1, 60));
        }
    };
    const decreaseSessionLength = () => {
        setSessionLength((prevSessionLength) => Math.max(prevSessionLength - 1, 1));

        // Update timer only if in session and timer value exceeds new session length
        if (isSession && timer > sessionLength * 60) {
            setTimer((prevTimer) => Math.max(prevTimer - 60, sessionLength * 60));
        }
    };


    return (
        <ClockContext.Provider
            value={{
                breakLength,
                sessionLength,
                increaseBreakLength,
                decreaseBreakLength,
                increaseSessionLength,
                decreaseSessionLength,
                isSession,
                timer,
                handleReset,
                handleStartTimer,
                handlePauseTimer,
            }}
        >
            {children}
        </ClockContext.Provider>
    );
};
