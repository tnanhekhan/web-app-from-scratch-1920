import {makeApiCall} from "./api.js";

export function getTeamByTeamName(teamName) {
    let endpoint = "searchteams.php";
    let params = "?t=" + teamName;
    return makeApiCall(endpoint, params);
}

export function getTeamDetailById(teamId) {
    let endpoint = "lookupteam.php";
    let params = "?id=" + teamId;
    return makeApiCall(endpoint, params);
}

export function getLatestGames(teamId) {
    let endpoint = "eventslast.php";
    let params = "?id=" + teamId;
    return makeApiCall(endpoint, params);
}

export function getUpcomingGames(teamId) {
    let endpoint = "eventsnext.php";
    let params = "?id=" + teamId;
    return makeApiCall(endpoint, params);
}