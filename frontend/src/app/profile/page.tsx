"use client";

import { useState } from "react";
import { Edit3, ThumbsUp, ThumbsDown } from "lucide-react";
import HeaderBlock from "@/components/headerBlock";
import Block from "@/components/block";
import Button from "@/components/button";

export default function ProfilePage() {
  // 文章介面，包含首頁文章格所需屬性
  interface Article {
    id: number;
    title: string;
    uniNumber: string;
    evaluation: string;
    content: string;
    salaryRating: number;
    pressureRating: number;
    growthRating: number;
    infoRating: number;
    practicalRating: number;
    neutralRating: number;
    locked: boolean;
  }

  // 個人資料介面，包含基本資料、學歷資訊與文章列表
  interface UserType {
    realName: string;
    nickname: string;
    email: string;
    password: string;
    account: string;
    education: string;
    articles: Article[];
    unlocked: Article[];
  }

  // 模擬初始資料
  const initialProfile: UserType = {
    realName: "王小明",
    nickname: "工作達人",
    email: "example@example.com",
    password: "********",
    account: "1234-5678-9012",
    education: "國立台灣大學 資訊工程學士",
    articles: [
      {
        id: 1,
        title: "我的職場經驗分享",
        uniNumber: "12345678",
        evaluation: "正",
        content: "【我的職場經驗分享】內容內容內容內容內容...",
        salaryRating: 4,
        pressureRating: 3,
        growthRating: 5,
        infoRating: 4,
        practicalRating: 4,
        neutralRating: 4,
        locked: false
      },
      {
        id: 2,
        title: "如何提升工作效率",
        uniNumber: "87654321",
        evaluation: "負",
        content: "【如何提升工作效率】內容內容內容內容內容...",
        salaryRating: 3,
        pressureRating: 4,
        growthRating: 3,
        infoRating: 3,
        practicalRating: 3,
        neutralRating: 3,
        locked: true
      }
    ],
    unlocked: [
      {
        id: 3,
        title: "已解鎖文章範例",
        uniNumber: "23456789",
        evaluation: "正",
        content: "【已解鎖文章範例】內容內容內容內容內容...",
        salaryRating: 5,
        pressureRating: 2,
        growthRating: 4,
        infoRating: 5,
        practicalRating: 4,
        neutralRating: 4,
        locked: false
      }
    ]
  };

  // 用於分頁切換，目前有「發表的文章」與「解鎖的文章」
  const [selectedTab, setSelectedTab] = useState("articles");

  // 以下為「個人基本資料」部分（包含編輯功能）
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    realName: initialProfile.realName,
    nickname: initialProfile.nickname,
    email: initialProfile.email,
    password: initialProfile.password,
    account: initialProfile.account,
    education: initialProfile.education
  });

  const handleSave = () => {
    // 此處可加入 API 呼叫更新資料
    setIsEditing(false);
  };

  const handleCancel = () => {
    setProfileData({
      realName: initialProfile.realName,
      nickname: initialProfile.nickname,
      email: initialProfile.email,
      password: initialProfile.password,
      account: initialProfile.account,
      education: initialProfile.education
    });
    setIsEditing(false);
  };

  // 渲染個人基本資料（含編輯功能），使用卡片風格框起來
  const renderBasicInfo = () => {
    return (
      <Block>
        <div className="space-y-6 text-lg">
          {/* 標題與編輯按鈕 */}
          <div className="flex justify-between items-center pb-2 border-b">
            <h2 className="text-2xl font-bold text-gray-800">基本資料</h2>
            {isEditing ? (
              <div className="space-x-2 flex">
                <Button
                  onClick={handleSave}
                  text="Save"
                  className="bg-green-500 hover:bg-green-600"
                />
                <Button
                  onClick={handleCancel}
                  text="Cancel"
                  className="bg-gray-500 hover:bg-gray-600"
                />
              </div>
            ) : (
              <Button
                onClick={() => setIsEditing(true)}
                text="編輯"
                icon={<Edit3 className="w-5 h-5" />}
              />
            )}
          </div>
          {isEditing ? (
            <div className="space-y-4">
              <div className="grid grid-cols-[100px_1fr] items-center">
                <span className="font-bold text-gray-800">真實姓名</span>
                <input
                  type="text"
                  value={profileData.realName}
                  onChange={(e) =>
                    setProfileData({
                      ...profileData,
                      realName: e.target.value
                    })
                  }
                  className="w-full border border-gray-300 rounded px-2 py-1"
                />
              </div>
              <div className="grid grid-cols-[100px_1fr] items-center">
                <span className="font-bold text-gray-800">暱稱</span>
                <input
                  type="text"
                  value={profileData.nickname}
                  onChange={(e) =>
                    setProfileData({
                      ...profileData,
                      nickname: e.target.value
                    })
                  }
                  className="w-full border border-gray-300 rounded px-2 py-1"
                />
              </div>
              <div className="grid grid-cols-[100px_1fr] items-center">
                <span className="font-bold text-gray-800">Email</span>
                <input
                  type="email"
                  value={profileData.email}
                  onChange={(e) =>
                    setProfileData({ ...profileData, email: e.target.value })
                  }
                  className="w-full border border-gray-300 rounded px-2 py-1"
                />
              </div>
              <div className="grid grid-cols-[100px_1fr] items-center">
                <span className="font-bold text-gray-800">轉帳帳號</span>
                <input
                  type="text"
                  value={profileData.account}
                  onChange={(e) =>
                    setProfileData({
                      ...profileData,
                      account: e.target.value
                    })
                  }
                  className="w-full border border-gray-300 rounded px-2 py-1"
                />
              </div>
              <div className="grid grid-cols-[100px_1fr] items-center">
                <span className="font-bold text-gray-800">學歷</span>
                <input
                  type="text"
                  value={profileData.education}
                  onChange={(e) =>
                    setProfileData({
                      ...profileData,
                      education: e.target.value
                    })
                  }
                  className="w-full border border-gray-300 rounded px-2 py-1"
                />
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="grid grid-cols-[100px_1fr] items-center">
                <span className="font-bold text-gray-800">真實姓名</span>
                <span className="text-gray-800">{profileData.realName}</span>
              </div>
              <div className="grid grid-cols-[100px_1fr] items-center">
                <span className="font-bold text-gray-800">暱稱</span>
                <span className="text-gray-800">{profileData.nickname}</span>
              </div>
              <div className="grid grid-cols-[100px_1fr] items-center">
                <span className="font-bold text-gray-800">Email</span>
                <span className="text-gray-800">{profileData.email}</span>
              </div>
              <div className="grid grid-cols-[100px_1fr] items-center">
                <span className="font-bold text-gray-800">轉帳帳號</span>
                <span className="text-gray-800">{profileData.account}</span>
              </div>
              <div className="grid grid-cols-[100px_1fr] items-center">
                <span className="font-bold text-gray-800">學歷</span>
                <span className="text-gray-800">{profileData.education}</span>
              </div>
            </div>
          )}
        </div>
      </Block>
    );
  };

  // 共用的文章格元件，供「發表的文章」與「解鎖的文章」使用
  const renderArticleGrid = (article: Article) => {
    return (
      <Block
        key={article.id}
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
        className={`${
          article.locked ? "" : "cursor-pointer"
        } shadow rounded-lg p-4 mb-4 border border-gray-200 transition-transform duration-300`}
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

        {/* 作者評比區塊 */}
        <div className="mt-4">
          <h3 className="text-lg font-bold text-gray-800">
            評比
            <span className="ml-2 text-gray-800 font-semibold">
              {(
                (article.salaryRating +
                  (6 - article.pressureRating) +
                  article.growthRating) /
                3
              ).toFixed(1)}
            </span>
          </h3>
          <div className="flex items-center gap-4 mt-2">
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
              <span className="mr-1 font-semibold text-gray-500">舒適度</span>
              <div className="text-yellow-500">
                {Array.from({ length: 5 }, (_, i) => (
                  <span key={i}>
                    {i < Math.floor(6 - article.pressureRating) ? "★" : "☆"}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex items-center">
              <span className="mr-1 font-semibold text-gray-500">成長性</span>
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

        {/* 觀看評比區塊 */}
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
          <div className="flex items-center gap-4 mt-2">
            <div className="flex items-center">
              <span className="mr-1 font-semibold text-gray-500">資訊量</span>
              <div className="text-yellow-500">
                {Array.from({ length: 5 }, (_, i) => (
                  <span key={i}>
                    {i < Math.floor(article.infoRating) ? "★" : "☆"}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex items-center">
              <span className="mr-1 font-semibold text-gray-500">實用性</span>
              <div className="text-yellow-500">
                {Array.from({ length: 5 }, (_, i) => (
                  <span key={i}>
                    {i < Math.floor(article.practicalRating) ? "★" : "☆"}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex items-center">
              <span className="mr-1 font-semibold text-gray-500">中立度</span>
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
      </Block>
    );
  };

  // 模擬點擊文章動作
  const handleArticleClick = (id: number) => {
    console.log("Article clicked:", id);
    // 這裡可進行頁面導向等操作
  };

  // 根據選擇的分頁渲染對應文章列表
  const renderArticlesContent = () => {
    if (selectedTab === "articles") {
      return initialProfile.articles.length > 0 ? (
        initialProfile.articles.map((article) => renderArticleGrid(article))
      ) : (
        <p className="text-gray-800">目前沒有發表任何文章</p>
      );
    } else if (selectedTab === "unlocked") {
      return initialProfile.unlocked.length > 0 ? (
        initialProfile.unlocked.map((article) => renderArticleGrid(article))
      ) : (
        <p className="text-gray-800">目前沒有已解鎖的文章</p>
      );
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* 頁首 */}
      <HeaderBlock title="個人中心" subtitle="歡迎來到您的個人中心" />
      {/* 個人基本資料區 */}
      <div className="max-w-6xl mx-auto px-4 pt-10">{renderBasicInfo()}</div>
      {/* 文章分頁區 */}
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="flex flex-col md:flex-row gap-8">
          {/* 導覽選單 */}
          <nav className="md:w-1/4">
            <ul className="flex md:flex-col gap-4 border-b md:border-b-0">
              <li
                className={`cursor-pointer py-2 px-4 transition-colors duration-200 hover:text-blue-600 ${
                  selectedTab === "articles"
                    ? "text-blue-600 font-bold border-b-2 border-blue-600"
                    : "text-gray-800"
                }`}
                onClick={() => setSelectedTab("articles")}
              >
                發表的文章
              </li>
              <li
                className={`cursor-pointer py-2 px-4 transition-colors duration-200 hover:text-blue-600 ${
                  selectedTab === "unlocked"
                    ? "text-blue-600 font-bold border-b-2 border-blue-600"
                    : "text-gray-800"
                }`}
                onClick={() => setSelectedTab("unlocked")}
              >
                解鎖的文章
              </li>
            </ul>
          </nav>
          {/* 文章內容 */}
          <section className="md:w-3/4">
            <div className="p-4 transition-all duration-300 ease-in-out">
              {renderArticlesContent()}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
