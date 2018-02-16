import express from 'express';

import User from '../models/user';
import { routes } from '../configs';
import { Crypt, Token } from '../services';

const router = express.Router();

router.post(routes.auth.signin, async (req, res) => {
  try {
    const { name, password } = req.body;
    if (!name || !password) {
      return res.json({
        status: false,
        message: 'Data is empty'
      });
    }

    const user = await User.findOne({name});
    if (!user) {
      return res.json({
        status: false,
        message: 'User not found'
      });
    }

    const passwordCorrect = await Crypt.compare({
      password,
      pHash: user.password,
    });
    if (!passwordCorrect) {
      return res.json({
        status: false,
        message: 'Password is incorrect'
      });
    }

    const token = Token.generate({
      userId: user._id,
      name
    });
    res.cookie('accessToken', token, {
      maxAge: 60 * 60 * 10 // 1h
    });

    res.json({
      status: true,
      name: user.name,
      token,
    });
  } catch(err) {
    console.error(err);
    res.send(err.message).status(500);
  }
});

router.post(routes.auth.signup, async (req, res) => {
  try {
    const { name, password } = req.body;
    if (!name || !password) {
      return res.json({
        status: false,
        message: 'Data is empty'
      });
    }

    const user = new User({
      name,
      password,
    });
    await user.save();

    res.json({
      status: true,
      name: name
    });
  } catch(err) {
    console.error(err);
    res.send(err.message).status(500);
  }
});

export default router;
