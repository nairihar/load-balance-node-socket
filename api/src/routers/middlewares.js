import express from 'express';

import { Token } from '../services';
import { routes } from '../configs';

const router = express.Router();

router.use(routes.auth.main, notAuthenticate);
router.use(routes.user.main, authenticate);

function authenticate(req, res, next) {
  const { accessToken } = req.cookies;
  if (!accessToken) {
    return res.json({
      status: false,
      message: 'Not Authenticated',
    });
  }
  const expired = Token.checkExpired(accessToken);
  if (expired) {
    return res.json({
      status: false,
      message: 'Expired token',
    });
  }
  next();
}

function notAuthenticate (req, res, next) {
  const { accessToken } = req.cookies;
  if (!accessToken) {
    return next();
  }
  const expired = Token.checkExpired(accessToken);
  if (expired) {
    return next();
  }
  res.json({
    status: false,
    message: 'Already logged in'
  });
}

export default router;
