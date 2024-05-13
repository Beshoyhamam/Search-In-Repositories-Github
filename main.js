// Main Variables
let theInput = document.querySelector(".get-repos input"),
    getButton = document.querySelector(".get-button"),
    reposData = document.querySelector(".show-data");

getButton.onclick = () => getRepos();

// Get Repos Function
function getRepos() {
    if (theInput.value == "") {
        reposData.innerHTML = "<span>PLease Write gitHub Username.</span>"
    } else {
        fetch(`https://api.github.com/users/${theInput.value}/repos`)
            .then((repos) => repos.json())
            .then((data) => {
                // Empty The Container
                reposData.innerHTML = ""

                data.forEach((repo) => {
                    // Create The Main Div Element
                    let mainDiv = document.createElement("div");
                    mainDiv.className = "repo-box";
                    let repoName = document.createTextNode(repo.name);
                    mainDiv.appendChild(repoName);

                    // Create Repo Url Anchor
                    let theUrl = document.createElement("a");
                    let theUrlText = document.createTextNode("Visit");
                    theUrl.appendChild(theUrlText);
                    theUrl.href = `https://github.com/${theInput.value}/${repo.name}`
                    theUrl.setAttribute("target", "_blank")
                    mainDiv.appendChild(theUrl);

                    // Create Stars Count Span
                    let starsSpan = document.createElement("span");
                    let starsText = document.createTextNode(`Stars ${repo.stargazers_count}`);
                    starsSpan.appendChild(starsText)
                    mainDiv.appendChild(starsSpan);

                    let container = document.createElement("div");
                    container.appendChild(theUrl)
                    container.appendChild(starsSpan)
                    mainDiv.appendChild(container)

                    reposData.appendChild(mainDiv)
                });
            })
    }
}