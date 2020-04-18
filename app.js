const express = require('express')
const path = require('path');
const fs = require('fs')

const matchesPlayedPerYear = require('./utility/matchesPlayedPerYear')
const matchesWonByEachTeam = require('./utility/matchesWonByEachTeam')
const extraRunsConcededByEachTeam = require('./utility/extraRunsConcededByEachTeam')
const economicalBowlers = require('./utility/economicalBowlers')
const csvtojsonConverter  = require('./utility/csvtojsonConverter')

const app = express();
const PORT = process.env.PORT || 3001

async function getData(){
    const matches = await csvtojsonConverter('matches.csv');
    const deliveries = await csvtojsonConverter('deliveries.csv');
    fs.writeFile(path.join(__dirname,'./public/data.json'),JSON.stringify({
        matchesPlayedPerYear:matchesPlayedPerYear(matches),
        matchesWonByEachTeam:matchesWonByEachTeam(matches),
        extraRunsConcededByEachTeam:extraRunsConcededByEachTeam(deliveries,matches),
        economicalBowlers:economicalBowlers(deliveries,matches)
    }),'utf8',err=>{
        if(err){
            console.log(err)
        }
    })
}

getData()

app.use(express.static(path.join(__dirname,'./public')))

app.listen(PORT,()=>console.log(`listning at ${PORT}`))