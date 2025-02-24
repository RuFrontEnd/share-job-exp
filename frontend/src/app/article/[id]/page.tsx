"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Star } from "lucide-react";
import Button from "@/components/button";

export default function ArticlePage() {
  const params = useParams();
  const id = params?.id ? parseInt(params.id as string) : null;

  // 更新 Article 型別，包含各指標的評分與其他必要資料
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
  }

  interface Comment {
    id: number;
    author: string;
    content: string;
    date: string;
    // 若要將使用者評分儲存至評論，可額外加入：
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
      date: "2025-02-01"
    },
    {
      id: 2,
      author: "小華",
      content: "學到了很多技巧，感謝分享！",
      date: "2025-02-05"
    }
  ]);

  // 新增使用者針對評論區提供的三項評分 state
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
        evaluation: "正"
      }
    ];
    const foundArticle = id ? articles.find((a) => a.id === id) : undefined;
    setArticle(foundArticle || articles[0]);
  }, [id]);

  const handleCommentSubmit = () => {
    if (comment.trim() !== "") {
      // 將使用者評分納入評論資料中
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
      // 重置使用者評分
      setUserInfoRating(0);
      setUserPracticalRating(0);
      setUserNeutralRating(0);
    }
  };

  // 輔助函式：根據傳入評分渲染星星（尺寸為 w-5 h-5）
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

  // 將各評分轉為數字並計算平均
  const salary = Number(article.salaryRating);
  const pressure = Number(article.pressureRating);
  const growth = Number(article.growthRating);
  const comfort = 6 - pressure; // 舒適度
  const overallRating = ((salary + comfort + growth) / 3).toFixed(1);

  const info = Number(article.infoRating);
  const practical = Number(article.practicalRating);
  const neutral = Number(article.neutralRating);
  const overallViewRating = ((info + practical + neutral) / 3).toFixed(1);

  // 使用者評分的三項指標平均分數
  const averageUserRating = (
    (userInfoRating + userPracticalRating + userNeutralRating) /
    3
  ).toFixed(1);

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="container mx-auto p-8">
        {/* 公司標題與統編 */}
        <h1 className="text-4xl font-bold mb-2 text-indigo-600">{article.title}</h1>
        <p className="text-lg text-gray-600 mb-6">{article.uniNumber}</p>
        <p className="text-base text-gray-700 mb-6 leading-relaxed">
          {article.content}
        </p>

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

        {/* 全螢幕寬的 divider */}
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

          {/* 使用者針對這則文章進行評分 */}
          <div>
            <h4 className="text-lg font-bold text-gray-800 mb-2">
              評分
              {/* 在標題後方加入三項指標的平均分數 */}
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

          {/* 所有評論區塊 */}
          <div className="mt-8">
            <h3 className="text-lg font-bold text-gray-800">所有評論</h3>
            <ul className="space-y-4 mt-4">
              {comments.map((c) => (
                <li key={c.id} className="border-b pb-2">
                  <p className="text-base text-gray-800">
                    <strong>{c.author}</strong>：{c.content}
                  </p>
                  <p className="text-sm text-gray-500">{c.date}</p>
                  {c.userInfoRating !== undefined && (
                    <div className="flex gap-2 mt-2 text-sm text-gray-600">
                      <span>資訊量：{c.userInfoRating} 星</span>
                      <span>實用性：{c.userPracticalRating} 星</span>
                      <span>中立度：{c.userNeutralRating} 星</span>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
