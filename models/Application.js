export default class Application {
  // Create a pointer to database on creation
  constructor(db) {
    this.db = db;
  }

  async create(cName, descr, dateSent, userId) {
    const q = 'INSERT INTO apps SET ?';
    const application = { c_name: cName, descr, date_sent: dateSent, user_id: userId };
    const [result] = await this.db.query(q, application);
    return result.insertId;
  }

  async findAllByUserId(userId) {
    const q = 'SELECT * FROM apps WHERE user_id = ?';
    const [rows] = await this.db.query(q, [userId]);
    return rows;
  }
  async findByName(cName) {
    const q = 'SELECT * FROM apps WHERE c_name = ?';
    const [rows] = await this.db.query(q, [cName]);
    return rows[0];
  }

  async findById(id) {
    const q = 'SELECT * FROM apps WHERE id = ?';
    const [rows] = await this.db.query(q, [id]);
    return rows[0];
  }

  async update(cName, descr, dateSent) {
    const q = 'UPDATE apps SET c_name=?, descr=?, date_sent=?';
    const [result] = await this.db.query(q, [cName, descr, dateSent]);
    return result.affectedRows > 0;
  }

  async delete(id) {
    const q = 'DELETE FROM apps WHERE id = ?';
    const [result] = await this.db.query(q, [id]);
    return result.affectedRows > 0;
  }
}
