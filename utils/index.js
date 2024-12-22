// utils/urlHelper.js
export function getBaseURL(lang, query) {
  const env = process.env.NODE_ENV;

  const baseURL =
    env === "development"
      ? process.env.NEXT_PUBLIC_APP_URL_DEV
      : process.env.NEXT_PUBLIC_APP_URL_PRODUCTION;

  return baseURL;
}
