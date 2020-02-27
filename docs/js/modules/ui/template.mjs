import * as ImportTransparency from '/docs/js/vendor/transparency.js'

/**
 * Renders the results of the team input query in overview with help from the transparency templating engine library
 * @param result The list of teams found that matches the team input query
 */
export function renderResults(result) {
    const teamsView = document.getElementById("teams");

    // Parses the result into an teams array which transparency can bind to the html
    let teams = result.map(team => {
        return {
            teamName: team.strTeam,
            route: "#team/" + team.idTeam,
            badge: team.strTeamBadge + "/preview"
        }
    });

    // Takes data from the teams array and binds into html element attributes
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
}

/**
 * Renders the data of the selected team in overview with help from transparency
 * and returns the team detail object for the router
 * @param result the team detail info
 * @returns the team detail object
 */
export function renderTeamDetail(result) {
    const teamDetailView = document.getElementById("teamDetail");

    // Parses the result into an team detail object which transparency can bind to the html
    let teamDetail = result.teams.map(team => {
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

    // Takes data from the team detail object and binds into html element attributes
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

    Transparency.render(teamDetailView, teamDetail, directives, null);
    return teamDetail;
}

/**
 * Parses latest / next scheduled games of a team from the api to a schedule match object
 * @param result latest / next scheduled games of a team
 * @returns schedule match object
 */
export function parseScheduleMatches(result) {
    return {
        matchHomeTeam: result.strHomeTeam,
        matchAwayTeam: result.strAwayTeam,
        matchHomeScore: result.intHomeScore,
        matchAwayScore: result.intAwayScore,
        matchDate: result.dateEvent + "\n" + result.strTime
    }
}

/**
 * Renders the team schedule with an array consisting of schedule match object
 * @param scheduleArray array with the schedule of a team
 */
export function renderTeamSchedule(scheduleArray) {
    const teamSchedule = document.getElementById("teamSchedule");
    Transparency.render(teamSchedule, scheduleArray, null, null);
}

/**
 * Show the error message in overview whenever the user entered a non-existing team
 * @param show boolean whether to show the error message or not
 */
export function showErrorMessage(show) {
    const teamsView = document.getElementById("teams");
    const errorMessage = document.getElementById("errorMessage");

    if (show) {
        teamsView.style.display = "none";
        errorMessage.style.display = 'block';
    } else {
        teamsView.style.display = "block";
        errorMessage.style.display = 'none';
    }
}

/**
 * Show the overview
 * @param show boolean whether to show the overview
 */
export function showOverview(show) {
    const teamDetailView = document.getElementById("teamDetail");
    const overview = document.getElementById("overview");

    if (show) {
        teamDetailView.style.display = "none";
        overview.style.display = 'block';
    } else {
        teamDetailView.style.display = "block";
        overview.style.display = 'none';
    }
}