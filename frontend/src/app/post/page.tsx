"use client";

import { useState, useRef, useEffect } from "react";
import { Star } from "lucide-react";
import Quill from "quill";
import HeaderBlock from "@/components/headerBlock";
import "quill/dist/quill.snow.css"; // Quill 的基本樣式

// 投稿頁面 Component
export default function PostPage() {
  const companies = [
    { id: "1", name: "A 公司", taxId: "12345678" },
    { id: "2", name: "B 公司", taxId: "87654321" },
    { id: "3", name: "C 公司", taxId: "13579246" }
  ];

  const [selectedCompany, setSelectedCompany] = useState<any>(null);
  const [ratings, setRatings] = useState({
    salary: 0,
    comfort: 0, // 舒適度
    growth: 0
  });
  const [averageRating, setAverageRating] = useState(0);
  const quillRef = useRef<any>(null);

  useEffect(() => {
    // 初始化 Quill
    if (!quillRef.current) {
      const quill = new Quill("#editorjs", {
        theme: "snow",
        modules: {
          toolbar: [
            [{ header: [1, 2, 3, false] }],
            [{ size: ["small", false, "large", "huge"] }], // 字體大小
            ["bold", "italic", "underline", "strike"],
            [{ color: [] }, { background: [] }], // 換字色與背景色
            [{ list: "ordered" }, { list: "bullet" }],
            [{ align: [] }],
            ["clean"]
          ]
        },
        placeholder: "撰寫您的工作心得...",
        formats: [
          "header",
          "size", // 支援字體大小
          "bold",
          "italic",
          "underline",
          "strike",
          "color",
          "background",
          "list",
          "align"
        ]
      });
      quillRef.current = quill;
    }
  }, []);

  useEffect(() => {
    // 計算平均評分
    const salaryScore = ratings.salary * (1 / 3);
    const comfortScore = ratings.comfort * (1 / 3);
    const growthScore = ratings.growth * (1 / 3);
    const totalScore = salaryScore + comfortScore + growthScore;

    setAverageRating(totalScore > 0 ? parseFloat(totalScore.toFixed(1)) : 0);
  }, [ratings]);

  const handleSubmit = () => {
    if (quillRef.current) {
      const content = quillRef.current.root.innerHTML;
      console.log("Article content: ", content);
      alert("文章已提交！");
    }
  };

  return (
    <>
      <HeaderBlock title="撰寫心得" subtitle="歡迎分享您的實際經驗" />
      <div className="bg-gray-50 min-h-screen pt-10 py-10 px-8">
        {/* 公司選擇 */}
        <div className="mb-10 w-full">
          <label className="block text-xl font-semibold mb-2 text-gray-800">
            選擇公司行號
          </label>
          <select
            className="w-full border border-gray-300 rounded-lg p-3 text-base mb-4"
            onChange={(e) =>
              setSelectedCompany(
                companies.find((company) => company.id === e.target.value)
              )
            }
          >
            <option value="">請選擇公司</option>
            {companies.map((company) => (
              <option key={company.id} value={company.id}>
                {company.name}
              </option>
            ))}
          </select>
          {selectedCompany && (
            <div className="text-gray-700 text-base">
              <p>公司名稱：{selectedCompany.name}</p>
              <p>統一編號：{selectedCompany.taxId}</p>
            </div>
          )}
        </div>

        {/* 文章內容 */}
        <div className="mb-10 w-full">
          <h3 className="text-xl font-bold mb-4 text-gray-800">文章內容</h3>
          <div
            id="editorjs"
            className="w-full border border-gray-300 rounded-lg bg-white min-h-[300px]"
          />
        </div>

        {/* 評價區 */}
        <div className="mb-10">
          <h3 className="text-xl font-bold mb-4 text-gray-800">整體評價</h3>
          {["薪資", "舒適度", "成長性"].map((label, index) => {
            const keys = ["salary", "comfort", "growth"] as const;
            return (
              <div className="mb-6" key={index}>
                <label className="block text-base font-semibold mb-2">
                  {label}
                </label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-8 h-8 cursor-pointer ${
                        star <= ratings[keys[index]]
                          ? "text-yellow-500"
                          : "text-gray-300"
                      }`}
                      onClick={() =>
                        setRatings((prev) => ({
                          ...prev,
                          [keys[index]]: prev[keys[index]] === star ? 0 : star
                        }))
                      }
                    />
                  ))}
                </div>
              </div>
            );
          })}

          <div className="text-xl font-semibold text-gray-800">
            平均評分： <span className="text-blue-600">{averageRating}</span> 分
          </div>
        </div>

        <div className="text-center">
          <button
            className="w-full max-w-md bg-blue-600 text-white text-lg py-3 rounded-lg hover:bg-blue-700 transition"
            onClick={handleSubmit}
          >
            提交文章
          </button>
        </div>
      </div>
    </>
  );
}
