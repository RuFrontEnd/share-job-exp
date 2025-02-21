"use client";

import { useState } from "react";
import { LogIn, UserPlus, Mail, Lock } from "lucide-react";
import Link from "next/link";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const toggleAuthMode = () => setIsLogin(!isLogin);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-blue-300 to-blue-500 relative overflow-hidden">
      {/* 背景裝飾：圓形漸變 */}
      <div className="absolute w-96 h-96 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full blur-3xl opacity-50 top-10 left-10 animate-pulse"></div>
      <div className="absolute w-80 h-80 bg-gradient-to-r from-yellow-400 to-red-500 rounded-full blur-3xl opacity-50 bottom-10 right-10 animate-pulse"></div>

      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md relative z-10">
        <h2 className="text-2xl font-bold text-center mb-6">
          {isLogin ? "登入您的帳號" : "註冊新帳號"}
        </h2>
        <form>
          <div className="mb-4">
            <div className="flex items-center border rounded-lg p-2">
              <Mail className="w-5 h-5 text-gray-500 mr-2" />
              <input
                type="email"
                placeholder="電子郵件"
                className="w-full border-none focus:ring-0 outline-none"
                required
              />
            </div>
          </div>
          <div className="mb-4">
            <div className="flex items-center border rounded-lg p-2">
              <Lock className="w-5 h-5 text-gray-500 mr-2" />
              <input
                type="password"
                placeholder="密碼"
                className="w-full border-none focus:ring-0 outline-none"
                required
              />
            </div>
          </div>
          {!isLogin && (
            <div className="mb-4">
              <div className="flex items-center border rounded-lg p-2">
                <Lock className="w-5 h-5 text-gray-500 mr-2" />
                <input
                  type="password"
                  placeholder="確認密碼"
                  className="w-full border-none focus:ring-0 outline-none"
                  required
                />
              </div>
            </div>
          )}
          <button className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition">
            {isLogin ? "登入" : "註冊"}
          </button>
        </form>

        <p className="text-center text-gray-600 mt-4">
          {isLogin ? "還沒有帳號？" : "已經有帳號了？"}
          <button
            className="text-blue-500 hover:underline ml-1"
            onClick={toggleAuthMode}
          >
            {isLogin ? "註冊" : "登入"}
          </button>
        </p>

        <div className="mt-6 text-center">
          <Link href="/" className="text-gray-500 hover:text-gray-700">
            返回首頁
          </Link>
        </div>
      </div>
    </div>
  );
}
