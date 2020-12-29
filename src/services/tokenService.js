import Cookies from "universal-cookie";

export const spotify_token = "spotify_token";

export function setCookie(key, value, expiryDate) {
  const cookie = new Cookies();
  cookie.set(key, value, {
    expires: expiryDate,
  });
}

export function getCookie(key) {
  const cookie = new Cookies();
  return cookie.get(key);
}

export function removeCookie(key) {
  const cookie = new Cookies();
  cookie.remove(key);
}

export function getToken() {
  const token = window.location.hash
    .substring(1)
    .split("&")
    .reduce((acc, val) => {
      if (val) {
        const parts = val.split("=");
        acc[parts[0]] = decodeURIComponent(parts[1]);
      }
      return acc;
    }, {});
  window.location.hash = "";
  return token;
}
