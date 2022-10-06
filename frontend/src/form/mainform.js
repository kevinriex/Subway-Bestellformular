import React, { useState, useEffect } from "react";

function Mainform() {
    const [currentTime, setCurrentTime] = useState(0);
    const [currentascTime, setCurrentascTime] = useState(0);

    const [createdOn, setCreatedOn] = useState("");
    const [subDesTages, setSubDesTages] = useState(false);
    const [salzPfeffer, setSalzPfeffer] = useState(false);
    const [sosse, setSosse] = useState("");
    const [brot, setBrot] = useState("");
    const [sub, setSub] = useState();

    useEffect(() => {
        fetch("/time")
            .then((res) => res.json())
            .then((data) => {
                setCurrentTime(data.time);
            });
    }, []);
    useEffect(() => {
        fetch("/asctime")
            .then((res) => res.json())
            .then((data) => {
                setCurrentascTime(data.time);
                setCreatedOn(data.time);
            });
    }, []);

    async function sendData(data) {
        let res = await fetch("/pdf", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({
                message: data,
                timestamp: currentTime,
            }),
        })
            .then((response) => response.text())
            .then((response) => {
                alert(response);
            })
            .catch((err) => console.log(err));
    }
    async function handleSubmit(e) {
        const data = {
            createdOn: createdOn,
            subDesTages: subDesTages,
            salzPfeffer: salzPfeffer,
            sosse: sosse ?? "///",
            brot: brot,
            sub: sub,
        };
        sendData(data);
    }
    function handleChange(e) {
        switch (e.target.name) {
            case "salzPfeffer":
                setSalzPfeffer(!salzPfeffer);
                break;
            case "subDesTages":
                setSubDesTages(!subDesTages);
                break;
            case "sosse":
                setSosse(e.target.value);
                break;
            case "brot":
                setBrot(e.target.value);
                break;
            case "sub":
                setSub(e.target.value);
                break;
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <p>{currentascTime}</p>
            <input
                type="text"
                className="hidden"
                value={createdOn}
                onChange={handleChange}
                disabled
            ></input>
            <label>
                Sub des Tages:
                <input
                    type="checkbox"
                    onChange={handleChange}
                    name="subDesTages"
                    checked={subDesTages}
                ></input>
            </label>
            <br></br>
            <label>
                Salz und Pfeffer:
                <input
                    type="checkbox"
                    onChange={handleChange}
                    name="salzPfeffer"
                    checked={salzPfeffer}
                ></input>
            </label>
            <br></br>
            <label>
                Sub:
                <select name="sub" value={sub} onChange={handleChange} required>
                    <option value=""></option>
                    <option value="Italian BMT">Italian BMT</option>
                    <option value="Salami">Salami</option>
                    <option value="Vegan Patty">Vegan Patty</option>
                </select>
            </label>
            <br></br>
            <label>
                Brot:
                <select
                    name="brot"
                    value={brot}
                    onChange={handleChange}
                    required
                >
                    <option value=""></option>
                    <option value="Cheese-Oregano">Cheese-Oregano</option>
                    <option value="Italian">Italian</option>
                    <option value="Glutenfrei">Glutenfrei</option>
                </select>
            </label>
            <br></br>
            <label>
                Soße:
                <select
                    name="sosse"
                    value={sosse}
                    onChange={handleChange}
                    required
                >
                    <option value=""></option>
                    <option value="Cheesar">Cheesar</option>
                    <option value="Aioli">Aioli</option>
                    <option value="Suesssauer">Süßsauer</option>
                </select>
            </label>
            {/* <br></br>
            <input
                type="text"
                name="brot"
                onChange={handleChange}
                value={brot || ""}
            ></input>*/}
            <br></br>
            <button type="submit">Jetzt Bestellformular drucken!</button>
        </form>
    );
}

export default Mainform;
