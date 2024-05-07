import { Router } from 'express';

import sessionsControler from '../controllers/sessions.controler.js';

const sessionsRouter = Router();

sessionsRouter.post('/register', sessionsControler.register);
sessionsRouter.post('/login', sessionsControler.login);
sessionsRouter.get('/current', sessionsControler.current);
sessionsRouter.get('/unprotectedLogin', sessionsControler.unprotectedLogin);
sessionsRouter.get('/unprotectedCurrent', sessionsControler.unprotectedCurrent);

export default sessionsRouter;