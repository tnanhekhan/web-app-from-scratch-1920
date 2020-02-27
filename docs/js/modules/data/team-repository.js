import {makeApiCall} from "./api.js";

/**
 *  Retrieves a sports team by teamName from TheSportsDB
 * @param teamName the name of the team
 * @returns {Promise<any>} the promise which contains a team object
 */
export function getTeamByTeamName(teamName) {
    let endpoint = "searchteams.php";
    let params = "?t=" + teamName;
    return makeApiCall(endpoint, params);
}

/**
 *  Retrieves sports team details from TheSportsDB
 * @param teamId the id of the team
 * @returns {Promise<any>} which contains an object with team details
 */
export function getTeamDetailById(teamId) {
    let endpoint = "lookupteam.php";
    let params = "?id=" + teamId;
    return makeApiCall(endpoint, params);
}

/**
 * Retrieves the last five matches from a team
 * @param teamId the id of the team
 * @returns {Promise<any>} which contains array with the last five played matches
 */
export function getLatestGames(teamId) {
    let endpoint = "eventslast.php";
    let params = "?id=" + teamId;
    return makeApiCall(endpoint, params);
}

/**
 * Retrieves the next five matches from a team
 * @param teamId the id of the team
 * @returns {Promise<any>} which contains array with the next five matches
 */
export function getUpcomingGames(teamId) {
    let endpoint = "eventsnext.php";
    let params = "?id=" + teamId;
    return makeApiCall(endpoint, params);
}