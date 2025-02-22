"use client";

import { useRouter } from "next/navigation";
import { User, Edit3, LogIn } from "lucide-react";
import Image from "next/image";
import Button from "@/components/button";

export default function Navbar({ isAuthenticated = true }) {
  const router = useRouter();

  const handleHomeRedirect = () => {
    router.push("/");
  };

  const handleAuthRedirect = () => {
    router.push("/auth");
  };

  const handleProfileRedirect = () => {
    router.push("/profile");
  };

  const handlePostRedirect = () => {
    router.push("/post");
  };

  return (
    <nav className="bg-white shadow py-4 px-6 flex justify-between items-center border-b border-gray-200">
      <div
        className="flex items-center gap-2 cursor-pointer"
        onClick={handleHomeRedirect}
      >
        <Image src="/logo.png" alt="Logo" width={40} height={40} />
        <h1 className="text-xl font-bold text-indigo-600">專業職場</h1>
      </div>
      <div className="flex items-center gap-4">
        <Button
          icon={<Edit3 className="w-5 h-5 mr-2" />}
          text={"我要投稿"}
          onClick={handlePostRedirect}
        />
        <div className="flex items-center gap-2">
          {isAuthenticated ? (
            <>
              <User className="w-6 h-6 text-indigo-500" />
              <span
                className="text-gray-800 font-medium cursor-pointer"
                onClick={handleProfileRedirect}
              >
                會員名稱
              </span>
            </>
          ) : (
            <button
              className="flex items-center text-indigo-500 hover:underline"
              onClick={handleAuthRedirect}
            >
              <LogIn className="w-5 h-5 mr-2" /> 註冊 / 登入
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
