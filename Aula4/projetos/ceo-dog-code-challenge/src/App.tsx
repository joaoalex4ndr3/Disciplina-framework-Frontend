import React from "react";
import "./App.css";
import {SideBar} from "./sideBar/SideBar";
import {BreedInfoContainer} from "./breedInfoContainer/BreedInfoContainer";

function App() {
    return (
        <div className="App">
            <div className="main-container">
                <SideBar/>
                <BreedInfoContainer/>
            </div>
        </div>
    );
}

export default App;