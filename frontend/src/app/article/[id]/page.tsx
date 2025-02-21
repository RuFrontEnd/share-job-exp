"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Star } from "lucide-react";

export default function ArticlePage() {
  const params = useParams();
  const id = params?.id ? parseInt(params.id as string) : null;

  interface Article {
    id: number;
    title: string;
    content: string;
    rating: number;
  }

  interface Comment {
    id: number;
    author: string;
    content: string;
    date: string;
  }

  const [article, setArticle] = useState<Article | null>(null);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState<Comment[]>([ // 模擬留言資料
    { id: 1, author: "小明", content: "這篇文章很有幫助！", date: "2025-02-01" },
    { id: 2, author: "小華", content: "學到了很多技巧，感謝分享！", date: "2025-02-05" }
  ]);
  const [rating, setRating] = useState(0);

  useEffect(() => {
    // 模擬 API 請求，根據 id 獲取文章資料
    const articles = [
      { id: 2, title: "遠端工作心法", content: "探索如何在遠端工作時保持高效，並避免職場孤立的感覺...", rating: 4.8 },
      { id: 4, title: "職場時間管理技巧", content: "學會優先處理任務，提升生產力，減少加班壓力...", rating: 4.7 },
    ];
    const foundArticle = id ? articles.find((a) => a.id === id) : null;
    setArticle(foundArticle ?? null);
  }, [id]);

  const handleCommentSubmit = () => {
    if (comment.trim() !== "") {
      const newComment = {
        id: comments.length + 1,
        author: "訪客",
        content: comment,
        date: new Date().toISOString().slice(0, 10),
      };
      setComments([newComment, ...comments]);
      setComment("");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="container mx-auto p-8">
        {article ? (
          <>
            <h1 className="text-3xl font-bold mb-4">{article.title}</h1>
            <p className="text-gray-700 mb-6">{article.content}</p>

            <div className="mb-6">
              <h3 className="text-xl font-bold mb-2">整體評價</h3>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-8 h-8 cursor-pointer ${star <= rating ? 'text-yellow-500' : 'text-gray-300'}`}
                    onClick={() => setRating(star)}
                  />
                ))}
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-xl font-bold mb-2">留言分享心得</h3>
              <textarea
                placeholder="撰寫你的留言..."
                className="w-full border border-gray-300 rounded-lg p-3"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-2 hover:bg-blue-600"
                onClick={handleCommentSubmit}
              >
                提交留言
              </button>
            </div>

            <div className="mt-6">
              <h3 className="text-xl font-bold mb-2">所有留言</h3>
              <ul className="space-y-4">
                {comments.map((c) => (
                  <li key={c.id} className="border-b pb-2">
                    <p className="text-gray-800"><strong>{c.author}</strong>：{c.content}</p>
                    <p className="text-gray-500 text-sm">{c.date}</p>
                  </li>
                ))}
              </ul>
            </div>
          </>
        ) : (
          <p className="text-gray-500">文章加載中...</p>
        )}
      </div>
    </div>
  );
}
