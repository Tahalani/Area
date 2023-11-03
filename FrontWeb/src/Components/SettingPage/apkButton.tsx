import { useTranslation } from "react-i18next";

export default function ApkButton() {
  const { t } = useTranslation();

  const handleDownloadAPK = () => {
    window.location.href = "https://are4-51.com:8080/client.apk";
  };

  return (
    <>
      <div className="flex items-center justify-center mt-10">
        <button
          onClick={handleDownloadAPK}
          className="btn btn-primary bg-secondary text-white font-bold py-2 px-4 rounded-full"
        >
          <svg
            className="w-6 h-6 mr-2"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
          </svg>
          {t("apkDownload")}
        </button>
      </div>
    </>
  );
}
