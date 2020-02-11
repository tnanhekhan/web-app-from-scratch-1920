"use strict";
init();

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
                    return `<li><img src="${team.strTeamBadge}/preview" height="40dp" width="40dp"> ${team.strTeam}</li>`
                }).join("");
            })
    }
}

// endregion

// region API calls
function getLeagues() {
    let url = "https://www.thesportsdb.com/api/v1/json/1/all_leagues.php";
    let params = "";
    return makeApiCall(url, params);
}

function getLeagueDetailsById(leagueId) {
    let url = "https://www.thesportsdb.com/api/v1/json/1/lookup_all_teams.php";
    let params = "?id=" + leagueId;
    return makeApiCall(url, params);
}

function getTeamByTeamName(teamName) {
    let url = "https://www.thesportsdb.com/api/v1/json/1/searchteams.php";
    let params = "?t=" + teamName;
    return makeApiCall(url, params);
}

function getPlayersByTeamName(teamName) {
    let url = "https://www.thesportsdb.com/api/v1/json/1/searchplayers.php";
    let params = "?t=" + teamName;
    return makeApiCall(url, params);
}

async function makeApiCall(url, params) {
    try {
        let response = await fetch(url + params);
        return response.json()
    } catch (error) {
        console.log(`Something went wrong: ${error}`);
    }
}

// endregion