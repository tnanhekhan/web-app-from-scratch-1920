"use strict";
import * as Routie from './vendor/routie.js'
import * as Transparency from './vendor/transparency.js'

init();

routie({
    'team/:id': id => {
        getTeamById(id)
            .then(value => {
                console.log(value);
                value.teams.map(team => {
                    document.title = team.strTeam;
                })
            })
    },
    '': () => {
        document.title = "Football Webapp";
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

    document.getElementById("home").onclick = () => {
        document.getElementById("teams").innerHTML = "";
        teamInput.value = "";
        routie('');
    }
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
                    return `<a href="#team/${team.idTeam}"><li class="teamCard"><img src="${team.strTeamBadge}/preview" height="50dp" width="50dp"> ${team.strTeam}</li></a>`
                }).join("");
            });
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

function getTeamById(teamId) {
    let endpoint = "lookupteam.php";
    let params = "?id=" + teamId;
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