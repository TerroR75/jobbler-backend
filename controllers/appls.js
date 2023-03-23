import db from '../config/database.js';

// MODELS
import Application from '../models/Application.js';
import User from '../models/User.js';
const applM = new Application(db);
const userM = new User(db);

export const createNew = async (req, res) => {
  const { cName, descr, dateSent, userId } = req.body;
  if (cName === '' || dateSent === '' || !userId) {
    res.status(500).send('Something went wrong.');
    return;
  }
  try {
    const foundUser = await userM.findById(userId);
    if (foundUser.appl_amount < 30) {
      const newAppl = await applM.create(cName, descr, dateSent, userId);
      if (newAppl) {
        const increment = await userM.incrApplQuant(userId);
        console.log(increment);
        res.status(200).send('Successfully added new application.');
      } else {
        res.status(500).send('Something went wrong.');
      }
    } else {
      res.status(500).send('Too many applications on this account.');
    }
  } catch (err) {
    res.status(500).send('Something went wrong.');
  }
};

export const getAllByUserId = async (req, res) => {
  const { user } = req;
  const userAppls = await applM.findAllByUserId(user.id);

  if (userAppls) {
    res.status(200).json(userAppls);
  } else {
    res.status(500).send('Could not retrieve applications.');
  }
};
