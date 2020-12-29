import { useState, useEffect, useRef } from "react";
import Playlists from "./Playlists";
// import Songs from "./Songs";
import PlayerBar from "./PlayerBar";
import CurrentTrack from "./CurrentTrack";
import useInterval from "../services/useInterval";

const Player = ({ spotifyApi }) => {
  const [playlists, setPlaylists] = useState({ items: [{ name: "" }] });
  // const [songs, setSongs] = useState({
  //   tracks: { items: [{ track: { name: "" } }] },
  // });
  const [activePlaylist, setActivePlaylist] = useState("");
  const [activeSong, setActiveSong] = useState("");
  const [addPlaylist, setAddPlaylist] = useState("");
  const [removePlaylist, setRemovePlaylist] = useState("");

  useInterval(() => {
    async function data() {
      const p = await spotifyApi.getMyCurrentPlayingTrack();
      setActiveSong(p);
    }

    data();
  }, 5000);

  useEffect(() => {
    async function data() {
      const p = await spotifyApi.getUserPlaylists();
      setPlaylists(p);
    }

    data();
  }, []);

  // useEffect(() => {
  //   async function data() {
  //     const p = await spotifyApi.getPlaylist(activePlaylist);
  //     setSongs(p);
  //   }

  //   data();
  // }, [activePlaylist]);

  const handleSkip = () => {
    if (activePlaylist !== "" && addPlaylist !== "" && removePlaylist !== "") {
      spotifyApi.skipToNext();
      // spotifyApi.addTracksToPlaylist(removePlaylist, [activeSong.item.uri]);
      spotifyApi.removeTracksFromPlaylist(activePlaylist, [
        activeSong.item.uri,
      ]);
      async function data() {
        const p = await spotifyApi.getMyCurrentPlayingTrack();
        setActiveSong(p);
      }

      data();
    }
  };

  return (
    <div style={{ display: "grid", gridAutoFlow: "row" }}>
      <div style={{ display: "grid", gridAutoFlow: "column" }}>
        <div>
          <h2>Set Active Playlist</h2>
          <Playlists
            activePlaylist={activePlaylist}
            playlists={playlists.items}
            setActivePlaylist={setActivePlaylist}
          />
        </div>
        <div>
          <h2>Set Add Playlist</h2>
          <Playlists
            activePlaylist={addPlaylist}
            playlists={playlists.items}
            setActivePlaylist={setAddPlaylist}
          />
        </div>
        <div>
          <h2>Set Remove Playlist</h2>
          <Playlists
            activePlaylist={removePlaylist}
            playlists={playlists.items}
            setActivePlaylist={setRemovePlaylist}
          />
        </div>
        {/* <Songs songs={songs.tracks.items} /> */}
      </div>
      <PlayerBar {...{ spotifyApi, handleSkip }} />
      <CurrentTrack current={activeSong?.item} />
    </div>
  );
};

export default Player;
