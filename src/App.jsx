import React from 'react';
import './App.css';
import { ClockProvider} from "./clock-context/ClockProvider.jsx";
import TimeSetter from "./components/TimeSetter.jsx";
import Timer from "./components/Timer.jsx";

function App() {
    return (
        <ClockProvider>
            <div id="app">
                <div>
                    <div className='main-title'>25 + 5 Clock</div>
                    <TimeSetter/>
                    <Timer/>
                    <div className="author">
                        Designed and Coded by
                        <br/>
                        <a href="https://www.freecodecamp.org/Tashaev" target="_blank">Adil Tashayev</a>
                    </div>
                </div>
            </div>
        </ClockProvider>
    );
}

export default App;



