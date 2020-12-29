import { useEffect } from "react";

const Player = ({
  getCookie,
  spotify_token,
  state,
  setState,
  setCookie,
  removeCookie,
  getToken,
}) => {
  useEffect(() => {
    const cookie = getCookie(spotify_token);
    if (cookie) {
      setState({ token: cookie.token, expiresIn: cookie.expires });
    }
  }, []);

  useEffect(() => {
    const token = getToken();
    if (token.access_token) {
      tokenCallback(token);
    }
  }, []);

  const tokenCallback = (token) => {
    const date = new Date();
    const expiresIn = Number.parseInt(token.expires_in) * 1000;
    const cookie = {
      token: token.access_token,
      expires: expiresIn,
    };
    setCookie(spotify_token, cookie, new Date(date.getTime() + expiresIn));
    setState({ ...state, token: token.access_token, expiresIn: expiresIn });
  };

  const authEndpoint = "https://accounts.spotify.com/authorize";
  const clientId = "450d450e2ce14dbd82dcf6d8fa33d326";
  const redirectUri = "http://localhost:3000";
  const scopes = [
    "user-read-email",
    "user-read-private",
    "user-read-playback-state",
    "user-modify-playback-state",
    "user-read-currently-playing",
    "user-follow-modify",
    "user-follow-read",
    "app-remote-control",
    "streaming",
    "user-library-modify",
    "user-library-read",
    "playlist-modify-public",
    "playlist-modify-private",
    "playlist-read-private",
    "user-library-modify",
    "user-library-read",
  ];
  return (
    <div>
      <a
        href={`${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
          "%20"
        )}&response_type=token&show_dialog=true`}
      >
        <button>Log in!</button>
      </a>
    </div>
  );
};

export default Player;
