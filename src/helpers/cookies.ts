import Cookies from 'js-cookie';

export const removeAllCookies = () => {
  const allCookies = Cookies.get();
  Object.keys(allCookies).forEach(cookieName => {
    Cookies.remove(cookieName);
  });
};
