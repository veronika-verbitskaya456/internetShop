import { getSafeImageUrl } from "./imageUtils";

export const getProxyImageUrl = (url: string | undefined) => {
  if (!url) return "";
  const cleanUrl = url.replace(/[\[\]"]/g, "").trim();

  if (cleanUrl.includes("api.escuelajs.co")) {
    const pathIndex = cleanUrl.indexOf("/api/");
    if (pathIndex !== -1) {
      return cleanUrl.substring(pathIndex);
    }
    return cleanUrl.replace("https://api.escuelajs.co", "/api");
  }

  return getSafeImageUrl(cleanUrl, "");
};

export const getAuthErrorMessage = (error: unknown): string => {
  if (error && typeof error === "object" && "status" in error && error.status === 401) {
    return "Пользователя с таким именем нет";
  }

  return "Ошибка сервера";
};
