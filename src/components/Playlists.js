import styled from "styled-components";

const StyledPlaylistContainer = styled.div`
  position: relative;
`;

const StyledPlayListButton = styled.button`
  border: none;
  background: none;

  &::after {
    content: "";
    position: absolute;
    right: 0;
    ${(props) => (props.active ? `content: "🎵"` : "")}
  }
  ${(props) => (props.active ? `color: #1DB954` : "")}
`;

const Playlists = ({ activePlaylist, setActivePlaylist, playlists }) => {
  return (
    <div>
      {playlists.map((playlist) => {
        return (
          <StyledPlaylistContainer key={`${activePlaylist}${playlist.id}`}>
            <StyledPlayListButton
              active={activePlaylist === playlist.id}
              onClick={(e) => setActivePlaylist(playlist.id)}
            >
              {playlist.name}
            </StyledPlayListButton>
          </StyledPlaylistContainer>
        );
      })}
    </div>
  );
};

export default Playlists;
