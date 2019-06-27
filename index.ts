import express from "express"
import ical from "node-ical"
import axios from 'axios'
import icalGenerator from 'ical-generator'
import calendars from "./calendars.json"

const app = express()
const port = process.env.PORT || 3000

app.get("/", async (_req, res) => {
    const cal = icalGenerator({
        prodId: {
            company: 'Airbnb Inc',
            product: 'Hosting Calendar 0.8.8',
            language: 'EN'
        }
    })

    for (const calendar in calendars) {
        const resp = await axios.get(calendar)
        ical.parseICS(resp.data, function (err, data) {
            if (err) console.log(err)
            for (const key in data) {
                if (key === 'prodid') continue
                if (data.hasOwnProperty(key) && data[key].summary !== 'Airbnb (Not available)') {
                    cal.createEvent(data[key])
                }
            }

        });
    }

    res.send(cal.toString())
});

// start the Express server
app.listen(port, () => {
    console.log(`server started at http://localhost:${port}`)
});
