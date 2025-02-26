import { Router } from "express";

abstract class Route {
  protected router = Router();
  protected abstract setRoutes(): void;
  protected prefix: string = ""; // default

  get url() {
    return `/api${this.prefix}`; // 只回傳 URL 前綴
  }

  get routes() {
    return this.router; // 回傳 Router 實例
  }
}

export default Route;
