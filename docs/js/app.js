init()
const leagueInput = document.getElementById("leagueInput")

function init() {
    getLeagues().then(json => {
        var filteredResult = json.leagues.filter(league => league.strSport === "Soccer" && league.strLeague[0] != "_")
        document.getElementById("apiTextView").innerHTML = filteredResult.map(function (leagues) {
            return leagues.strLeague + " - " + leagues.idLeague + "<br>"
        }).join("");
    })
}

function updateValue(e) {
    console.log(e);
}

async function getLeagues() {
    return fetch("https://www.thesportsdb.com/api/v1/json/1/all_leagues.php")
        .then(leagues => {
            return leagues.json()
        })
}

async function getLeagueDetailsById(leagueId) {
    var params = "?id=" + leagueId
    return fetch("https://www.thesportsdb.com/api/v1/json/1/lookup_all_teams.php" + params)
        .then(leagueDetails => {
            return leagueDetails.json()
        })
}