export const getTelegramUser = () => {
  if (window.Telegram?.WebApp?.initData) {
    const user = window.Telegram.WebApp.initDataUnsafe?.user;
    return user;
  }
  return null;
};
