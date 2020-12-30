import { useEffect } from "react";
import styled from "styled-components";

const LoginButton = styled.button`
  background: #1db954;
  border-style: none;
  padding: 5px 10px;
  border-radius: 5px;
`;

const Player = ({
  getCookie,
  spotify_token,
  state,
  setState,
  setCookie,
  getToken,
}) => {
  useEffect(() => {
    const cookie = getCookie(spotify_token);
    if (cookie) {
      setState({ token: cookie.token, expiresIn: cookie.expires });
    }
  }, [spotify_token]);

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

  useEffect(() => {
    const token = getToken();
    if (token.access_token) {
      tokenCallback(token);
    }
  }, []);

  const authEndpoint = "https://accounts.spotify.com/authorize";
  const redirectUri = "https://elastic-curie-eb4082.netlify.app/";
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
        href={`${authEndpoint}?client_id=${
          process.env.REACT_APP_clientId
        }&redirect_uri=${redirectUri}&scope=${scopes.join(
          "%20"
        )}&response_type=token&show_dialog=true`}
      >
        <LoginButton>Log in!</LoginButton>
        <p>
          Spotify's Discover Weekly and Release Radar are great. Sometimes we
          get busy though and end up with a playlist with a backlog of songs we
          wanted to listen to. This can be tedious to cut down on, which is a
          problem this tool can help with!
        </p>
        <p>How it works:</p>
        <p>After you log in with Spotify you'll see 3 dropdowns.</p>
        <p>
          Active Playlist is the playlist you're going to be listening to/want
          songs deleted from
        </p>
        <p>
          Add playlist is the playlist songs will be added to when you click the
          thumbs up.
        </p>
        <p>
          Removed playlist is backup. It is the playlist songs will get added to
          when you skip them in the Active Playlist
        </p>
        <p>
          Whether you click to add or skip a song it will be removed from the
          Active Playlist.
        </p>{" "}
      </a>
    </div>
  );
};

export default Player;
