import { Auth as AuthModel } from "../models";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

const env = dotenv.config().parsed;

export default class Auth {
  private authModel = new AuthModel();

  // 註冊新帳號
  async register(email: string, password: string) {
    // 檢查 Email 格式
    if (!validator.isEmail(email)) {
      throw new Error("Invalid email format.");
    }

    // 檢查 Email 是否已存在
    const isDuplicate = await this.authModel.checkDuplicateEmail(email);
    if (isDuplicate) {
      throw new Error("Email already exists.");
    }

    // 加密密碼並建立帳號
    const hash = await bcrypt.hash(password, 10);
    await this.authModel.create(email, hash);
  }

  // 使用 JWT 驗證
  async jwtLogin(token: string): Promise<boolean> {
    if (!token || !env?.SECRETKEY) {
      return false;
    }

    try {
      jwt.verify(token, env.SECRETKEY);
      return true;
    } catch (err) {
      return false;
    }
  }

  // 使用 Email 和 Password 登入
  async login(email: string, password: string): Promise<string> {
    // 透過 Email 查找使用者
    const rows = await this.authModel.findByEmail(email);

    // 檢查使用者是否存在
    if (!rows || rows.length === 0) {
      throw new Error("Invalid email or password.");
    }

    const user = rows[0];

    // 驗證密碼
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      throw new Error("Invalid email or password.");
    }

    // 簽發 JWT Token
    if (!env?.SECRETKEY) {
      throw new Error("JWT Secret Key not configured.");
    }

    const token = jwt.sign({ userId: user.id }, env.SECRETKEY, {
      expiresIn: "90d"
    });

    return token;
  }

  // 測試用
  echo() {
    console.log("auth service");
    this.authModel.echo();
  }
}
