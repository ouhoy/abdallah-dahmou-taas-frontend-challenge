import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { config } from 'dotenv';
config();
const app = express();

app.use(cors());
app.use(bodyParser.json());

app.get("/getAccessToken", async (req, res) => {

    const code = req.query.code;

    const params = `?client_id=${process.env.CLIENT_ID}&client_secret=${process.env.CLIENT_SECRET}&code=${code}`;


    try {
        const response = await fetch(`https://github.com/login/oauth/access_token${params}`, {
            method: "POST",
            headers: {
                "Accept": "application/json",
            },
        });

        if (!response.ok) return console.error("Data failed fetching, please check credentials!")

        const data = await response.json();
        res.json(data);

    } catch (error) {
        console.log(`Error while fetching: ${error}`)
    }
});


app.listen(4000, function () {
    console.log("Server running on port 4000...")
})