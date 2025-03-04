import { Request, Response, NextFunction } from "express";
import { Auth as AuthService } from "../services";
import { getError } from "../utils/error";
import { SUCCESSFUL, ERROR } from "../constatns/stauts";

export default class Auth {
  private authService = new AuthService();

  constructor() {
    this.register = this.register.bind(this);
    this.jwtLogin = this.jwtLogin.bind(this);
    this.login = this.login.bind(this);
    this.echo = this.echo.bind(this);
  }

  // 註冊
  async register(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body;

    try {
      await this.authService.register(email, password);
      res.status(201).send({
        status: SUCCESSFUL,
        message: "Sign up successfully!"
      });
    } catch (err) {
      const _message = getError(err);
      if (_message === "Invalid email format.") {
        res.status(200).send({
          status: ERROR,
          message: _message
        });
      } else if (_message === "Email already exists.") {
        res.status(200).send({
          status: ERROR,
          message: _message
        });
      } else {
        res.status(400).send({
          status: ERROR,
          message: "Unknown error."
        });
      }
    }
  }

  // 登入
  async login(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body;

    try {
      const _token = await this.authService.login(email, password);
      res.status(201).send({
        status: SUCCESSFUL,
        message: "Login successfully!",
        token: _token
      });
    } catch (err) {
      const _message = getError(err);
      if (_message === "Invalid email or password.") {
        res.status(200).send({
          status: ERROR,
          message: _message
        });
      } else {
        res.status(400).send({
          status: ERROR,
          message: "Unknown error."
        });
      }
    }
  }

  // 驗證 JWT Token
  async jwtLogin(req: Request, res: Response, next: NextFunction) {
    const { authorization: token } = req.headers;

    if (typeof token !== "string")
      return res.status(400).send({
        status: ERROR,
        message: "User login failed."
      });

    try {
      const _isPass = await this.authService.jwtLogin(token);
      if (_isPass) {
        res.status(201).send({
          status: SUCCESSFUL,
          isPass: _isPass,
          message: "Login successfully!"
        });
      } else {
        res.status(200).send({
          status: SUCCESSFUL,
          isPass: _isPass,
          message: "Invalid token."
        });
      }
    } catch (err) {
      res.status(400).send({
        status: ERROR,
        message: getError(err)
      });
    }
  }

  // 測試用
  echo(req: Request, res: Response, next: NextFunction) {
    res.type("text/plain");
    res.send("auth");
    this.authService.echo();
  }
}
