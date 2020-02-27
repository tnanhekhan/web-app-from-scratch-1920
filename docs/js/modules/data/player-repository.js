import {makeApiCall} from "./api";

/**
 *  Retrieves an array of players from TheSportsDB
 * @param teamName the name of the team where the fetched players are from
 * @returns {Promise<any>} the promise which contains the array of players
 */
export function getPlayersByTeamName(teamName) {
    let endpoint = "searchplayers.php";
    let params = "?t=" + teamName;
    return makeApiCall(endpoint, params);
}