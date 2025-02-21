"use client";

import { useState } from "react";
import { User, Mail, Lock, FileText, BookOpen, Star, MessageSquare } from "lucide-react";
import Link from "next/link";

export default function ProfilePage() {
  interface Article {
    id: number;
    title: string;
  }

  interface User {
    realName: string;
    nickname: string;
    email: string;
    password: string;
    account: string;
    articles: Article[];
    favorites: Article[];
    comments: Article[];
  }

  const user: User = {
    realName: "王小明",
    nickname: "工作達人",
    email: "example@example.com",
    password: "********",
    account: "1234-5678-9012",
    articles: [
      { id: 1, title: "我的職場經驗分享" },
      { id: 2, title: "如何提升工作效率" }
    ],
    favorites: [],
    comments: []
  };

  const [selectedTab, setSelectedTab] = useState("basic");

  const renderContent = () => {
    switch (selectedTab) {
      case "basic":
        return (
          <div className="space-y-6 text-lg">
            <div className="flex items-center gap-4">
              <User className="w-6 h-6 text-blue-500" />
              <span>真實姓名：{user.realName}</span>
            </div>
            <div className="flex items-center gap-4">
              <User className="w-6 h-6 text-blue-500" />
              <span>暱稱：{user.nickname}</span>
            </div>
            <div className="flex items-center gap-4">
              <Mail className="w-6 h-6 text-blue-500" />
              <span>Email：{user.email}</span>
            </div>
            <div className="flex items-center gap-4">
              <Lock className="w-6 h-6 text-blue-500" />
              <span>密碼：{user.password}</span>
            </div>
            <div className="flex items-center gap-4">
              <FileText className="w-6 h-6 text-blue-500" />
              <span>轉帳帳號：{user.account}</span>
            </div>
          </div>
        );
      case "articles":
        return user.articles.length > 0 ? (
          user.articles.map((article) => (
            <div key={article.id} className="bg-white shadow-md p-4 rounded-lg">
              {article.title}
            </div>
          ))
        ) : (
          <p className="text-gray-500">目前沒有發表任何文章</p>
        );
      case "favorites":
        return user.favorites.length > 0 ? (
          user.favorites.map((article, index) => (
            <div key={index} className="bg-white shadow-md p-4 rounded-lg">
              {article.title}
            </div>
          ))
        ) : (
          <p className="text-gray-500">目前沒有收藏任何文章</p>
        );
      case "comments":
        return user.comments.length > 0 ? (
          user.comments.map((article, index) => (
            <div key={index} className="bg-white shadow-md p-4 rounded-lg">
              {article.title}
            </div>
          ))
        ) : (
          <p className="text-gray-500">目前沒有評論或留言的文章</p>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="container mx-auto flex gap-6">
        {/* 左側選單 */}
        <div className="w-1/4 bg-white shadow-md rounded-lg p-6">
          <h3 className="text-xl font-bold mb-4">個人中心</h3>
          <ul className="space-y-4">
            <li className={`cursor-pointer ${selectedTab === 'basic' ? 'text-blue-500 font-bold' : ''}`} onClick={() => setSelectedTab("basic")}>基本資料</li>
            <li className={`cursor-pointer ${selectedTab === 'articles' ? 'text-blue-500 font-bold' : ''}`} onClick={() => setSelectedTab("articles")}>發表的文章</li>
            <li className={`cursor-pointer ${selectedTab === 'favorites' ? 'text-blue-500 font-bold' : ''}`} onClick={() => setSelectedTab("favorites")}>收藏的文章</li>
            <li className={`cursor-pointer ${selectedTab === 'comments' ? 'text-blue-500 font-bold' : ''}`} onClick={() => setSelectedTab("comments")}>評論的文章</li>
          </ul>
        </div>

        {/* 右側內容 */}
        <div className="w-3/4 bg-white shadow-md rounded-lg p-6">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}
