fetch('./data.json')
    .then(res=>res.json())
    .then(obj=>{
        console.log(obj)
        let arr = [];
        for(let key in obj.matchesPlayedPerYear){
            arr.push([key,obj.matchesPlayedPerYear[key]])
        }
        plotGraph('Matches played per year',"years",'container',arr)

        arr = [];
        for(let key in obj.matchesWonByEachTeam){
            arr.push([key,obj.matchesWonByEachTeam[key]])
        }
        plotGraph('matches won by each team',"teams",'container1',arr)

        arr = [];
        for(let key in obj.extraRunsConcededByEachTeam){
            arr.push([key,obj.extraRunsConcededByEachTeam[key]])
        }
        plotGraph('extra runs conceded by each team in year 2016',"teams",'container2',arr)

        arr = [];
        for(let key in obj.economicalBowlers){
            arr.push([key,obj.economicalBowlers[key].economuRate])
        }
        arr = arr.sort((a,b)=>a[1]-b[1]).slice(0,11);
        plotGraph('top 10 economical bowlers along with their economy rates in year 2015',"bowlers",'container3',arr)
    })

    function plotGraph(title,name,id,seriesData){
        Highcharts.chart(id, {
            chart: {
                type: 'column'
            },
            title: {
                text: title
            },
            xAxis: {
                type:'category'
            },
            yAxis: {
                min:0.00,
                title: {
                    text: 'Matches'
                }
            },
            series: [{
                name: name,
                data: seriesData
            }]
        });
    }
