"use client";

import { useState, useRef, useEffect } from "react";
import { Star } from "lucide-react";
import Quill from "quill";
import HeaderBlock from "@/components/headerBlock";
import Button from "@/components/button";
import "quill/dist/quill.snow.css"; // Quill 的基本樣式

export default function PostPage() {
  // 假資料
  const companies = [
    { id: "1", name: "A 公司", taxId: "12345678", industry: "科技" },
    { id: "2", name: "B 公司", taxId: "87654321", industry: "製造" },
    { id: "3", name: "C 公司", taxId: "13579246", industry: "資訊" }
  ];

  // 原有狀態
  const [jobTitle, setJobTitle] = useState("");
  const [jobType, setJobType] = useState("");
  const [isEducationPublic, setIsEducationPublic] = useState(false);
  const [price, setPrice] = useState("0");
  const [selectedCompany, setSelectedCompany] = useState<any>(null);
  const [searchCompany, setSearchCompany] = useState("");
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [ratings, setRatings] = useState({
    salary: 0,
    comfort: 0,
    growth: 0
  });
  const [averageRating, setAverageRating] = useState(0);
  const quillRef = useRef<any>(null);

  // 年資相關狀態
  const [totalExperience, setTotalExperience] = useState("");
  const [currentJobYears, setCurrentJobYears] = useState("");

  // 平均工時獨立區塊
  const [avgWorkHoursPerDay, setAvgWorkHoursPerDay] = useState("");

  // 薪資相關狀態
  const [salaryType, setSalaryType] = useState("monthly"); // monthly, daily, hourly
  const [monthlySalary, setMonthlySalary] = useState("");
  const [dailySalary, setDailySalary] = useState("");
  const [dailyWorkingDays, setDailyWorkingDays] = useState("");
  const [hourlySalary, setHourlySalary] = useState("");
  const [dailyWorkingHours, setDailyWorkingHours] = useState("");
  const [monthlyWorkingDays, setMonthlyWorkingDays] = useState("");
  const [yearEndBonus, setYearEndBonus] = useState("");
  const [profitBonus, setProfitBonus] = useState("");
  const [festivalBonus, setFestivalBonus] = useState("");
  const [otherCompensation, setOtherCompensation] = useState("");
  const [annualSalary, setAnnualSalary] = useState(0);

  // 福利狀態與選項
  const [welfare, setWelfare] = useState<string[]>([]);
  const welfareOptions = [
    "健康檢查",
    "教育訓練",
    "伙食補助",
    "租屋補助",
    "交通補助",
    "旅遊補助",
    "結婚補助",
    "生育補助",
    "零食下午茶",
    "娛樂健身",
    "員工旅遊"
  ];

  const toggleWelfare = (option: string) => {
    if (welfare.includes(option)) {
      setWelfare(welfare.filter((item) => item !== option));
    } else {
      setWelfare([...welfare, option]);
    }
  };

  // 公司搜尋
  const filteredCompanies = companies.filter((company) =>
    company.name.toLowerCase().includes(searchCompany.toLowerCase())
  );

  useEffect(() => {
    if (!quillRef.current) {
      const quill = new Quill("#editorjs", {
        theme: "snow",
        modules: {
          toolbar: [
            [{ header: [1, 2, 3, false] }],
            [{ size: ["small", false, "large", "huge"] }],
            ["bold", "italic", "underline", "strike"],
            [{ color: [] }, { background: [] }],
            [{ list: "ordered" }, { list: "bullet" }],
            [{ align: [] }],
            ["clean"]
          ]
        },
        placeholder: "撰寫您的工作心得...",
        formats: [
          "header",
          "size",
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
    const salaryScore = ratings.salary * (1 / 3);
    const comfortScore = ratings.comfort * (1 / 3);
    const growthScore = ratings.growth * (1 / 3);
    const totalScore = salaryScore + comfortScore + growthScore;
    setAverageRating(totalScore > 0 ? parseFloat(totalScore.toFixed(1)) : 0);
  }, [ratings]);

  useEffect(() => {
    const bonusSum =
      Number(yearEndBonus) +
      Number(profitBonus) +
      Number(festivalBonus) +
      Number(otherCompensation);
    let calculated = 0;
    if (salaryType === "monthly") {
      calculated = Number(monthlySalary) * 12 + bonusSum;
    } else if (salaryType === "daily") {
      calculated =
        Number(dailySalary) * Number(dailyWorkingDays) * 12 + bonusSum;
    } else if (salaryType === "hourly") {
      calculated =
        Number(hourlySalary) *
          Number(dailyWorkingHours) *
          Number(monthlyWorkingDays) *
          12 +
        bonusSum;
    }
    setAnnualSalary(calculated);
  }, [
    salaryType,
    monthlySalary,
    dailySalary,
    dailyWorkingDays,
    hourlySalary,
    dailyWorkingHours,
    monthlyWorkingDays,
    yearEndBonus,
    profitBonus,
    festivalBonus,
    otherCompensation
  ]);

  const handleSubmit = () => {
    if (quillRef.current) {
      const content = quillRef.current.root.innerHTML;
      console.log("Article content:", content);
      console.log("公司資訊:", selectedCompany);
      console.log("職稱:", jobTitle);
      console.log("職務性質:", jobType);
      console.log("是否公開學歷:", isEducationPublic);
      console.log("總年資:", totalExperience);
      console.log("在職年資:", currentJobYears);
      console.log("平均工時 (天):", avgWorkHoursPerDay);
      console.log("福利:", welfare);
      console.log("薪資類型:", salaryType);
      if (salaryType === "monthly") {
        console.log("月薪:", monthlySalary);
      } else if (salaryType === "daily") {
        console.log("日薪:", dailySalary, "每月工作天數:", dailyWorkingDays);
      } else if (salaryType === "hourly") {
        console.log(
          "時薪:",
          hourlySalary,
          "日工時:",
          dailyWorkingHours,
          "每月工作天數:",
          monthlyWorkingDays
        );
      }
      console.log("年終:", yearEndBonus);
      console.log("分紅:", profitBonus);
      console.log("三節:", festivalBonus);
      console.log("其它補助:", otherCompensation);
      console.log("計算年薪:", annualSalary);
      console.log("價格:", price);
      alert("文章已提交！");
    }
  };

  return (
    <>
      <HeaderBlock title="撰寫心得" subtitle="歡迎分享您的實際經驗" />
      <div className="bg-blue-100 border-blue-500 text-blue-700 rounded-md">
        <div className="container p-8 mx-auto">
          <ol className="list-disc pl-5 space-y-2 list-none">
            <li>1. 歡迎分享150字以上之工作心得。</li>
            <li>
              2. 文章價格供您自行訂定，但不可低於新台幣50元，可依據您個人認定內容之價值調整價格。
            </li>
            <li>3. 文章價格會加上新台幣10元平台營運費用作為最終定價。</li>
            <li>
              4. 文章經由觀看者解鎖後，分潤為發文者獲取「自訂價格」之50%，平台獲取「自訂價格」之50%以及平台營運費（新台幣10元）。
            </li>
            <li>
              5. 文章會經過人工審核，切勿發表暴力、情色、詐騙資訊、單純謾罵抹黑或任何其它可能觸法之內容。
            </li>
          </ol>
        </div>
      </div>
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto p-8">
          {/* 公司搜尋 */}
          <div className="mb-10 w-full relative">
            <label className="block text-xl font-semibold mb-2 text-gray-800">
              公司行號
            </label>
            <input
              type="text"
              placeholder="請輸入公司名稱..."
              className="w-full border border-gray-300 rounded-lg p-3 text-base bg-white"
              value={searchCompany}
              onChange={(e) => {
                const inputValue = e.target.value;
                setSearchCompany(inputValue);
                setDropdownVisible(inputValue.length > 0);
                const matched = companies.find(
                  (company) =>
                    company.name.toLowerCase() === inputValue.toLowerCase()
                );
                if (matched) {
                  setSelectedCompany(matched);
                } else {
                  setSelectedCompany(null);
                }
              }}
              onFocus={() => setDropdownVisible(true)}
              onBlur={() => setTimeout(() => setDropdownVisible(false), 150)}
            />
            {dropdownVisible && filteredCompanies.length > 0 && (
              <ul className="absolute z-10 bg-white border border-gray-300 w-full rounded-lg shadow-lg max-h-60 overflow-y-auto mt-1">
                {filteredCompanies.map((company) => (
                  <li
                    key={company.id}
                    className="p-3 hover:bg-gray-100 cursor-pointer"
                    onMouseDown={() => {
                      setSelectedCompany(company);
                      setSearchCompany(company.name);
                      setDropdownVisible(false);
                    }}
                  >
                    {company.name}
                  </li>
                ))}
              </ul>
            )}
            {selectedCompany && (
              <div className="text-gray-700 text-base mt-2">
                <p>公司名稱：{selectedCompany.name}</p>
                <p>統一編號：{selectedCompany.taxId}</p>
                <p>行業類別：{selectedCompany.industry}</p>
              </div>
            )}
          </div>

          {/* 職稱 */}
          <div className="mb-10 w-full">
            <label className="block text-xl font-semibold mb-2 text-gray-800">
              職稱
            </label>
            <input
              type="text"
              placeholder="請輸入您的職稱..."
              className="w-full border border-gray-300 rounded-lg p-3 text-base bg-white"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
            />
          </div>

          {/* 職務性質 */}
          <div className="mb-10 w-full">
            <label className="block text-xl font-semibold mb-2 text-gray-800">
              職務性質
            </label>
            <select
              className="w-full border border-gray-300 rounded-lg p-3 text-base bg-white"
              value={jobType}
              onChange={(e) => setJobType(e.target.value)}
            >
              <option value="">請選擇職務性質</option>
              <option value="全職">全職</option>
              <option value="兼職">兼職</option>
              <option value="實習">實習</option>
              <option value="約聘">約聘</option>
              <option value="派遣">派遣</option>
            </select>
          </div>

          {/* 年資 */}
          <div className="mb-10 w-full">
            <label className="block text-xl font-semibold mb-2 text-gray-800">
              年資
            </label>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-base font-medium mb-1">
                  總年資 (年)
                </label>
                <input
                  type="number"
                  value={totalExperience}
                  onChange={(e) => setTotalExperience(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-3 text-base bg-white"
                  placeholder="輸入總年資"
                />
              </div>
              <div>
                <label className="block text-base font-medium mb-1">
                  在職年資 (年)
                </label>
                <input
                  type="number"
                  value={currentJobYears}
                  onChange={(e) => setCurrentJobYears(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-3 text-base bg-white"
                  placeholder="輸入在職年資"
                />
              </div>
            </div>
          </div>

          {/* 平均工時 */}
          <div className="mb-10 w-full">
            <label className="block text-xl font-semibold mb-2 text-gray-800">
              平均工時
            </label>
            <div>
              <input
                type="number"
                value={avgWorkHoursPerDay}
                onChange={(e) => setAvgWorkHoursPerDay(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-3 text-base bg-white"
                placeholder="輸入平均工時 (天)"
              />
            </div>
          </div>

          {/* 薪資 */}
          <div className="mb-10 w-full">
            <label className="block text-xl font-semibold mb-2 text-gray-800">
              薪資
            </label>
            <div className="flex gap-4 mb-4">
              <label className="flex items-center gap-1">
                <input
                  type="radio"
                  name="salaryType"
                  value="monthly"
                  checked={salaryType === "monthly"}
                  onChange={(e) => setSalaryType(e.target.value)}
                />
                月薪
              </label>
              <label className="flex items-center gap-1">
                <input
                  type="radio"
                  name="salaryType"
                  value="daily"
                  checked={salaryType === "daily"}
                  onChange={(e) => setSalaryType(e.target.value)}
                />
                日薪
              </label>
              <label className="flex items-center gap-1">
                <input
                  type="radio"
                  name="salaryType"
                  value="hourly"
                  checked={salaryType === "hourly"}
                  onChange={(e) => setSalaryType(e.target.value)}
                />
                時薪
              </label>
            </div>
            {salaryType === "monthly" && (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-base font-medium mb-1">
                    月薪
                  </label>
                  <input
                    type="number"
                    value={monthlySalary}
                    onChange={(e) => setMonthlySalary(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg p-3 text-base bg-white"
                    placeholder="輸入月薪"
                  />
                </div>
                <div>
                  <label className="block text-base font-medium mb-1">
                    年終
                  </label>
                  <input
                    type="number"
                    value={yearEndBonus}
                    onChange={(e) => setYearEndBonus(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg p-3 text-base bg-white"
                    placeholder="輸入年終獎金"
                  />
                </div>
                <div>
                  <label className="block text-base font-medium mb-1">
                    分紅
                  </label>
                  <input
                    type="number"
                    value={profitBonus}
                    onChange={(e) => setProfitBonus(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg p-3 text-base bg-white"
                    placeholder="輸入分紅"
                  />
                </div>
                <div>
                  <label className="block text-base font-medium mb-1">
                    三節
                  </label>
                  <input
                    type="number"
                    value={festivalBonus}
                    onChange={(e) => setFestivalBonus(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg p-3 text-base bg-white"
                    placeholder="輸入三節獎金"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-base font-medium mb-1">
                    其它
                  </label>
                  <input
                    type="number"
                    value={otherCompensation}
                    onChange={(e) => setOtherCompensation(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg p-3 text-base bg-white"
                    placeholder="輸入其它補助"
                  />
                </div>
              </div>
            )}
            {salaryType === "daily" && (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-base font-medium mb-1">
                    日薪
                  </label>
                  <input
                    type="number"
                    value={dailySalary}
                    onChange={(e) => setDailySalary(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg p-3 text-base bg-white"
                    placeholder="輸入日薪"
                  />
                </div>
                <div>
                  <label className="block text-base font-medium mb-1">
                    每月工作天數
                  </label>
                  <input
                    type="number"
                    value={dailyWorkingDays}
                    onChange={(e) => setDailyWorkingDays(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg p-3 text-base bg-white"
                    placeholder="輸入每月工作天數"
                  />
                </div>
                <div>
                  <label className="block text-base font-medium mb-1">
                    年終
                  </label>
                  <input
                    type="number"
                    value={yearEndBonus}
                    onChange={(e) => setYearEndBonus(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg p-3 text-base bg-white"
                    placeholder="輸入年終獎金"
                  />
                </div>
                <div>
                  <label className="block text-base font-medium mb-1">
                    分紅
                  </label>
                  <input
                    type="number"
                    value={profitBonus}
                    onChange={(e) => setProfitBonus(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg p-3 text-base bg-white"
                    placeholder="輸入分紅"
                  />
                </div>
                <div>
                  <label className="block text-base font-medium mb-1">
                    三節
                  </label>
                  <input
                    type="number"
                    value={festivalBonus}
                    onChange={(e) => setFestivalBonus(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg p-3 text-base bg-white"
                    placeholder="輸入三節獎金"
                  />
                </div>
                <div>
                  <label className="block text-base font-medium mb-1">
                    其它
                  </label>
                  <input
                    type="number"
                    value={otherCompensation}
                    onChange={(e) => setOtherCompensation(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg p-3 text-base bg-white"
                    placeholder="輸入其它補助"
                  />
                </div>
              </div>
            )}
            {salaryType === "hourly" && (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-base font-medium mb-1">
                    時薪
                  </label>
                  <input
                    type="number"
                    value={hourlySalary}
                    onChange={(e) => setHourlySalary(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg p-3 text-base bg-white"
                    placeholder="輸入時薪"
                  />
                </div>
                <div className="col-span-2">
                  <div className="flex gap-4">
                    <div className="flex-1">
                      <label className="block text-base font-medium mb-1">
                        日工時
                      </label>
                      <input
                        type="number"
                        value={dailyWorkingHours}
                        onChange={(e) => setDailyWorkingHours(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg p-3 text-base bg-white"
                        placeholder="輸入日工時"
                      />
                    </div>
                    <div className="flex-1">
                      <label className="block text-base font-medium mb-1">
                        每月工作天數
                      </label>
                      <input
                        type="number"
                        value={monthlyWorkingDays}
                        onChange={(e) => setMonthlyWorkingDays(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg p-3 text-base bg-white"
                        placeholder="輸入每月工作天數"
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <label className="block text-base font-medium mb-1">
                    年終
                  </label>
                  <input
                    type="number"
                    value={yearEndBonus}
                    onChange={(e) => setYearEndBonus(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg p-3 text-base bg-white"
                    placeholder="輸入年終獎金"
                  />
                </div>
                <div>
                  <label className="block text-base font-medium mb-1">
                    分紅
                  </label>
                  <input
                    type="number"
                    value={profitBonus}
                    onChange={(e) => setProfitBonus(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg p-3 text-base bg-white"
                    placeholder="輸入分紅"
                  />
                </div>
                <div>
                  <label className="block text-base font-medium mb-1">
                    三節
                  </label>
                  <input
                    type="number"
                    value={festivalBonus}
                    onChange={(e) => setFestivalBonus(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg p-3 text-base bg-white"
                    placeholder="輸入三節獎金"
                  />
                </div>
                <div>
                  <label className="block text-base font-medium mb-1">
                    其它
                  </label>
                  <input
                    type="number"
                    value={otherCompensation}
                    onChange={(e) => setOtherCompensation(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg p-3 text-base bg-white"
                    placeholder="輸入其它補助"
                  />
                </div>
              </div>
            )}
            <div className="mt-4">
              <p className="text-lg font-semibold">
                自動計算年薪：{annualSalary.toLocaleString()} 元
              </p>
            </div>
          </div>

          {/* 福利 */}
          <div className="mb-10 w-full">
            <label className="block text-xl font-semibold mb-2 text-gray-800">
              福利
            </label>
            <div className="flex flex-wrap gap-4">
              {welfareOptions.map((option) => (
                <label key={option} className="flex items-center gap-1">
                  <input
                    type="checkbox"
                    checked={welfare.includes(option)}
                    onChange={() => toggleWelfare(option)}
                  />
                  {option}
                </label>
              ))}
            </div>
          </div>

          {/* 文章內容 */}
          <div className="mb-10 w-full">
            <h3 className="text-xl font-bold mb-4 text-gray-800">文章內容</h3>
            <div
              id="editorjs"
              className="w-full border border-gray-300 rounded-lg bg-white min-h-[300px]"
            />
          </div>

          {/* 評價 */}
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
              平均評分： <span className="text-blue-600">{averageRating}</span>{" "}
              分
            </div>
          </div>

          {/* 價格 */}
          <div className="mb-10 w-full">
            <label className="block text-xl font-semibold mb-2 text-gray-800">
              價格
            </label>
            <input
              type="number"
              placeholder="請輸入價格..."
              className="w-full border border-gray-300 rounded-lg p-3 text-base bg-white"
              value={price === "0" ? "" : price}
              onFocus={() => {
                if (price === "0") {
                  setPrice("");
                }
              }}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>

          <div className="flex justify-center">
            <Button
              className="w-full max-w-md"
              text="提交文章"
              onClick={handleSubmit}
            />
          </div>
        </div>
      </div>
    </>
  );
}
