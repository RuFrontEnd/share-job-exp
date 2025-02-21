"use client";

import { useState, useRef, useEffect } from "react";
import { Star } from "lucide-react";

export default function PostPage() {
  const [title, setTitle] = useState("");
  const [rating, setRating] = useState(0);
  const editorRef = useRef<any>(null);

  useEffect(() => {
    // Lazy Load EditorJS 與工具
    async function loadEditor() {
      const EditorJS = (await import("@editorjs/editorjs")).default;
      const Header = (await import("@editorjs/header")).default;
      const List = (await import("@editorjs/list")).default;

      if (!editorRef.current) {
        editorRef.current = new EditorJS({
          holder: "editorjs",
          tools: {
            header: Header,
            list: List,
          },
        });
      }
    }

    loadEditor();

    return () => {
      if (editorRef.current) {
        editorRef.current.destroy();
        editorRef.current = null;
      }
    };
  }, []);

  const handleSubmit = () => {
    if (editorRef.current) {
      editorRef.current
        .save()
        .then((outputData: any) => {
          console.log("Article data: ", outputData);
          alert("文章已提交！");
        })
        .catch((error: any) => {
          console.log("Saving failed: ", error);
        });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="container mx-auto bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-3xl font-bold mb-6">撰寫工作心得</h1>

        <input
          type="text"
          placeholder="文章標題"
          className="w-full border border-gray-300 rounded-lg p-3 mb-4"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <div className="mb-6">
          <h3 className="text-xl font-bold mb-2">文章內容</h3>
          <div
            id="editorjs"
            className="border border-gray-300 rounded-lg p-4 bg-white"
          ></div>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-bold mb-2">整體評價</h3>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`w-8 h-8 cursor-pointer ${
                  star <= rating ? "text-yellow-500" : "text-gray-300"
                }`}
                onClick={() => setRating(star)}
              />
            ))}
          </div>
        </div>

        <button
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
          onClick={handleSubmit}
        >
          提交文章
        </button>
      </div>
    </div>
  );
}
