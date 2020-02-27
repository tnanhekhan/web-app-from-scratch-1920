"use strict";
import * as TeamRepository from "./modules/data/team-repository.js";
import * as Template from "./modules/ui/template.js";
import * as ImportRoutie from './vendor/routie.js'

init();

function route() {
    const teamDetailView = document.getElementById("teamDetail");
    const overview = document.getElementById("overview");

    routie({
        'team/:id': id => {
            TeamRepository.getTeamDetailById(id)
                .then(value => {
                    overview.style.display = "none";
                    teamDetailView.style.display = "block";

                    let teamDetail = Template.renderTeamDetail(value);

                    document.title = teamDetail[0].name;
                    const teamId = teamDetail[0].id;

                    TeamRepository.getLatestGames(teamId)
                        .then(res => {
                            let results = res.results.map(result => {
                                return Template.parseScheduleMatches(result);
                            });

                            TeamRepository.getUpcomingGames(teamId)
                                .then(res => {
                                    let events = res.events.map(result => {
                                        return Template.parseScheduleMatches(result);
                                    });

                                    let scheduleArray = results.concat(events);
                                    Template.renderTeamSchedule(scheduleArray);
                                });
                        })
                })
        },
        '': () => {
            teamDetailView.style.display = "none";
            overview.style.display = "block";
            document.title = "Football Webapp";
        }
    });
}

function init() {
    const teamsView = document.getElementById("teams");
    const teamInput = document.getElementById("teamInput");
    const errorMessage = document.getElementById("errorMessage");
    const teamDetail = document.getElementById("teamDetail");
    const overview = document.getElementById("overview");
    const timeout = 0;

    // Hide teams on default, otherwise empty html template shows
    teamsView.style.display = 'none';

    errorMessage.style.display = 'none';

    teamDetail.style.display = "none";

    overview.style.display = "block";

    teamInput.addEventListener("input", event => {
        setTimeout(_ => {
            if (event.target.value.trim() != null) {
                updateTeams(event)
            }
        }, timeout)
    });

    document.getElementById("home").onclick = () => {
        teamsView.style.display = 'none';
        teamDetail.style.display = "none";
        teamInput.value = "";
        routie('');
    };

    route();
}

// region Callbacks
function updateTeams(e) {
    const teamsView = document.getElementById("teams");
    const errorMessage = document.getElementById("errorMessage");

    if (e.target.value.trim() === "") teamsView.style.display = 'none';
    TeamRepository.getTeamByTeamName(e.target.value.trim())
        .then(value => {
            teamsView.style.display = "none";
            errorMessage.style.display = 'none';
            try {
                let filteredTeams = value.teams.filter(team => team.strSport === "Soccer");
                teamsView.style.display = "block";
                Template.renderResults(filteredTeams);
            } catch (error) {
                if (error instanceof TypeError) {
                    teamsView.style.display = 'none';
                    errorMessage.style.display = 'block';
                }
            }
        });
}

// endregion
