/* Start Welcome animation */
const bgImage = document.getElementById("bg-image")
const viewPort = document.getElementById("view-port")
const formNotUse = document.getElementById("form-not-use")

// Show welcome animation
initAnimationWelcome([viewPort, bgImage], [1500, 1500])

/* Do the login stuff */
const passwordData = document.getElementById("password")
const loginButton = document.getElementById("login")
const loginForm = document.getElementById("login-form")
const loadingForm = document.getElementById("loading")
const helperText = document.getElementById("helper")

// Check if the user input a empty password or lest than 8 characters
loginButton.addEventListener("click", async () => {
    if (!passwordData.value || passwordData.value.length <= 8) {
        let originalText
        originalText = helperText.textContent
        helperText.classList.add("ngx-helper-text-red")
        helperText.textContent = "Please enter your password!, make sure is not empty or less than 8 characters"
        setTimeout(() => {
            helperText.classList.remove("ngx-helper-text-red")
            helperText.textContent = originalText
        }, 4000)
        return
    }
    // Change from login form to loading form
    animateSwapIn(loginForm, 0, -450, 500, 0, "easeInQuad", function () {
        loginForm.style.display = "none"
        loadingForm.style.removeProperty("display")
        animateSwapIn(loadingForm, 450, 0, 500, 0, "easeOutQuad", null)
    })
    // Check if the credentials is correct
    const rawData = await fetch("http://localhost:3000/shiku/primedev/api/masterpassword",
        {
            method: "POST",
            body: JSON.stringify({password: passwordData.value}),
            headers: {Accept:"application/json","Content-type": "application/json"}
        })
    const responsJson = await rawData.json()
    if (responsJson.message === "OK") {
        document.title = "You Login!"
        console.log("Password is correct")
        setTimeout(() => {
            // Play Welcome animation but in reverse
            initAnimationWelcome([viewPort, bgImage], [1500, 1500], true)
        }, 5000)
        setTimeout(() => {
            window.location.reload()
        }, 7500)
    } else {
        helperText.classList.add("ngx-helper-text-red")
        helperText.textContent = "Password is incorrect! Please try again"
        setTimeout(() => {
            animateSwapIn(loadingForm, 0, 450, 500, 0, "easeInQuad", function () {
                loadingForm.style.display = "none"
                loginForm.style.removeProperty("display")
                animateSwapIn(loginForm, -450, 0, 500, 0, "easeOutQuad", null)
            })
        }, 5000)
    }
})

/* Animation */
function animateSwapIn(target, startPosition, endPosition, duration, delay, animationMode, completes) {
    anime({
        targets: target,
        keyframes: [{translateX: `${startPosition}px`, duration: 0}, {
            translateX: `${endPosition}px`,
            duration: duration
        }],
        easing: animationMode,
        complete: completes,
        // complete: function () {
        //     target.style.display = "none"
        // },
        delay
    })
}

function initAnimationWelcome(target, duration, reverse) {
    anime({
        targets: target[0],
        // keyframes: [{translateY: `${70}rem`, duration: 0}, {translateY: `${0}rem`, duration: duration[0]}],
        translateY: [{value: "70rem", duration: 0}, {value: "0rem", duration: duration[0]}],
        opacity: [{value: 0.0, duration: 0}, {value: 1.0, duration: 2000}],
        filter: [{value: "blur(100px)", duration: 0}, {value: "blur(0px)", duration: 1500}],
        easing: "easeInOutExpo",
        direction: reverse ? "reverse" : "normal",
        begin: function () {
            anime({
                targets: target[1],
                keyframes: [{translateX: "-50rem", duration: 0}, {translateX: "14rem", duration: duration[1]}],
                opacity: [{value: 0.0, duration: 0}, {value: 1.0, duration: 1500}],
                filter: [{value: "blur(40px)", duration: 0}, {value: "blur(0px)", duration: 1000}],
                easing: "easeInOutExpo",
                direction: reverse ? "reverse" : "normal",
                changeBegin: function () {
                    target[1].style.removeProperty("visibility")
                },
                delay: 500
            })
        }
    })
}
