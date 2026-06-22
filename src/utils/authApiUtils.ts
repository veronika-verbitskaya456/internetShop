export const getProxyImageUrl = (url: string | undefined) => {
  if (!url) return "";
  let cleanUrl = url.replace(/[\[\]"]/g, "").trim();

  if (cleanUrl.includes("api.escuelajs.co")) {
    const pathIndex = cleanUrl.indexOf("/api/");
    if (pathIndex !== -1) {
      return cleanUrl.substring(pathIndex);
    }
    return cleanUrl.replace("https://api.escuelajs.co", "/api");
  }

  return cleanUrl;
};
