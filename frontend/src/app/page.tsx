"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, User, Edit3, LogIn, ThumbsUp, ThumbsDown } from "lucide-react";
import { EvaluationCondition } from "@/components/evaluation";
import ArticleCard from "@/components/articleCard";

export default function Home() {
  const [search, setSearch] = useState("");
  const router = useRouter();

  const handleArticleClick = (id: string) => {
    router.push(`/article/${id}`);
  };

  // 每筆文章的 content 為 150 - 500 字心得，若超過兩行則透過 line-clamp-2 顯示省略號
  const articles = [
    {
      id: "c7a7d4e7-8d1e-4a92-b0c6-6d95e256c7c1",
      title: "台積電",
      uniNumber: "12345678",
      evaluation: {
        seller: EvaluationCondition.Positive,
        buyer: EvaluationCondition.Positive
      },
      content:
        "【台積電職場工作心得】在台積電工作的經歷充滿了挑戰與機會。從加入公司那一刻起，我便深受嚴謹企業文化的影響，感受到對品質不斷追求的熱情。每天在高壓環境下，我學會了如何保持冷靜並迅速解決問題，同時與團隊緊密合作，共同克服難關。這段經歷讓我提升了專業技能，並學會如何在壓力中尋找突破。",
      infoRating: 5,
      practicalRating: 4,
      neutralRating: 4,
      salaryRating: 4,
      pressureRating: 3,
      growthRating: 5,
      locked: true,
      postTime: "2025.01.01"
    },
    {
      id: "a1e4d4c7-7f3e-4a92-9bc6-8e85e167b2f3",
      title: "鴻海精密",
      uniNumber: "87654321",
      evaluation: {
        seller: EvaluationCondition.Positive,
        buyer: EvaluationCondition.Positive
      },
      content:
        "【鴻海精密面試心得】參與鴻海精密的面試讓我印象深刻。面試過程中，不僅測試了我的專業知識，還重視我的問題解決能力與團隊協作精神。面試官提出許多實戰案例，讓我在回答中反思過往經驗。這次挑戰讓我深知充分準備與自信的重要性。",
      infoRating: 4,
      practicalRating: 5,
      neutralRating: 4,
      salaryRating: 3,
      pressureRating: 4,
      growthRating: 4,
      locked: false,
      postTime: "2025.01.01"
    },
    {
      id: "e2f3b4a7-6c9e-4d83-a2c1-9d74e278f4e5",
      title: "華碩電腦",
      uniNumber: "23456789",
      evaluation: {
        seller: EvaluationCondition.Positive,
        buyer: EvaluationCondition.Positive
      },
      content:
        "【華碩電腦職場工作心得】在華碩電腦工作的期間，我切身體會到快速變化與創新精神的重要性。公司鼓勵員工不斷學習與實踐新技術，每日的工作挑戰使我在壓力下鍛鍊出更強的應變能力。與各部門間的緊密合作，更讓我學習到了跨領域溝通與協作的寶貴經驗。",
      infoRating: 4,
      practicalRating: 4,
      neutralRating: 5,
      salaryRating: 4,
      pressureRating: 4,
      growthRating: 4,
      locked: true,
      postTime: "2024.07.08"
    },
    {
      id: "d9f2e3a1-8c5e-4a91-b2d4-7f95e369c7f2",
      title: "聯發科技",
      uniNumber: "34567890",
      evaluation: {
        seller: EvaluationCondition.Positive,
        buyer: EvaluationCondition.Positive
      },
      content:
        "【聯發科技面試心得】面對聯發科技的面試，我經歷了一個充滿挑戰與學習的過程。面試官提出許多與實際工作緊密相關的問題，迫使我從過往經驗中尋找答案。這次面試不僅檢驗了我的技術能力，也讓我看到了自身不足，整個過程中，我學會了如何持續學習與自我提升。",
      infoRating: 4,
      practicalRating: 4,
      neutralRating: 4,
      salaryRating: 3,
      pressureRating: 3,
      growthRating: 4,
      locked: false,
      postTime: "2023.09.12"
    },
    {
      id: "f3e2b1d4-9c7e-4a92-8b5c-6e95e257a4f1",
      title: "中華電信",
      uniNumber: "45678901",
      evaluation: {
        seller: EvaluationCondition.Neutral,
        buyer: EvaluationCondition.Neutral
      },
      content:
        "【中華電信職場工作心得】在中華電信工作的經歷使我深刻體會到大企業的高效運作和嚴謹管理。公司制度完善，每個細節都要求精益求精，這讓我在日常工作中不斷突破自我，學會了如何迅速適應和解決問題。",
      infoRating: 3,
      practicalRating: 3,
      neutralRating: 3,
      salaryRating: 3,
      pressureRating: 3,
      growthRating: 3,
      locked: true,
      postTime: "2024.05.03"
    },
    {
      id: "c8a4d2e1-7f9e-4a92-b0c3-5d85e168b3f4",
      title: "大同企業",
      uniNumber: "56789012",
      evaluation: {
        seller: EvaluationCondition.Negative,
        buyer: EvaluationCondition.Negative
      },
      content:
        "【大同企業面試心得】參加大同企業的面試讓我深刻感受到公司對人才與創新的重視。面試中，面試官透過詳細問題全面考察我的專業知識和個人特質。這次經歷讓我明白，面試不僅僅是對知識的檢驗，更是一個自我反思與成長的過程。",
      infoRating: 3,
      practicalRating: 3,
      neutralRating: 2,
      salaryRating: 2,
      pressureRating: 4,
      growthRating: 3,
      locked: false,
      postTime: "2025.02.01"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
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
          <ArticleCard
            key={article.id}
            className="mb-6"
            article={article}
            handleArticleClick={handleArticleClick}
            showUnlockButton={true} // 你可以設定成 false 隱藏按鈕
          />
        ))}
      </div>
    </div>
  );
}
