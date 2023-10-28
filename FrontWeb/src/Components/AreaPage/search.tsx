import { useState } from "react";
import { useTranslation } from "react-i18next";

interface SearchProps {
  onSearch: (searchValue: string) => void;
}

export default function Search({ onSearch }: SearchProps) {
  const [searchValue, setSearchValue] = useState("");
  const { t } = useTranslation();

  const handleSearch = () => {
    onSearch(searchValue);
  };

  return (
    <div className="w-screen">
      <div className="flex justify-center items-center">
        <h1
          style={{ fontFamily: "merriweather" }}
          className="text-[30px] text-black font-bold mt-[80px]"
        >
          {t("explore")}
        </h1>
      </div>
      <div className="form-control mb-10 mt-5">
        <div className="flex justify-center items-center input-group">
          <input
            type="text"
            placeholder={t("search")}
            className="input bg-main border-black"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <button className="btn btn-square bg-main" onClick={handleSearch}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
        </div>
        <div className="navbar-end"></div>
      </div>
    </div>
  );
}
