"use strict";
import * as ImportRoutie from './vendor/routie.js'
import * as ImportTransparency from './vendor/transparency.js'

init();
route();

function route() {
    const teamDetailView = document.getElementById("teamDetail");
    const teamsView = document.getElementById("teams");
    const teamInput = document.getElementById("teamInput");
    const teamDetailHeader = document.getElementById("teamDetailHeader");

    routie({
        'team/:id': id => {
            getTeamById(id)
                .then(value => {
                    teamsView.style.display = "none";
                    teamDetailView.style.display = "grid";
                    teamDetailHeader.style.display = "block";
                    teamInput.style.display = "none";

                    let teamDetail = value.teams.map(team => {
                        return {
                            id: team.idTeam,
                            name: team.strTeam,
                            league: team.strLeague,
                            description: team.strDescriptionEN,
                            badge: team.strTeamBadge,
                            kit: team.strTeamJersey,
                            stadiumName: team.strStadium,
                            stadiumImage: team.strStadiumThumb,
                        }
                    });

                    let directives = {
                        teamDetailName: {
                            text: function () {
                                return this.name
                            }
                        },
                        teamDetailLeague: {
                            text: function () {
                                return this.league
                            }
                        },
                        teamDetailDescription: {
                            text: function () {
                                return this.description
                            }
                        },

                        teamDetailBadge: {
                            src: function () {
                                return this.badge
                            }
                        },
                        teamDetailKit: {
                            src: function () {
                                return this.kit
                            }
                        },

                        teamDetailStadium: {
                            src: function () {
                                return this.stadiumImage
                            }
                        }
                    };

                    document.title = teamDetail[0].name;
                    Transparency.render(teamDetailView, teamDetail, directives, null);

                    const teamId = teamDetail[0].id;

                    getLastFiveTeamEvents(teamId)
                        .then(events => {
                            console.log(events)
                        });

                    getNextFiveTeamEvents(teamId)
                        .then(events => {
                            console.log(events)
                        })
                })
        },
        '': () => {
            teamDetailHeader.style.display = "none";
            teamInput.style.display = "block";
            document.title = "Football Webapp";
        }
    });
}

function init() {
    const teamsView = document.getElementById("teams");
    const teamInput = document.getElementById("teamInput");
    const errorMessage = document.getElementById("errorMessage");
    const teamDetailView = document.getElementById("teamDetail");
    const teamDetailHeader = document.getElementById("teamDetailHeader");
    const timeout = 0;

    // Hide teams on default, otherwise empty html template shows
    teamsView.style.display = 'none';

    errorMessage.style.display = 'none';

    teamDetailView.style.display = "none";

    teamDetailHeader.style.display = "none";

    teamInput.style.display = "block";

    teamInput.addEventListener("input", event => {
        teamsView.style.display = 'block';
        setTimeout(_ => {
            if (event.target.value.trim() != null) {
                updateTeams(event)
            }
        }, timeout)
    });

    document.getElementById("home").onclick = () => {
        teamsView.style.display = 'none';
        teamDetailView.style.display = "none";
        teamInput.value = "";
        routie('');
    }
}

// region Callbacks
function updateTeams(e) {
    const teamsView = document.getElementById("teams");
    const errorMessage = document.getElementById("errorMessage");

    if (e.target.value.trim() === "") teamsView.style.display = 'none';
    getTeamByTeamName(e.target.value.trim())
        .then(value => {
            teamsView.style.display = "block";
            errorMessage.style.display = 'none';
            try {
                let filteredTeams = value.teams.filter(team => team.strSport === "Soccer");
                let teams = filteredTeams.map(team => {
                    return {
                        teamName: team.strTeam,
                        route: "#team/" + team.idTeam,
                        badge: team.strTeamBadge + "/preview"
                    }
                });

                let directives = {
                    teamRoute: {
                        href: function () {
                            return this.route
                        }
                    },
                    teamBadge: {
                        src: function () {
                            return this.badge
                        }
                    }
                };

                Transparency.render(teamsView, teams, directives, null);
            } catch (error) {
                if (error instanceof TypeError) {
                    teamsView.style.display = 'none';
                    errorMessage.style.display = 'block';
                }
            }
        });
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

function getLastFiveTeamEvents(teamId) {
    let endpoint = "eventslast.php";
    let params = "?id=" + teamId;
    return makeApiCall(endpoint, params);
}

function getNextFiveTeamEvents(teamId) {
    let endpoint = "eventsnext.php";
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