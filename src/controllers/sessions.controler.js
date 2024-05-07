import { usersService } from "../services/index.js";
import { createHash, passwordValidation } from "../utils/bcrypt.js";
import jwt from 'jsonwebtoken';
import UserDTO from '../dto/User.dto.js';

const register = async (req, res) => {
    try {
        console.log("register");
        const { first_name, last_name, email, password } = req.body;
        if (!first_name || !last_name || !email || !password) return res.status(400).send({ status: "error", error: "Incomplete values" });
        //const exists = await userService.getUserByEmail(email);
        //if (exists)
        //   return res.status(400).send({ status: "error", error: "User already exists" });
        const hashedPassword = await createHash(password);
        console.log(hashedPassword);
        const user = {
            first_name,
            last_name,
            email,
            password: hashedPassword
        }
        console.log(user);
        let result = await usersService.create(user);
        console.log(result);
        res.status(201).send({ status: "success", payload: result._id });
    } catch (error) {

    }
}

const login = async (req, res) => {
    console.log("login");
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).send({ status: "error", error: "Incomplete values" });
    const user = await usersService.getUserByEmail(email);
    if (!user) {
        console.warn("User doesn't exists with username");
        return res.status(404).send({ status: "error", message: "User doesn't exist" });
    }
    const isValidPassword = await passwordValidation(user, password);
    if (!isValidPassword) {
        console.warn("Invalid credentials for user");
        return res.status(401).send({ status: "error", message: "El usuario y la contraseña no coinciden" });
    }
    const userDto = UserDTO.getUserTokenFrom(user);
    console.log('user dto:' + userDto);
    const access_token = jwt.sign(userDto, 'tokenSecretJWT', { expiresIn: "120s" });
    console.log(access_token);
    console.log(req);
    return res
        .status(200)
        .cookie('jwtCookieToken', access_token, { maxAge: 36000 })
        .send({
            status: "success",
            message: "Logged in",
            access_token: access_token,
            payload: req.session,
        })
}


const current = async (req, res) => {
    const cookie = req.cookies['FioCookie']
    if (!cookie)
        return res.send({ status: "error" })
    const user = jwt.verify(cookie, 'tokenSecretJWT');
    if (user)
        return res.send({ status: "success", payload: user })

}

const unprotectedLogin = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).send({ status: "error", error: "Incomplete values" });
    const user = await usersService.getUserByEmail(email);
    if (!user) return res.status(404).send({ status: "error", error: "User doesn't exist" });
    const isValidPassword = await passwordValidation(user, password);
    if (!isValidPassword) return res.status(400).send({ status: "error", error: "Incorrect password" });
    const token = jwt.sign(user, 'tokenSecretJWT', { expiresIn: "1h" });
    res.cookie('unprotectedCookie', token, { maxAge: 3600000 }).send({ status: "success", message: "Unprotected Logged in" })
}
const unprotectedCurrent = async (req, res) => {
    const cookie = req.cookies['unprotectedCookie']
    const user = jwt.verify(cookie, 'tokenSecretJWT');
    if (user)
        return res.send({ status: "success", payload: user })
}
export default {
    current,
    login,
    register,
    current,
    unprotectedLogin,
    unprotectedCurrent
}