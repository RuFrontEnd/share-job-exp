import pool from "../db";

export default class Auth {
  // 檢查是否已存在相同的 Email
  async checkDuplicateEmail(email: string): Promise<boolean> {
    if (!pool) return false;
    const result = await pool.query(
      "SELECT COUNT(*) AS count FROM users WHERE email = $1",
      [email]
    );
    return parseInt(result.rows[0].count, 10) > 0;
  }

  // 建立新帳號
  async create(email: string, hash: string): Promise<void> {
    await pool.query("INSERT INTO users (email, password) VALUES ($1, $2)", [
      email,
      hash
    ]);
  }

  // 透過 email 查找使用者
  async findByEmail(email: string): Promise<any[] | null> {
    const result = await pool.query("SELECT * FROM users WHERE email = $1", [
      email
    ]);
    return result.rows;
  }

  // 測試用
  echo() {
    console.log("auth model");
  }
}
