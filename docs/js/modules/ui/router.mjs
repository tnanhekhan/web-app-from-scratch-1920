import {
    renderTeamSchedule,
    renderTeamDetail,
    renderResults,
    showOverview,
    parseScheduleMatches,
    showErrorMessage
} from "../ui/template.mjs";
import {getLatestGames, getTeamByTeamName, getTeamDetailById, getUpcomingGames} from "../data/team-repository.mjs";
import "/docs/js/libs/routie.js";

/**
 * Initializes the hash routes with help of the Routie hash routing library
 */
export function initializeRoutes() {
    routie({
        'team/:id': id => {
            getTeamDetailById(id)
                .then(value => {
                    let teamDetail = renderTeamDetail(value);

                    showOverview(false);
                    document.title = teamDetail[0].name;
                    const teamId = teamDetail[0].id;

                    getLatestGames(teamId)
                        .then(res => {
                            let results = res.results.map(result => {
                                return parseScheduleMatches(result);
                            });

                            getUpcomingGames(teamId)
                                .then(res => {
                                    let events = res.events.map(result => {
                                        return parseScheduleMatches(result);
                                    });
                                    // Combines the result of the two Api calls into one array
                                    let scheduleArray = results.concat(events);
                                    renderTeamSchedule(scheduleArray);
                                });
                        })
                })
        },
        '': () => {
            showOverview(true);
            document.title = "Football Webapp";
        }
    });
}

/**
 * Prepares overview by clearing input fields and hiding teams view template
 */
export function prepareOverview() {
    const teamsView = document.getElementById("teams");
    const teamInput = document.getElementById("teamInput");
    const teamDetail = document.getElementById("teamDetail");
    const errorMessage = document.getElementById("errorMessage");

    teamsView.style.display = 'none';
    teamDetail.style.display = "none";
    teamInput.value = "";
    errorMessage.style.display = 'none';

    routie("");
}

/**
 * Callback functions that makes an api request for teams on every query
 * and shows the results (or error) in the overview
 *
 * @param e Event which contains the team input query
 */
export function updateSearchResults(e) {
    getTeamByTeamName(e.target.value.trim())
        .then(value => {
            // Hides error message in case an unknown team was filled in before
            showErrorMessage(false);
            try {
                // Filters teams by the sport "Soccer" and renders results with filtered teams
                let filteredTeams = value.teams.filter(team => team.strSport === "Soccer");
                renderResults(filteredTeams);
            } catch (error) {
                if (error instanceof TypeError) {
                    showErrorMessage(true);
                }
            }
        });
}