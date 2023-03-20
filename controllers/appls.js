import db from '../config/database.js';

// MODELS
import Application from '../models/Application.js';
const applM = new Application(db);

export const createNew = async (req, res) => {
  const { cName, descr, dateSent, userId } = req.body;
  if (cName === '' || dateSent === '' || !userId) {
    res.status(500).send('Something went wrong.');
    return;
  }
  try {
    const newAppl = await applM.create(cName, descr, dateSent, userId);
    if (newAppl) {
      res.status(200).send('Successfully added new application.');
    } else {
      res.status(500).send('Something went wrong.');
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
