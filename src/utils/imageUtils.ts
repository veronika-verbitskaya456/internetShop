export const PLACEHOLDER_IMAGE = "/icons.svg";

const BROKEN_IMAGE_HOSTS = ["placeimg.com", "pravatar.cc"];

const isBrokenImageHost = (url: string): boolean => {
  try {
    const { hostname } = new URL(url);
    return BROKEN_IMAGE_HOSTS.some((host) => hostname.includes(host));
  } catch {
    return true;
  }
};

export const isValidProductImageUrl = (url: string | undefined): url is string => {
  if (!url || isBrokenImageHost(url)) {
    return false;
  }

  return (
    url.startsWith("https://i.imgur.com") || url.startsWith("https://imgur.com")
  );
};

export const getSafeImageUrl = (
  url: string | undefined,
  fallback = PLACEHOLDER_IMAGE,
): string => {
  if (!url || isBrokenImageHost(url)) {
    return fallback;
  }

  return url;
};

export const sanitizeProductImages = (images: string[] | null | undefined): string[] =>
  (images ?? []).filter(isValidProductImageUrl);
