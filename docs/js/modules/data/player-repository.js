import {makeApiCall} from "./api";

export function getPlayersByTeamName(teamName) {
    let endpoint = "searchplayers.php";
    let params = "?t=" + teamName;
    return makeApiCall(endpoint, params);
}