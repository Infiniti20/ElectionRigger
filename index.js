let fetch = require("node-fetch")
let body = require("./body.js")

let countries = ["Canada", "États-Unis", "Allemagne", "France", "Belgique", "Haiti"]

function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function generateUUID() { // Public Domain/MIT
    var d = new Date().getTime(); //Timestamp
    var d2 = ((typeof performance !== 'undefined') && performance.now && (performance.now() * 1000)) || 0; //Time in microseconds since page-load or 0 if unsupported
    return '-NPtxxxxxxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16; //random number between 0 and 16
        if(d > 0) { //Use timestamp until depleted
            r = (d + r) % 16 | 0;
            d = Math.floor(d / 16);
        } else { //Use microseconds since page-load if supported
            r = (d2 + r) % 16 | 0;
            d2 = Math.floor(d2 / 16);
        }
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
}

async function rig() {
    for(let i = 0; i < 50098; i++) {
        let uuid = (await (await fetch("https://api1.surveylegend.com/responses/id", {
            "headers": {
                "accept": "application/json, text/plain, */*",
                "accept-language": "en-GB,en;q=0.9",
                "sec-fetch-dest": "empty",
                "sec-fetch-mode": "cors",
                "sec-fetch-site": "same-site"
            },
            "referrer": "https://s.surveylegend.com/",
            "referrerPolicy": "strict-origin-when-cross-origin",
            "body": null,
            "method": "POST",
            "mode": "cors",
            "credentials": "omit"
        })).json()).id
        console.log(uuid)
        body.participantId = uuid
        // body.user_id=uuid;
        // body.userId=uuid;
        body.answers[1675021601501].value = countries[randomIntFromInterval(0, 5)]

        let req = await fetch(`https://api1.surveylegend.com/responses/${uuid}`, {
            "headers": {
                "accept": "application/json, text/plain, */*",
                "accept-language": "en-GB,en-US;q=0.9,en;q=0.8",
                "content-type": "application/json;charset=UTF-8",
                "sec-fetch-dest": "empty",
                "sec-fetch-mode": "cors",
                "sec-fetch-site": "same-site",
            },
            "referrer": "https://s.surveylegend.com/",
            "referrerPolicy": "strict-origin-when-cross-origin",
            body: JSON.stringify(body),
            method: "PUT",
        }).catch((error) => {
            console.error("Error:", error);
        });
        console.log(await req.json())
    }
}

rig()

//-NPtMdkdzD1NcPqDm1kX
//1-c24a59905ce89ba09d0183f3c4a60fd1
// {"id":"-NPtMunlYm4bkF6moY-C","rev":"1-a2784677c18633309f1365467a19db5c"}
// {"id":"-NPtN6SGkOpe1x9ix_-C","rev":"1-f4c4a1715728150bb18eff3a51f772f2"}