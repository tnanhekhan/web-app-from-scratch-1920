/**
 *
 * Makes a GET request with the JavaScript Fetch API to TheSportsDB
 * @param endpoint TheSportsDB endpoint where to fetch data from
 * @param params URL parameters for GET request
 * @returns {Promise<any>} promise which might contain the response from TheSportsDB
 */
export async function makeApiCall(endpoint, params) {
    let baseUrl = "https://www.thesportsdb.com/api/v1/json/1/";
    try {
        let response = await fetch(baseUrl + endpoint + params);
        return response.json()
    } catch (error) {
        console.log(`Something went wrong: ${error}`);
    }
}