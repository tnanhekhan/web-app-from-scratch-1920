import * as Routie from './modules/routie.js'

init();

routie({
    'team/:id': id => {
        console.log(id)
    }
});

function init() {
    const teamInput = document.getElementById("teamInput");
    let timeout = 0;
    teamInput.addEventListener("input", event => {
        setTimeout(_ => {
            updateTeams(event)
        }, timeout)
    });
}

// region Callbacks
function updateTeams(e) {
    let teamsView = document.getElementById("teams");

    if (e.target.value.trim() === "") {
        teamsView.innerHTML = ""
    } else {
        getTeamByTeamName(e.target.value.trim())
            .then(value => {
                let filteredTeams = value.teams.filter(team => team.strSport === "Soccer");
                teamsView.innerHTML = filteredTeams.map(team => {
                    return `<li><img src="${team.strTeamBadge}/preview" height="40dp" width="40dp"><a href="#team/${team.idTeam}"> ${team.strTeam}</a></li>`
                }).join("");
            })
    }
}

// endregion

// region API calls
function getLeagues() {
    let endpoint = "all_leagues.php";
    let params = "";
    return makeApiCall(endpoint, params);
}

function getLeagueDetailsById(leagueId) {
    let endpoint = "lookup_all_teams.php";
    let params = "?id=" + leagueId;
    return makeApiCall(endpoint, params);
}

function getTeamByTeamName(teamName) {
    let endpoint = "searchteams.php";
    let params = "?t=" + teamName;
    return makeApiCall(endpoint, params);
}

function getPlayersByTeamName(teamName) {
    let endpoint = "searchplayers.php";
    let params = "?t=" + teamName;
    return makeApiCall(endpoint, params);
}

async function makeApiCall(endpoint, params) {
    let baseUrl = "https://www.thesportsdb.com/api/v1/json/1/";
    try {
        let response = await fetch(baseUrl + endpoint + params);
        return response.json()
    } catch (error) {
        console.log(`Something went wrong: ${error}`);
    }
}

// endregion