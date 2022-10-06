import "./App.css";
import React, { useState, useEffect } from "react";

function App() {
    const [currentTime, setCurrentTime] = useState(0);
    const [message, setMessage] = useState("");

    useEffect(() => {
        fetch("/time")
            .then((res) => res.json())
            .then((data) => {
                setCurrentTime(data.time);
            });
    }, []);
    async function btnClick(e) {
        e.preventDefault();
        // let res = await fetch("/send", {
        //     method: "POST",
        //     headers:{'content-type': 'application/json'},
        //     body: JSON.stringify({
        //       message: message,
        //       number: "+491746751194",
        //       recipients: [ "+491746751194" ]
        //     })})
        let res = await fetch("/pdf", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({
                message: message,
                timestamp: currentTime,
            })
        })
        alert(`${res.status} ${res.statusText}\n\ ${res.text}`)
    }
    return (
        <div className="App">
            <header className="App-header">
                <h1>It Works!</h1>
                <h2>It's {currentTime}</h2>
                <form onSubmit={btnClick}>
                    <input
                        type="text"
                        onChange={(e) => setMessage(e.target.value)}
                    ></input>
                    <button type="submit">Submit</button>
                </form>
            </header>
        </div>
    );
}

export default App;
