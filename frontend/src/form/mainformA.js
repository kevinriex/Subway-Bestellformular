import React, { useState, useEffect } from "react";

function Mainform() {
    const [currentTime, setCurrentTime] = useState(0);
    const [currentascTime, setCurrentascTime] = useState(0);

    // const [subDesTages, setSubDesTages] = useState("");
    // const [salzPfeffer, setSalzPfeffer] = useState("");
    // const [brot, setBrot] = useState("");
    // const [inputs, setInputs] = useState({});

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
            });
    }, []);

    // const handleChange = (event) => {
    //     const name = event.target.name;
    //     const value = event.target.value;
    //     setInputs((values) => ({ ...values, [name]: value }));
    // };
    const [state, setState] = React.useState({
        createdOn: "",
        subDesTages: false,
        salzPfeffer: false,
        sosse: "",
        brot: "",
    });
    function handleChange(evt) {
        const value = evt.target.value;
        setState({
            ...state,
            [evt.target.name]: value,
        });
    }
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
                message: "",
                timestamp: currentTime,
            }),
        })
            .then((response) => response.text())
            .then((response) => {
                alert(response);
            })
            .catch((err) => console.log(err));
    }

    const defaultdata = {
        createdOn: currentascTime,
        subDesTages: false,
        salzPfeffer: false,
        sosse: "",
        brot: "",
    };
    async function handleSubmit(e) {
        e.preventDefault();
        const inputdata = {
            createdOn: e.target.createdOn.value,
            subDesTages: e.target.subDesTages.value,
            salzPfeffer: e.target.salzPfeffer.value,
            sosse: e.target.sosse.value,
            brot: e.target.brot.value,
        };
        let res = await fetch("/pdf", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({
                message: inputdata,
                timestamp: currentTime,
            }),
        })
            .then((response) => response.text())
            .then((response) => {
                alert(response);
            })
            .catch((err) => console.log(err));
    }
    return (
        <form onSubmit={handleSubmit}>
            <p>{currentascTime}</p>
            <input
                type="text"
                className="hidden"
                value={defaultdata.createdOn}
                onChange={handleChange}
                disabled
            ></input>
            <label>
                Sub des Tages:
                <input
                    type="checkbox"
                    onChange={handleChange}
                    name="subDesTages"
                    value={defaultdata.subDesTages}
                ></input>
            </label>
            <br></br>
            <label>
                Salz und Pfeffer:
                <input
                    type="checkbox"
                    onChange={handleChange}
                    name="salzPfeffer"
                    value={defaultdata.salzPfeffer}
                ></input>
            </label>
            <br></br>
            <label>
                Soße:
                <select
                    name="sosse"
                    value={defaultdata.sosse}
                    onChange={handleChange}
                >
                    <option value="Cheesar">Cheesar</option>
                    <option value="Aioli">Aioli</option>
                    <option value="Suesssauer">Süßsauer</option>
                </select>
            </label>
            <br></br>
            <input
                type="text"
                name="brot"
                onChange={handleChange}
                value={defaultdata.brot}
            ></input>
            <br></br>
            <button type="submit">Jetzt Bestellformular drucken!</button>
        </form>
    );
}

export default Mainform;
