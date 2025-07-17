import express from "express";
import axios from "axios";
import bodyParser from "body-parser";


const app = express();
const port = 3000;
const myAPI = "your news api key"


const now = new Date();
const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const dayName = dayNames[now.getDay()];
const day = now.getDate();
const monthName = ["January","February","March","April","May","June","July","August","September","October","November","December"];
let month = monthName[now.getMonth()]; 
const year = now.getFullYear();
const formattedDate = `${dayName} ,${day} ${month}`;


app.use(express.static("Public"));

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res)=>{
    res.render("index.ejs");
});

app.post("/submit", async(req, res)=>{
    try{
    const city = req.body.cityname;
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${myAPI}`);
    const result = response.data;

    const weatherIcon = result.weather[0].icon;
    const weather_img = `http://openweathermap.org/img/wn/${weatherIcon}.png`;

    res.render("index.ejs", {
        weatherResult : result,
        date : formattedDate,
        icon : weather_img
    });
}catch(error){
    console.log("Failed to make a request:", error.message);
    res.render("index.ejs", {errorMessage: "OOPS! Location is not valid....!",
        errorMessage2: "Please enter the properlocation name...!"
    });
 }
});


app.listen(port, ()=>{
    console.log(`Successfully running at port ${port}`);
});
