const express = require("express");
const path = require("path");
const hbs = require("hbs")
const app = express();
const bodyParser = require('body-parser');
const request = require("request");
app.use(bodyParser.urlencoded({ extended: false }));
const port=process.env.PORT || 8000;
const temp_path = path.join(__dirname, "../template", "views");
const static_path = path.join(__dirname, "../template/picsandcss");
app.use(express.static(static_path));
app.set("view engine", "hbs");
app.set("views", temp_path);
app.get("/",(req,res)=>{
    res.render("search");
})
app.post("/",(req,res)=>{
    const country=req.body.country;
    request(`https://corona.lmao.ninja/v2/countries/${country}`,(err,resp)=>{
        if(err){
            res.render("404");
        }
        else{
            
            const data=JSON.parse(resp.body);
            console.log(data.cases);
            res.render("home",{
                case:data.cases,
                tcase:data.todayCases,
                death:data.deaths,
                tdeath:data.todayDeaths,
                trecover:data.todayRecovered,
                recover:data.recovered,
                active:data.active,
                critical:data.critical,
                flag:data.countryInfo.flag,
                con:country
            })
        }
    })
})
app.listen(port,()=>{
    console.log(`lisitening azan app..!${port}`);
})
