import { Router } from 'express';
import { authorization, passportCall } from '../utils/passport.js';

const viewsRouter = Router();
viewsRouter.get("/login", (req, res) => {
    res.render('login')
});

viewsRouter.get("/register", (req, res) => {
    res.render('register')
});

viewsRouter.get("/users", passportCall("jwt"),
    //authToken, //-> Usando Authorization Bearer Token
    //passport.authenticate('jwt', {session: false}), //-> Usando JWT por Cookie
    //passportCall('jwt'), //-> Usando JWT por Cookie usando customCall
    authorization('user'),
    (req, res) => {
        res.render('users',
            { user: req.session.user })
    });
export default viewsRouter;



// Cuando ya tenemos una session activa con los datos del user, renderizamos la vista profile
/*
router.get("/", (req, res) => {
    res.render('profile', {
        user: req.session.user
    })
});
*/

