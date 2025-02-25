import React from "react";
import Block from "@/components/block";
import { EvaluationProps, EvaluationCondition } from "@/components/evaluation";

const getEvaluationTextColor = (evaluation: EvaluationProps["evaluation"]) => {
  switch (evaluation) {
    case EvaluationCondition.Positive:
      return "text-green-500";
    case EvaluationCondition.Negative:
      return "text-red-500";
    case EvaluationCondition.Neutral:
      return "text-gray-500";
  }
};

interface Article {
  id: string;
  title: string;
  uniNumber: string;
  evaluation: {
    seller: EvaluationProps["evaluation"];
    buyer: EvaluationProps["evaluation"];
  };
  content: string;
  salaryRating: number;
  pressureRating: number;
  growthRating: number;
  infoRating: number;
  practicalRating: number;
  neutralRating: number;
  locked: boolean;
  postTime: string;
}

interface ArticleCardProps {
  className?: string;
  article: Article;
  handleArticleClick: (id: string) => void;
  showUnlockButton?: boolean; // 新增 props 控制解鎖按鈕
}

const ArticleCard: React.FC<ArticleCardProps> = ({
  className = "",
  article,
  handleArticleClick,
  showUnlockButton = true // 預設顯示
}) => {
  return (
    <Block className={`${article.locked ? "" : "cursor-pointer"} ${className}`}>
      <div
        onClick={() => !article.locked && handleArticleClick(article.id)}
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
      >
        {/* 主要資訊：公司名稱與其他資訊 */}
        <div className="flex justify-between items-start">
          <div className="flex flex-col">
            <h2 className="text-2xl font-bold text-indigo-600 flex justify-between">
              {article.title}
            </h2>
            <span className="mt-1 text-sm text-gray-500">
              {article.uniNumber}
            </span>
          </div>
          <span className="text-sm text-gray-500">{article.postTime}</span>
        </div>

        {/* 內文區塊 */}
        <p className="text-gray-700 mt-4 line-clamp-2">{article.content}</p>

        {/* 作者評比區塊 */}
        <div className="mt-4">
          <h3 className="text-lg font-bold text-gray-800">
            <div className="flex">
              評比
              <span
                className={`ml-2 ${getEvaluationTextColor(
                  article.evaluation.seller
                )}  font-semibold`}
              >
                {(
                  (article.salaryRating +
                    (6 - article.pressureRating) +
                    article.growthRating) /
                  3
                ).toFixed(1)}
              </span>
            </div>
          </h3>
          <div className="flex items-center gap-6 mt-2">
            <Rating label="薪資" value={article.salaryRating} />
            <Rating label="舒適度" value={6 - article.pressureRating} />
            <Rating label="成長性" value={article.growthRating} />
          </div>
        </div>

        {/* 觀看評比區塊 */}
        <div className="mt-4">
          <h3 className="text-lg font-bold text-gray-800">
            <div className="flex">
              觀看評比
              <span
                className={`ml-2 ${getEvaluationTextColor(
                  article.evaluation.buyer
                )} font-semibold`}
              >
                {(
                  (article.infoRating +
                    article.practicalRating +
                    article.neutralRating) /
                  3
                ).toFixed(1)}
              </span>
            </div>
          </h3>
          <div className="flex items-center gap-6 mt-2">
            <Rating label="資訊量" value={article.infoRating} />
            <Rating label="實用性" value={article.practicalRating} />
            <Rating label="中立度" value={article.neutralRating} />
          </div>
        </div>

        {/* 解鎖按鈕／已解鎖文字 */}
        {showUnlockButton && (
          <div className="mt-4 flex justify-between items-end">
            <span className="text-sm text-gray-500">
              UID<span className="ml-1 font-bold">{article.id}</span>
            </span>
            {article.locked ? (
              <button className="bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600 transition-colors">
                🔒 解鎖 ($5)
              </button>
            ) : (
              <span className="text-indigo-600 font-semibold">已解鎖</span>
            )}
          </div>
        )}
      </div>
    </Block>
  );
};

interface RatingProps {
  label: string;
  value: number;
}

const Rating: React.FC<RatingProps> = ({ label, value }) => (
  <div className="flex items-center">
    <span className="mr-1 font-semibold text-gray-500">{label}</span>
    <div className="text-yellow-500">
      {Array.from({ length: 5 }, (_, i) => (
        <span key={i}>{i < Math.floor(value) ? "★" : "☆"}</span>
      ))}
    </div>
  </div>
);

export default ArticleCard;
