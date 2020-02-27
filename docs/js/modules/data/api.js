export async function makeApiCall(endpoint, params) {
    let baseUrl = "https://www.thesportsdb.com/api/v1/json/1/";
    try {
        let response = await fetch(baseUrl + endpoint + params);
        return response.json()
    } catch (error) {
        console.log(`Something went wrong: ${error}`);
    }
}