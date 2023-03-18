import db from '../config/database.js';
import bcrypt from 'bcryptjs';
import * as UserController from './users.js';
import jwt from 'jsonwebtoken';

import dotenv from 'dotenv';
dotenv.config();

async function findByEmail(reqEmail) {
  const q = 'SELECT * FROM users WHERE email = ?';
  const [rows] = await db.query(q, [reqEmail]);
  return rows[0];
}

export const register = async (req, res) => {
  //    CHECK IF USER WITH THIS EMAIL ALREADY EXISTS
  const { name, email, emailC, password, passwordC } = req.body;

  // 1. First check if email and confirmation email do NOT match OR password and conf password do NOT match
  if (email !== emailC || password !== passwordC) {
    res.status(500);
    res.send('Either email or password does not match');
    return;
  } else {
    // 2. If email+emailC AND password+passwordC matches -> proceed with registration v
    // 3. Check if user with that email already exists
    const user = await findByEmail(email);
    if (user) {
      // 4. If so -> return
      res.status(400).send('Email is already used!');
      return;
    } else {
      // 5. If not -> hash password with bcrypt
      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync(password, salt);
      UserController.createUser(name, email, hashedPassword);
      res.status(201);
      res.send('New user registered!');
    }
  }
};

export const login = async (req, res) => {
  // CHECK IF USER EXISTS
  const { email, password } = req.body;
  const user = await findByEmail(email);

  // 1. If user DOESNT exist -> return
  if (!user) {
    res.send('Email or password is invalid.', 500);
    return;
  }
  // 2. If user DOES exist -> CHECK IF PASSWORD IS VALID
  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) {
    // 3. If password is invalid -> return
    res.send('Email or password is invalid.', 500);
    return;
  }

  // 4. If password IS VALID -> login, authenticate and send JWT token
  // TODO SEND JWT
  const jwtToken = jwt.sign(
    {
      id: user.id,
      email: user.email,
    },
    process.env.JWT_SECRET
  );
  res.json({ userId: user.id, name: user.name, token: jwtToken });
};
