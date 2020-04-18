function matchesWonByEachTeam(matches){
    const result = {}
    for(let match of matches){
        if(result[match.winner]){
            result[match.winner] +=1
        }else{
            result[match.winner] = 1
        }
    }
    return result;
}

module.exports = matchesWonByEachTeam