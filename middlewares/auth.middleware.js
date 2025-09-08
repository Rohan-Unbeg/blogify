import { validateToken } from "../services/authentication.js";

function checkForAuthenticationCookie(cookieName) {
    return (req, res, next) => {
        const tokenCookieValue = req.cookies[cookieName];

        if (!tokenCookieValue) return next();

        try {
            const userPayload = validateToken(tokenCookieValue);
            req.user = userPayload;
        } catch (error) {
            // Token is invalid, req.user will not be set.
            // Continue to the next middleware/route handler.
        }
        return next();
    };
}

export { checkForAuthenticationCookie };
