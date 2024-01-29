const initialize = false
if (initialize) {
    // Get Feature track from NextCamp API
    let feature
    fetch("http://localhost:3000/shiku/nextcamp/api/feature").then(async respond => {
        const dataInJson = await respond.json()
        // Select one track to be displayed
        const randomIndex = Math.floor(Math.random() * dataInJson.features.length)
        feature = dataInJson.features[randomIndex]
    })

// We use the DOMContentLoaded event to make sure that all HTML Skeleton has been loaded
// into the browser, so we can manipulate it later
    document.addEventListener("DOMContentLoaded", () => {
        // we add a delay due to DOMContentLoaded event is triggered
        // faster than the API fetching
        setTimeout(() => {
            // Track Feature Container DOM
            const demoPlayFeature = document.getElementById("play-sample-ft")
            const waveContainer = document.getElementById("audio-wave")
            const shopFullFt = document.getElementById("shop-full-ft")
            // Track Feature DOM
            const trackTitle = document.getElementById("feature-title")
            const trackArtist = document.getElementById("feature-artist")
            // Update the Dummy data with the Actual data
            trackTitle.textContent = feature.title
            trackArtist.textContent = feature.artist
            const player = initWaveSurfer(feature.demo_sample)
            player.on('load', () => {
                console.log("Audio WaveSurfer is Loaded")
            })
            player.on('ready', () => {
                console.log("Player is ready!")
            })
            player.on('play', () => {
                shopFullFt.style.display = "none"
                waveContainer.style.removeProperty("display")
            })
            player.on('finish', () => {
                shopFullFt.style.removeProperty("display")
                waveContainer.style.display = "none"
            })
            demoPlayFeature.addEventListener("click", () => {
                player.play()
            })
        }, 500)
    })
}
function initWaveSurfer(url) {
    return WaveSurfer.create({
        container: "#audio-wave",
        waveColor: '#939393',
        progressColor: '#dedede',
        cursorColor: '#FFFFFF00',
        width: 1024,
        barHeight: 1,
        barGap: 0.5,
        height: 50,
        url: url
    })
}