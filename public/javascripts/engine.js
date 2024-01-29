console.log("Test engine started")


function getURL() {
    window.addEventListener("load", () => {
        console.log(window.location.pathname)
    })
}
getURL()