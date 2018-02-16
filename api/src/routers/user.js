import express from 'express';

import User from '../models/user';
import { routes } from '../configs';

const router = express.Router();

router.get(routes.main, (req, res) => {
  res.json({
    test: true
  });
});

export default router;
