const jwtVerify =  require('../jwt/verifyAndUnpack')

function CookieVerify(cookie, route) {
    if (route.startsWith("/shiku/nextcamp/api/")) {
        if (!cookie?.access_to_resource) {
            throw Error("No Authentication cookies is available")
        }
        // Validate Server Login cookies
        const serverLogin = jwtVerify(cookie.access_to_resource)
        if (serverLogin.status === "error") {
            throw Error("Cookies is not valid!, please try to login into the server again.")
        }
    }
}

module.exports = CookieVerify