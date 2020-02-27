import * as Router from "./modules/ui/router.js";

init();

function init() {
    const teamInput = document.getElementById("teamInput");

    // Listens to team search input and updates results
    teamInput.addEventListener("input", event => {
        if (event.target.value.trim() != null) {
            Router.updateSearchResults(event)
        }
    });

    // Handles home button click to go to the overview
    document.getElementById("home").onclick = () => {
        Router.prepareOverview();
    };

    Router.initializeRoutes();
    Router.prepareOverview()
}
