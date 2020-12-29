import { useState } from "react";
import styled from "styled-components";

const StyledActive = styled.span`
  font-size: 1.2rem;
  background: #484c54;
  width: 100%;
  padding: 5px;
  border-radius: 3px;
  cursor: pointer;
`;

const StyledPlaylistList = styled.ul`
  position: absolute;
  width: auto;
  ${(props) => (props.active ? "" : `display: none`)}
`;

const StyledPlaylistName = styled.li`
  position: relative;
  width: 100%;
  list-style-type: none;
  background: #484c54;
  border: solid 1px black;
  &:hover {
    background: #585c64;
  }
`;

const StyledPlayListButton = styled.button`
  display: inline-block;
  border: none;
  background: none;
  ${(props) => (props.active ? `color: #1DB954` : "")}
`;

const Playlists = ({ activePlaylist, setActivePlaylist, playlists }) => {
  const [active, setActive] = useState(false);

  return (
    <div>
      <StyledActive onClick={() => setActive((a) => !a)}>
        {playlists.filter((p) => p.id === activePlaylist)[0]
          ? playlists.filter((p) => p.id === activePlaylist)[0].name
          : "None selected"}
      </StyledActive>
      <StyledPlaylistList active={active}>
        {playlists.map((playlist) => {
          return (
            <StyledPlaylistName key={`${activePlaylist}${playlist.id}`}>
              <StyledPlayListButton
                active={activePlaylist === playlist.id}
                onClick={(e) => setActivePlaylist(playlist.id)}
              >
                {playlist.name}
              </StyledPlayListButton>
            </StyledPlaylistName>
          );
        })}
      </StyledPlaylistList>
    </div>
  );
};

export default Playlists;
