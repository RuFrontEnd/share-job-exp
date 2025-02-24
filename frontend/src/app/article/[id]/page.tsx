"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Star } from "lucide-react";
import Button from "@/components/button";

// 渲染星號：★ 和 ☆
const renderSMStars = (rating: number | undefined) => {
  return (
    <span className="text-yellow-500">
      {Array.from({ length: 5 }, (_, i) =>
        i < (rating ?? 0) ? "★" : "☆"
      ).join(" ")}
    </span>
  );
};

export default function ArticlePage() {
  const params = useParams();
  const id = params?.id ? parseInt(params.id as string) : null;

  // 更新 Article 型別，包含各指標、發文時間與職涯資料
  interface Article {
    id: number;
    title: string;
    content: string;
    rating: number;
    uniNumber: string;
    salaryRating: number | string;
    pressureRating: number | string;
    growthRating: number | string;
    infoRating: number | string;
    practicalRating: number | string;
    neutralRating: number | string;
    evaluation: "正" | "負";
    postTime: string;
    jobTitle: string;
    jobType: string;
    education: string;
    totalExperience: string;
    currentJobYears: string;
    avgWorkHoursPerDay: string;
    salaryType: "monthly" | "daily" | "hourly";
    monthlySalary?: string;
    dailySalary?: string;
    dailyWorkingDays?: string;
    hourlySalary?: string;
    dailyWorkingHours?: string;
    monthlyWorkingDays?: string;
    yearEndBonus?: string;
    profitBonus?: string;
    festivalBonus?: string;
    otherCompensation?: string;
    annualSalary: number;
    welfare: string[];
    price: string;
  }

  interface Comment {
    id: number;
    author: string;
    content: string;
    date: string;
    userInfoRating?: number;
    userPracticalRating?: number;
    userNeutralRating?: number;
  }

  const [article, setArticle] = useState<Article | null>(null);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState<Comment[]>([
    {
      id: 1,
      author: "小明",
      content: "這篇文章很有幫助！",
      date: "2025.02.01",
      userInfoRating: 4,
      userPracticalRating: 5,
      userNeutralRating: 4
    },
    {
      id: 2,
      author: "小華",
      content: "學到了很多技巧，感謝分享！",
      date: "2025.02.05",
      userInfoRating: 3,
      userPracticalRating: 4,
      userNeutralRating: 3
    }
  ]);

  // 使用者評論評分狀態
  const [userInfoRating, setUserInfoRating] = useState(0);
  const [userPracticalRating, setUserPracticalRating] = useState(0);
  const [userNeutralRating, setUserNeutralRating] = useState(0);

  useEffect(() => {
    const articles: Article[] = [
      {
        id: 1,
        title: "華碩電腦股份有限公司",
        content:
          "在華碩電腦股份有限公司的工作經歷中，我深刻感受到企業對於員工專業成長與身心健康的重視。公司提供完善的培訓資源和技術研討，鼓勵大家積極參與創新項目；同時，辦公環境現代化、設備齊全，讓人能夠在舒適且高效的氛圍下完成各項任務。雖然工作節奏緊湊且壓力較大，但管理層不斷推動彈性工作制度和內部溝通平台，讓員工能夠及時調整狀態並取得平衡。每個部門都強調團隊合作，並定期舉辦團建活動，加強彼此間的信任與互助。正因為如此，無論是在專案執行還是日常工作中，大家都能夠充滿熱情與活力，共同面對挑戰，實現個人與公司的雙贏局面。這種充滿人文關懷與創新精神的工作環境，使我對未來充滿期待，也相信公司必將在激烈競爭中持續領先！",
        rating: 4.8,
        uniNumber: "12345678",
        salaryRating: 4,
        pressureRating: 3,
        growthRating: 5,
        infoRating: 5,
        practicalRating: 4,
        neutralRating: 4,
        evaluation: "正",
        postTime: "2025.02.01",
        jobTitle: "軟體工程師",
        jobType: "全職",
        education: "國立台灣大學 資訊工程學系",
        totalExperience: "5",
        currentJobYears: "3",
        avgWorkHoursPerDay: "8",
        salaryType: "monthly",
        monthlySalary: "50000",
        yearEndBonus: "20000",
        profitBonus: "10000",
        festivalBonus: "5000",
        otherCompensation: "3000",
        annualSalary: 50000 * 12 + 20000 + 10000 + 5000 + 3000,
        welfare: ["健康檢查", "租屋補助", "員工旅遊"],
        price: "3000"
      }
    ];
    const foundArticle = id ? articles.find((a) => a.id === id) : undefined;
    setArticle(foundArticle || articles[0]);
  }, [id]);

  const handleCommentSubmit = () => {
    if (comment.trim() !== "") {
      const newComment: Comment = {
        id: comments.length + 1,
        author: "訪客",
        content: comment,
        date: new Date().toISOString().slice(0, 10),
        userInfoRating,
        userPracticalRating,
        userNeutralRating
      };
      setComments([newComment, ...comments]);
      setComment("");
      setUserInfoRating(0);
      setUserPracticalRating(0);
      setUserNeutralRating(0);
    }
  };

  const renderStars = (filled: number, size: string = "w-5 h-5") => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`${size} text-yellow-500 cursor-pointer`}
        fill={i < filled ? "currentColor" : "none"}
        stroke="currentColor"
      />
    ));
  };

  if (!article) {
    return <p className="text-base text-gray-500">文章加載中...</p>;
  }

  // 計算各項評分
  const salary = Number(article.salaryRating);
  const pressure = Number(article.pressureRating);
  const growth = Number(article.growthRating);
  const comfort = 6 - pressure;
  const overallRating = ((salary + comfort + growth) / 3).toFixed(1);

  const info = Number(article.infoRating);
  const practical = Number(article.practicalRating);
  const neutral = Number(article.neutralRating);
  const overallViewRating = ((info + practical + neutral) / 3).toFixed(1);

  const averageUserRating = (
    (userInfoRating + userPracticalRating + userNeutralRating) /
    3
  ).toFixed(1);

  // 假的 UID
  const fakeUID = "123e4567-e89b-12d3-a456-426614174000";

  return (
    <div className="min-h-screen bg-gray-50 py-10 overflow-x-hidden">
      <div className="container mx-auto p-8">
        {/* 發文日期 (右側) */}
        <div className="mb-4 flex justify-end">
          <span className="text-sm text-gray-500">{article.postTime}</span>
        </div>

        {/* 公司文章標題與價格 */}
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-4xl font-bold text-indigo-600">
            {article.title}
          </h1>
          <span className="text-2xl font-bold text-green-600">
            $ {article.price}
          </span>
        </div>

        {/* 統編與 UID */}
        <p className="text-lg text-gray-600">{article.uniNumber}</p>
        <div className="mb-6">
          <span className="text-sm text-gray-500">
            UID<span className="ml-1 font-bold">{fakeUID}</span>
          </span>
        </div>

        {/* 文章內容 */}
        <p className="text-base text-gray-700 mb-6 leading-relaxed">
          {article.content}
        </p>

        {/* 基本資訊 */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-2">基本資訊</h2>
          <div className="mb-6 space-y-2">
            <p>
              <span className="font-semibold">職稱：</span>
              {article.jobTitle}
            </p>
            <p>
              <span className="font-semibold">職務性質：</span>
              {article.jobType}
            </p>
            <p>
              <span className="font-semibold">學歷：</span>
              {article.education ? article.education : "不公開"}
            </p>
            <p>
              <span className="font-semibold">年資：</span>
              總年資 {article.totalExperience} 年， 在職年資{" "}
              {article.currentJobYears} 年
            </p>
            <p>
              <span className="font-semibold">平均工時：</span>
              {article.avgWorkHoursPerDay} 小時/天
            </p>
          </div>

          {/* 薪資資訊 */}
          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-2">薪資資訊</h2>
            {article.salaryType === "monthly" && (
              <div className="space-y-2">
                <p>
                  <span className="font-semibold">薪資制度：</span>月薪制
                </p>
                <p>
                  <span className="font-semibold">月薪：</span>
                  {article.monthlySalary} 元
                </p>
              </div>
            )}
            {article.salaryType === "daily" && (
              <div className="space-y-2">
                <p>
                  <span className="font-semibold">薪資制度：</span>日薪制
                </p>
                <p>
                  <span className="font-semibold">日薪：</span>
                  {article.dailySalary} 元
                </p>
                <p>
                  <span className="font-semibold">每月工作天數：</span>
                  {article.dailyWorkingDays} 天
                </p>
              </div>
            )}
            {article.salaryType === "hourly" && (
              <div className="space-y-2">
                <p>
                  <span className="font-semibold">薪資制度：</span>時薪制
                </p>
                <p>
                  <span className="font-semibold">時薪：</span>
                  {article.hourlySalary} 元
                </p>
                <p>
                  <span className="font-semibold">日工時：</span>
                  {article.dailyWorkingHours} 小時
                </p>
                <p>
                  <span className="font-semibold">每月工作天數：</span>
                  {article.monthlyWorkingDays} 天
                </p>
              </div>
            )}
            <div className="mt-2 space-y-2">
              <p>
                <span className="font-semibold">年終：</span>
                {article.yearEndBonus} 元
              </p>
              <p>
                <span className="font-semibold">分紅：</span>
                {article.profitBonus} 元
              </p>
              <p>
                <span className="font-semibold">三節：</span>
                {article.festivalBonus} 元
              </p>
              <p>
                <span className="font-semibold">其它補助：</span>
                {article.otherCompensation} 元
              </p>
              <p className="mt-2">
                <span className="font-semibold">最終年薪：</span>
                {article.annualSalary.toLocaleString()} 元
              </p>
            </div>
          </div>

          {/* 福利 */}
          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-2">福利</h2>
            <p className="text-base text-gray-700">
              {article.welfare.join(", ")}
            </p>
          </div>
        </div>

        {/* 評比區塊 */}
        <div className="mt-4">
          <h3 className="text-lg font-bold text-gray-800">
            評比
            <span className="ml-2 text-gray-800 font-semibold">
              {overallRating}
            </span>
          </h3>
          <div className="flex gap-6 mt-2">
            <div className="flex items-center">
              <span className="mr-1 font-semibold text-gray-500">薪資</span>
              <div className="ml-2 flex gap-2">{renderStars(salary)}</div>
            </div>
            <div className="flex items-center">
              <span className="mr-1 font-semibold text-gray-500">舒適度</span>
              <div className="ml-2 flex gap-2">{renderStars(comfort)}</div>
            </div>
            <div className="flex items-center">
              <span className="mr-1 font-semibold text-gray-500">成長性</span>
              <div className="ml-2 flex gap-2">{renderStars(growth)}</div>
            </div>
          </div>
        </div>

        {/* 觀看評比區塊 */}
        <div className="mt-4">
          <h3 className="text-lg font-bold text-gray-800">
            觀看評比
            <span className="ml-2 text-gray-800 font-semibold">
              {overallViewRating}
            </span>
          </h3>
          <div className="flex gap-6 mt-2">
            <div className="flex items-center">
              <span className="mr-1 font-semibold text-gray-500">資訊量</span>
              <div className="ml-2 flex gap-2">{renderStars(info)}</div>
            </div>
            <div className="flex items-center">
              <span className="mr-1 font-semibold text-gray-500">實用性</span>
              <div className="ml-2 flex gap-2">{renderStars(practical)}</div>
            </div>
            <div className="flex items-center">
              <span className="mr-1 font-semibold text-gray-500">中立度</span>
              <div className="ml-2 flex gap-2">{renderStars(neutral)}</div>
            </div>
          </div>
        </div>

        {/* 分隔線 */}
        <div className="w-screen relative left-1/2 -translate-x-1/2 border-t border-gray-300 my-8"></div>

        {/* 評論區塊 */}
        <div className="mt-4">
          <h3 className="text-lg font-bold text-gray-800 mb-2">評論</h3>
          <textarea
            placeholder="撰寫你的留言..."
            rows={5}
            className="w-full bg-white border border-gray-300 rounded-lg p-3 mb-4 text-base resize-none"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <div>
            <h4 className="text-lg font-bold text-gray-800 mb-2">
              評分
              <span className="ml-2 text-base text-gray-600">
                {averageUserRating}
              </span>
            </h4>
            <div className="flex gap-4 mb-4">
              <div className="flex items-center">
                <span className="mr-1 font-semibold text-gray-500">資訊量</span>
                <div className="ml-2 flex gap-2">
                  {Array.from({ length: 5 }, (_, i) => (
                    <Star
                      key={i}
                      onClick={() =>
                        setUserInfoRating((prev) =>
                          prev === i + 1 ? 0 : i + 1
                        )
                      }
                      className="w-5 h-5 text-yellow-500 cursor-pointer"
                      fill={i < userInfoRating ? "currentColor" : "none"}
                      stroke="currentColor"
                    />
                  ))}
                </div>
              </div>
              <div className="flex items-center">
                <span className="mr-1 font-semibold text-gray-500">實用性</span>
                <div className="ml-2 flex gap-2">
                  {Array.from({ length: 5 }, (_, i) => (
                    <Star
                      key={i}
                      onClick={() =>
                        setUserPracticalRating((prev) =>
                          prev === i + 1 ? 0 : i + 1
                        )
                      }
                      className="w-5 h-5 text-yellow-500 cursor-pointer"
                      fill={i < userPracticalRating ? "currentColor" : "none"}
                      stroke="currentColor"
                    />
                  ))}
                </div>
              </div>
              <div className="flex items-center">
                <span className="mr-1 font-semibold text-gray-500">中立度</span>
                <div className="ml-2 flex gap-2">
                  {Array.from({ length: 5 }, (_, i) => (
                    <Star
                      key={i}
                      onClick={() =>
                        setUserNeutralRating((prev) =>
                          prev === i + 1 ? 0 : i + 1
                        )
                      }
                      className="w-5 h-5 text-yellow-500 cursor-pointer"
                      fill={i < userNeutralRating ? "currentColor" : "none"}
                      stroke="currentColor"
                    />
                  ))}
                </div>
              </div>
            </div>
            <div className="flex justify-center">
              <Button
                className="mt-4 w-full max-w-sm"
                text="提交留言"
                onClick={handleCommentSubmit}
              />
            </div>
          </div>
          <div className="mt-8">
            <h3 className="text-lg font-bold text-gray-800">
              所有評論 {`(${comments.length})`}
            </h3>
            <ul className="space-y-6 mt-4">
              {comments.map((c) => {
                const totalScore = (
                  ((c.userInfoRating ?? 0) +
                    (c.userPracticalRating ?? 0) +
                    (c.userNeutralRating ?? 0)) /
                  3
                ).toFixed(1);

                return (
                  <li key={c.id} className="border-b pb-4 pt-2">
                    {/* 評分區塊：與總分同排顯示 */}
                    <div className="flex justify-between items-center mb-2 text-gray-600 text-sm">
                      <div className="flex gap-4 items-center">
                        <span>資訊量 {renderSMStars(c.userInfoRating)}</span>
                        <span>
                          實用性 {renderSMStars(c.userPracticalRating)}
                        </span>
                        <span>中立度 {renderSMStars(c.userNeutralRating)}</span>
                      </div>
                      <span className="font-bold text-gray-800">
                        評分 {totalScore} 分
                      </span>
                    </div>
                    <p className="text-base font-bold text-gray-800 mb-1">
                      {c.author}
                    </p>
                    <p className="text-base text-gray-800 mb-2">{c.content}</p>
                    <p className="text-sm text-gray-500 text-right mt-2">
                      {c.date}
                    </p>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
