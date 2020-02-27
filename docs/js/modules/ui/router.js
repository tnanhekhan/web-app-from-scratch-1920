import * as TeamRepository from "/docs/js/modules/data/team-repository.js";
import * as Template from "/docs/js/modules/ui/template.js";
import * as ImportRoutie from '/docs/js/vendor/routie.js'


/**
 * Initializes the hash routes with help of the Routie hash routing library
 */
export function initializeRoutes() {
    routie({
        'team/:id': id => {
            TeamRepository.getTeamDetailById(id)
                .then(value => {
                    let teamDetail = Template.renderTeamDetail(value);

                    Template.showOverview(false);
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
                                    // Combines the result of the two Api calls into one array
                                    let scheduleArray = results.concat(events);
                                    Template.renderTeamSchedule(scheduleArray);
                                });
                        })
                })
        },
        '': () => {
            Template.showOverview(true);
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
    TeamRepository.getTeamByTeamName(e.target.value.trim())
        .then(value => {
            // Hides error message in case an unknown team was filled in before
            Template.showErrorMessage(false);
            try {
                // Filters teams by the sport "Soccer" and renders results with filtered teams
                let filteredTeams = value.teams.filter(team => team.strSport === "Soccer");
                Template.renderResults(filteredTeams);
            } catch (error) {
                if (error instanceof TypeError) {
                    Template.showErrorMessage(true);
                }
            }
        });
}
