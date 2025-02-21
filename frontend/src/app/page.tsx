"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, User, Edit3, LogIn, ThumbsUp, ThumbsDown } from "lucide-react";
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

  // 每筆文章的 content 為 150 - 500 字心得，若超過兩行則透過 line-clamp-2 顯示省略號
  const articles = [
    {
      id: 1,
      title: "台積電",
      uniNumber: "12345678",
      evaluation: "正",
      content:
        "【台積電職場工作心得】在台積電工作的經歷充滿了挑戰與機會。從加入公司那一刻起，我便深受嚴謹企業文化的影響，感受到對品質不斷追求的熱情。每天在高壓環境下，我學會了如何保持冷靜並迅速解決問題，同時與團隊緊密合作，共同克服難關。這段經歷讓我提升了專業技能，並學會如何在壓力中尋找突破。",
      infoRating: 5,
      practicalRating: 4,
      neutralRating: 4,
      // 作者評比相關指標
      salaryRating: 4,
      pressureRating: 3,
      growthRating: 5,
      locked: true
    },
    {
      id: 2,
      title: "鴻海精密",
      uniNumber: "87654321",
      evaluation: "正",
      content:
        "【鴻海精密面試心得】參與鴻海精密的面試讓我印象深刻。面試過程中，不僅測試了我的專業知識，還重視我的問題解決能力與團隊協作精神。面試官提出許多實戰案例，讓我在回答中反思過往經驗。這次挑戰讓我深知充分準備與自信的重要性。",
      infoRating: 4,
      practicalRating: 5,
      neutralRating: 4,
      salaryRating: 3,
      pressureRating: 4,
      growthRating: 4,
      locked: false
    },
    {
      id: 3,
      title: "華碩電腦",
      uniNumber: "23456789",
      evaluation: "正",
      content:
        "【華碩電腦職場工作心得】在華碩電腦工作的期間，我切身體會到快速變化與創新精神的重要性。公司鼓勵員工不斷學習與實踐新技術，每日的工作挑戰使我在壓力下鍛鍊出更強的應變能力。與各部門間的緊密合作，更讓我學習到了跨領域溝通與協作的寶貴經驗。",
      infoRating: 4,
      practicalRating: 4,
      neutralRating: 5,
      salaryRating: 4,
      pressureRating: 4,
      growthRating: 4,
      locked: true
    },
    {
      id: 4,
      title: "聯發科技",
      uniNumber: "34567890",
      evaluation: "正",
      content:
        "【聯發科技面試心得】面對聯發科技的面試，我經歷了一個充滿挑戰與學習的過程。面試官提出許多與實際工作緊密相關的問題，迫使我從過往經驗中尋找答案。這次面試不僅檢驗了我的技術能力，也讓我看到了自身不足，整個過程中，我學會了如何持續學習與自我提升。",
      infoRating: 4,
      practicalRating: 4,
      neutralRating: 4,
      salaryRating: 3,
      pressureRating: 3,
      growthRating: 4,
      locked: false
    },
    {
      id: 5,
      title: "中華電信",
      uniNumber: "45678901",
      evaluation: "正",
      content:
        "【中華電信職場工作心得】在中華電信工作的經歷使我深刻體會到大企業的高效運作和嚴謹管理。公司制度完善，每個細節都要求精益求精，這讓我在日常工作中不斷突破自我，學會了如何迅速適應和解決問題。",
      infoRating: 5,
      practicalRating: 4,
      neutralRating: 3,
      salaryRating: 4,
      pressureRating: 3,
      growthRating: 3,
      locked: true
    },
    {
      id: 6,
      title: "大同企業",
      uniNumber: "56789012",
      evaluation: "負",
      content:
        "【大同企業面試心得】參加大同企業的面試讓我深刻感受到公司對人才與創新的重視。面試中，面試官透過詳細問題全面考察我的專業知識和個人特質。這次經歷讓我明白，面試不僅僅是對知識的檢驗，更是一個自我反思與成長的過程。",
      infoRating: 3,
      practicalRating: 3,
      neutralRating: 2,
      salaryRating: 2,
      pressureRating: 4,
      growthRating: 3,
      locked: false
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Navbar */}
      <nav className="bg-white shadow py-4 px-6 flex justify-between items-center border-b border-gray-200">
        <div className="flex items-center gap-2">
          <Image src="/logo.png" alt="Logo" width={40} height={40} />
          <h1 className="text-xl font-bold text-indigo-600">專業職場</h1>
        </div>
        <div className="flex items-center gap-4">
          <button
            className="flex items-center bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600 transition-colors"
            onClick={handlePostRedirect}
          >
            <Edit3 className="w-5 h-5 mr-2" /> 我要投稿
          </button>
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

      {/* Hero Section */}
      <header className="text-center py-12 bg-gradient-to-r from-blue-50 to-blue-200">
        <h2 className="text-3xl font-bold text-gray-800">
          分享你的職場經驗，獲取額外收入
        </h2>
        <p className="mt-2 text-lg text-gray-700">
          瀏覽真實職場心得，提升你的職涯規劃
        </p>
      </header>

      {/* Search Bar */}
      <div className="max-w-2xl mx-auto mt-6 px-4">
        <div className="flex items-center bg-white shadow rounded-lg p-2 border border-purple-200">
          <Search className="w-5 h-5 text-indigo-500 ml-2" />
          <input
            type="text"
            placeholder="搜尋文章..."
            className="w-full p-2 border-none focus:ring-0 outline-none text-gray-800"
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
            className={`relative bg-white shadow rounded-lg p-6 mb-6 border border-gray-200 transition-transform duration-300 ${
              article.locked ? "" : "cursor-pointer"
            }`}
            style={{
              transform: article.locked ? "none" : "scale(1)",
              transition: "transform 0.3s"
            }}
            onMouseEnter={(e) => {
              if (!article.locked) {
                e.currentTarget.style.transform = "scale(1.02)";
              }
            }}
            onMouseLeave={(e) => {
              if (!article.locked) {
                e.currentTarget.style.transform = "scale(1)";
              }
            }}
            onClick={() => !article.locked && handleArticleClick(article.id)}
          >
            {/* 主要資訊：公司名稱與其他資訊 */}
            <div className="flex justify-between items-start">
              <div className="flex flex-col">
                <h2 className="text-2xl font-bold text-indigo-600">
                  {article.title}
                </h2>
                <span className="mt-1 text-sm text-gray-500">
                  {article.uniNumber}
                </span>
              </div>
              <div className="mt-1">
                {article.evaluation === "正" ? (
                  <ThumbsUp className="w-6 h-6 text-green-500" />
                ) : (
                  <ThumbsDown className="w-6 h-6 text-red-500" />
                )}
              </div>
            </div>

            {/* 內文區塊 */}
            <p className="text-gray-700 mt-4 line-clamp-2">{article.content}</p>

            {/* 作者評比區塊 (放最前面) */}
            <div className="mt-4">
              <h3 className="text-lg font-bold text-gray-800">
                評比
                <span className="ml-2 text-gray-800 font-semibold">
                  {(
                    (article.salaryRating +
                      article.pressureRating +
                      article.growthRating) /
                    3
                  ).toFixed(1)}
                </span>
              </h3>
              <div className="flex items-center gap-6 mt-2">
                <div className="flex items-center">
                  <span className="mr-1 font-semibold text-gray-500">薪資</span>
                  <div className="text-yellow-500">
                    {Array.from({ length: 5 }, (_, i) => (
                      <span key={i}>
                        {i < Math.floor(article.salaryRating) ? "★" : "☆"}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex items-center">
                  <span className="mr-1 font-semibold text-gray-500">壓力</span>
                  <div className="text-yellow-500">
                    {Array.from({ length: 5 }, (_, i) => (
                      <span key={i}>
                        {i < Math.floor(article.pressureRating) ? "★" : "☆"}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex items-center">
                  <span className="mr-1 font-semibold text-gray-500">成長</span>
                  <div className="text-yellow-500">
                    {Array.from({ length: 5 }, (_, i) => (
                      <span key={i}>
                        {i < Math.floor(article.growthRating) ? "★" : "☆"}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* 觀看評比區塊 (放後面) */}
            <div className="mt-4">
              <h3 className="text-lg font-bold text-gray-800">
                觀看評比
                <span className="ml-2 text-gray-800 font-semibold">
                  {(
                    (article.infoRating +
                      article.practicalRating +
                      article.neutralRating) /
                    3
                  ).toFixed(1)}
                </span>
              </h3>
              <div className="flex items-center gap-6 mt-2">
                <div className="flex items-center">
                  <span className="mr-1 font-semibold text-gray-500">
                    資訊量
                  </span>
                  <div className="text-yellow-500">
                    {Array.from({ length: 5 }, (_, i) => (
                      <span key={i}>
                        {i < Math.floor(article.infoRating) ? "★" : "☆"}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex items-center">
                  <span className="mr-1 font-semibold text-gray-500">
                    實用性
                  </span>
                  <div className="text-yellow-500">
                    {Array.from({ length: 5 }, (_, i) => (
                      <span key={i}>
                        {i < Math.floor(article.practicalRating) ? "★" : "☆"}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex items-center">
                  <span className="mr-1 font-semibold text-gray-500">
                    中立度
                  </span>
                  <div className="text-yellow-500">
                    {Array.from({ length: 5 }, (_, i) => (
                      <span key={i}>
                        {i < Math.floor(article.neutralRating) ? "★" : "☆"}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* 解鎖 / 已解鎖 按鈕 (放在觀看評比下一行) */}
            <div className="mt-4 flex justify-end">
              {article.locked ? (
                <button className="bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600 transition-colors">
                  🔒 解鎖 ($5)
                </button>
              ) : (
                <span className="text-indigo-600 font-semibold">已解鎖</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
