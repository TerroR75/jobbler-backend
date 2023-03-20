import db from '../config/database.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// MODELS
import User from '../models/User.js';
const userM = new User(db); // Create a database connection to a User model

import dotenv from 'dotenv';
dotenv.config();

export const register = async (req, res) => {
  //    Input validated from middleware, now -> CHECK IF USER WITH THIS EMAIL ALREADY EXISTS
  const { name, email, emailC, password, passwordC } = req.body;

  // 1. First check if email and confirmation email do NOT match OR password and conf password do NOT match
  if (email !== emailC || password !== passwordC) {
    res.status(500);
    res.send('Either email or password does not match');
    return;
  } else {
    // 2. If email+emailC AND password+passwordC matches -> proceed with registration v
    // 3. Check if user with that email already exists
    const foundUser = await userM.findByEmail(email);
    if (foundUser) {
      // 4. If so -> return
      res.status(400).send('Email is already used!');
      return;
    } else {
      // 5. If not -> hash password with bcrypt
      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync(password, salt);
      userM.create(name, email, hashedPassword);
      res.status(201);
      res.send('New user registered!');
    }
  }
};

export const login = async (req, res) => {
  // CHECK IF USER EXISTS
  const { email, password } = req.body;
  const foundUser = await userM.findByEmail(email);

  // 1. If user DOESNT exist -> return
  if (!foundUser) {
    res.send('Email or password is invalid.', 500);
    return;
  }
  // 2. If user DOES exist -> CHECK IF PASSWORD IS VALID
  const isValid = await bcrypt.compare(password, foundUser.password);
  if (!isValid) {
    // 3. If password is invalid -> return
    res.send('Email or password is invalid.', 500);
    return;
  }

  // 4. If password IS VALID -> login, authenticate and send JWT token
  // TODO SEND JWT
  const jwtToken = jwt.sign(
    {
      id: foundUser.id,
      email: foundUser.email,
    },
    process.env.JWT_SECRET
  );
  res.json({ userId: foundUser.id, name: foundUser.name, token: jwtToken });
};
