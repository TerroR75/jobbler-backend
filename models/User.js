export default class User {
  // Create a pointer to database on creation
  constructor(db) {
    this.db = db;
  }

  async create(name, email, password) {
    const q = 'INSERT INTO users SET ?';
    const user = { name, email, password };
    const [result] = await this.db.query(q, user);
    return result.insertId;
  }

  async findByEmail(email) {
    const q = 'SELECT * FROM users WHERE email = ?';
    const [rows] = await this.db.query(q, [email]);
    return rows[0];
  }

  async findById(id) {
    const q = 'SELECT * FROM users WHERE id = ?';
    const [rows] = await this.db.query(q, [id]);
    return rows[0];
  }

  async update(id, name, email, password) {
    const q = 'UPDATE users SET name=?, email=?, password=? WHERE id=?';
    const [result] = await this.db.query(q, [name, email, password, id]);
    return result.affectedRows > 0;
  }
  async incrApplQuant(id) {
    const q = 'UPDATE users SET appl_amount = appl_amount + 1 WHERE id = ?';
    const [result] = await this.db.query(q, [id]);
    return result.affectedRows > 0;
  }

  async delete(id) {
    const q = 'DELETE FROM users WHERE id = ?';
    const [result] = await this.db.query(q, [id]);
    return result.affectedRows > 0;
  }
}
