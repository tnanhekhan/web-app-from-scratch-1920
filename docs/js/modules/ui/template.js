import * as ImportTransparency from '/docs/js/vendor/transparency.js'

export function renderResults(filteredTeams) {
    const teamsView = document.getElementById("teams");

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
}

export function renderTeamDetail(teamInfo) {
    const teamDetailView = document.getElementById("teamDetail");

    let teamDetail = teamInfo.teams.map(team => {
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

    Transparency.render(teamDetailView, teamDetail, directives, null);
    return teamDetail;
}

export function parseScheduleMatches(result) {
    return {
        matchHomeTeam: result.strHomeTeam,
        matchAwayTeam: result.strAwayTeam,
        matchHomeScore: result.intHomeScore,
        matchAwayScore: result.intAwayScore,
        matchDate: result.dateEvent + "\n" + result.strTime
    }
}

export function renderTeamSchedule(scheduleArray) {
    const teamSchedule = document.getElementById("teamSchedule");
    Transparency.render(teamSchedule, scheduleArray, null, null);
}