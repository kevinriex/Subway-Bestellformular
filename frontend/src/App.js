import "./App.css";
import React, { useState, useEffect } from "react";
import Mainform from "./form/mainform";

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <h1>Subway Bestellformular</h1>
                <h2>Eine Entwicklung von Kevin Riexinger</h2>
                <Mainform></Mainform>
            </header>
        </div>
    );
}

export default App;
