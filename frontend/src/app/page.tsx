"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, User, Edit3, LogIn } from "lucide-react";
import Image from "next/image";

export default function Home() {
  const [search, setSearch] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const router = useRouter();

  const handleAuthRedirect = () => {
    router.push("/auth");
  };

  const handleProfileRedirect = () => {
    router.push("/profile");
  };

  const handlePostRedirect = () => {
    router.push("/post");
  };

  const handleArticleClick = (id: number) => {
    router.push(`/article/${id}`);
  };

  const articles = [
    {
      id: 1,
      title: "如何提升職場競爭力？",
      content:
        "在這篇文章中，我們將分享五個實用技巧，幫助你在職場中脫穎而出...",
      rating: 4.5,
      locked: true
    },
    {
      id: 2,
      title: "遠端工作心法",
      content: "探索如何在遠端工作時保持高效，並避免職場孤立的感覺...",
      rating: 4.8,
      locked: false
    },
    {
      id: 3,
      title: "如何與同事建立良好關係？",
      content: "良好的人際關係能夠提升團隊合作，帶來更好的工作成果...",
      rating: 4.2,
      locked: true
    },
    {
      id: 4,
      title: "職場時間管理技巧",
      content: "學會優先處理任務，提升生產力，減少加班壓力...",
      rating: 4.7,
      locked: false
    },
    {
      id: 5,
      title: "如何提升面試成功率？",
      content: "了解面試官的期望，準備好你的回答，展現最佳的自己...",
      rating: 4.6,
      locked: true
    },
    {
      id: 6,
      title: "從職場新鮮人到專業人士的轉變",
      content: "掌握關鍵技能與心態，讓你快速成長並取得成功...",
      rating: 4.9,
      locked: false
    }
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="bg-white shadow-md py-4 px-6 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Image src="/logo.png" alt="Logo" width={40} height={40} />
          <h1 className="text-xl font-bold">職場心得分享</h1>
        </div>
        <div className="flex items-center gap-4">
          <button
            className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
            onClick={handlePostRedirect}
          >
            <Edit3 className="w-5 h-5 mr-2" /> 我要投稿
          </button>
          <div className="flex items-center gap-2">
            {isAuthenticated ? (
              <>
                <User className="w-6 h-6 text-gray-600" />
                <span
                  className="text-gray-800 font-medium cursor-pointer"
                  onClick={handleProfileRedirect}
                >
                  會員名稱
                </span>
              </>
            ) : (
              <button
                className="flex items-center text-blue-500 hover:underline"
                onClick={handleAuthRedirect}
              >
                <LogIn className="w-5 h-5 mr-2" /> 註冊 / 登入
              </button>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="text-center py-12 bg-blue-500 text-white">
        <h2 className="text-3xl font-bold">分享你的職場經驗，獲取額外收入</h2>
        <p className="mt-2 text-lg">瀏覽真實職場心得，提升你的職涯規劃</p>
      </header>

      {/* Search Bar */}
      <div className="max-w-2xl mx-auto mt-6 px-4">
        <div className="flex items-center bg-white shadow-md rounded-lg p-2">
          <Search className="w-5 h-5 text-gray-500 ml-2" />
          <input
            type="text"
            placeholder="搜尋文章..."
            className="w-full p-2 border-none focus:ring-0 outline-none"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Article List */}
      <div className="max-w-3xl mx-auto mt-6 px-4">
        {articles.map((article) => (
          <div
            key={article.id}
            className="bg-white shadow-md p-4 mb-4 rounded-lg"
            onClick={() => !article.locked && handleArticleClick(article.id)}
          >
            <h3 className="text-xl font-bold">{article.title}</h3>
            <p className="text-gray-600 mt-1">{article.content}</p>
            <div className="flex items-center justify-between mt-4">
              <div className="flex items-center text-yellow-500">
                {Array.from({ length: 5 }, (_, i) => (
                  <span key={i}>
                    {i < Math.floor(article.rating) ? "★" : "☆"}
                  </span>
                ))}
                <span className="ml-2 text-gray-700">
                  {article.rating.toFixed(1)}
                </span>
              </div>
              {article.locked ? (
                <button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600">
                  🔒 解鎖 ($5)
                </button>
              ) : (
                <span className="text-green-600 font-semibold">已解鎖</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
