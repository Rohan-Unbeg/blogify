import { validateToken } from "../services/authentication.js";

function checkForAuthenticationCookie(cookieName) {
    return (req, res, next) => {
        const tokenCookieValue = req.cookies[cookieName];

        if (!tokenCookieValue) {
            res.locals.user = null;
            return next();
        }

        try {
            const userPayload = validateToken(tokenCookieValue);
            req.user = userPayload;
            res.locals.user = userPayload; // Attach user to res.locals
        } catch (error) {
            res.locals.user = null;
        }
        return next();
    };
}

export { checkForAuthenticationCookie };
