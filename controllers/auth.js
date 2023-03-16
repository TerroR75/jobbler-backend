import db from '../config/database.js';
import bcrypt from 'bcryptjs';
import * as UserController from './users.js';

async function findByEmail(reqEmail) {
  const q = 'SELECT * FROM users WHERE email = ?';
  const [rows] = await db.query(q, [reqEmail]);
  return rows[0];
}

export const register = async (req, res) => {
  //    CHECK IF USER WITH THIS EMAIL ALREADY EXISTS
  const { name, email, password } = req.body;
  const user = await findByEmail(email);
  if (user) {
    res.status(500);
    res.send('Email is already used!');
    return;
  } else {
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);
    UserController.createUser(name, email, hashedPassword);
    res.status(201);
    res.send('New user registered!');
  }
  //   await db.query(query, [req.body.email], (err, data) => {
  //     if (err) return res.status(500).send(err);
  //     if (data.length) return res.status(409).send('User already exists!');

  //     //   CREATE NEW USER (AND HASH PASSWORD)
  //     const salt = bcrypt.genSaltSync(10);
  //     const hashedPswrd = bcrypt.hashSync(req.body.password, salt);
  //     const query = 'INSERT INTO users (`name`, `email`, `password`) VALUE (?, ?, ?)';
  //     db.query(query, [req.body.name, req.body.email, hashedPswrd], (err, data) => {
  //       if (err) return res.status(500).send(err);
  //       return res.status(200).send('User has been created!');
  //     });
  //   });
};

export const login = async (req, res) => {
  // CHECK IF USER EXISTS
  const { email, password } = req.body;
  const user = await findByEmail(email);

  if (!user) {
    res.send('Email or password is invalid.');
    return;
  }
  //   CHECK IF PASSWORD IS VALID
  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) {
    res.send('Email or password is invalid.');
    return;
  }

  //   SEND JWT
  res.send('Logged in');
};
