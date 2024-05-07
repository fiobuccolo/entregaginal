
// ---- passport--- 

import passport from "passport";

export const passportCall = (strategy) => {
    return async (req, res, next) => {
        console.log("passport strategy");
        passport.authenticate(strategy, function (error, user, info) {
            if (error) return next(error);
            if (!user) {
                return res.status(401)
                    .send({
                        error: info.messages ? info.messages : info.toString()
                    })
            }
            console.log(("Usuario obtenido en el passport call"));
            console.log(user);
            req.user = user
            next();
        })(req, res, next)
    }
}

export const authorization = (role) => {
    return async (req, res, next) => {
        console.log("autorization");
        console.log(req.user.role);
        if (!req.user) return res.status(401).send("Unauthorized: User not found in JWT")
        if (req.user.role !== role) {
            return res.status(403).send("Forbidden: El usuario no tiene permisos con este rol.");
        }
        next()
    }
}
