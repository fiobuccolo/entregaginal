

// ---- jwt--- 
import jwt from "jsonwebtoken"

export const PRIVATE_KEY = "f10s3cr3t"

export const generateJWToken = (user) => {
    const token = jwt.sign({ user }, PRIVATE_KEY, { expiresIn: '24hr' })
    return token
}

export const authJWToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res
            .status(401)
            .send({ error: "Not authenticated" })
    }
    const token = authHeader.split(" ")[1]
    jwt.verify(token, PRIVATE_KEY, (error, credentials) => {
        if (error) {
            return res
                .status(403)
                .send({ error: "Not authorized" })
        }
        req.user = credentials.user;
        next()
    })
}

