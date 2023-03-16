import db from '../config/database.js';

export async function getAllUsers() {
  const [rows] = await db.query('SELECT * FROM users;');
  return rows;
}

export async function getUserById(id) {
  const [rows] = await db.query(
    `
    SELECT * 
    FROM users
    WHERE id = ?;`,
    [id]
  );
  return rows[0];
}

export async function createUser(name, email, password) {
  const [result] = await db.query(
    `
    INSERT INTO users (name, email, password)
    VALUES (?, ?, ?)`,
    [name, email, password]
  );
  const id = result.insertId;
  return getUserById(id);
}
