import {initializeRoutes, prepareOverview, updateSearchResults} from "./modules/ui/router.mjs";

init();

function init() {
    const teamInput = document.getElementById("teamInput");

    // Listens to team search input and updates results
    teamInput.addEventListener("input", event => {
        if (event.target.value.trim() != null) {
            updateSearchResults(event)
        }
    });

    // Handles home button click to go to the overview
    document.getElementById("home").onclick = () => {
        prepareOverview();
    };

    initializeRoutes();
    prepareOverview()
}
