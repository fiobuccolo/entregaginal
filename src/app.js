import express from "express";
import config from "./config/config.js";
import MongoSingleton from "./config/mongodb-singleton.js";
import cors from "cors"
import handlebars from "express-handlebars";
import __dirname from "./dirname.js";

import Handlebars from "handlebars";
import passport from 'passport';

import initializePassport from "./config/passport.config.js";
import cookieParser from 'cookie-parser'
import { addLogger } from "./config/logger_CUSTOM.js";
import { allowInsecurePrototypeAccess } from "@handlebars/allow-prototype-access";

//Routers
import sessionsRouter from "./routes/sessions.router.js";
import userRouter from "./routes/users.router.js";
import viewsRouter from "./routes/views.router.js";

const app = express()
const SERVER_PORT = config.port
app.listen(SERVER_PORT, () => console.log(`Server listening on port: ${SERVER_PORT}`))


//Levantamos instancia de MONGO
const mongoInstance = async () => {
    try {
        console.log("instancia mongo");
        await MongoSingleton.getInstance()
    } catch (error) {
        console.error(error);
    }
}
mongoInstance();

//JSON settings
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(__dirname + `/public`))
// CORS
app.use(cors());
//cookieparser
app.use(cookieParser("f10s3cr3r"));
// **Logger
app.use(addLogger);
// Motor de plantillas:
app.engine("hbs", handlebars.engine({
    extname: "hbs",
    defaultLayout: "main",
    handlebars: allowInsecurePrototypeAccess(Handlebars),
}))
// Setear motor de plantillas
app.set("view engine", "hbs")
app.set("views", __dirname + `/views`) // setemamos la carpeta que el motor va a ser uso
console.log(config.mongoPassword);
// configuración de sesion
/*
app.use(session({
    // --- fileStrore
    //store: new fileStore({path:"./sessions",ttl:15,retries:0}),
    // --- mongo store:
    store: MongoStore.create({
        mongoUrl: `mongodb+srv://fio:${config.mongoPassword}@cluster0.mi1diym.mongodb.net/${config.mongoDBName}?retryWrites=true&w=majority`,
        mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
        ttl: 10 * 60
    }),
    secret: "f10s3cr3t",
    resave: false, //false: cuando no necesitamso que guarde en memoria
    saveUninitialized: true
})
)
*/
/* ====================================
=         MIDDLEWARE PASSPORT         =
======================================*/
initializePassport()
app.use(passport.initialize())
//app.use(passport.session())
/* ====================================
=                 Rutas               =
======================================*/
// --- VISTAS ---
app.use("/", viewsRouter)
// --- API ---
app.use("/api/sessions", sessionsRouter)
app.use("api/users", userRouter)
// -----------------


