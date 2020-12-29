import { useState } from "react";
import SpotifyWebApi from "spotify-web-api-js";
import Player from "./components/Player";
import Login from "./components/Login";
import "./App.css";
import {
  setCookie,
  removeCookie,
  getCookie,
  spotify_token,
  getToken,
} from "./services/tokenService";
import useInterval from "./services/useInterval";

function App() {
  const [state, setState] = useState({ logout: false, token: "" });
  let spotifyApi = new SpotifyWebApi();
  spotifyApi.setAccessToken(state.token);

  const logoutCallback = () => {
    removeCookie(spotify_token);
    setState({
      token: "",
      logout: true,
    });
  };

  useInterval(() => {
    setState((s) => ({ ...s, expiresIn: s.expiresIn - 5000 }));
    if (state.expiresIn && state.expiresIn < 0) {
      logoutCallback();
    }
  }, 5000);

  return (
    <div className="App">
      {!state.token || state.logout ? (
        <Login
          {...{
            getCookie,
            spotify_token,
            state,
            setState,
            setCookie,
            removeCookie,
            getToken,
          }}
        />
      ) : (
        <Player
          token={state.token}
          logoutCallback={logoutCallback}
          expiresIn={state.expiresIn}
          {...{ spotifyApi }}
        />
      )}
    </div>
  );
}

export default App;
