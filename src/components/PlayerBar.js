import styled from "styled-components";

const StyledPlayerBar = styled.div`
  display: grid;
  grid-auto-flow: column;
  * {
    font-size: 10rem;
  }
`;

const StyledPlayButtons = styled.button`
  margin: 5px;
  padding: 5px;
  border: none;
  background: none;
`;

const PlayerBar = ({ spotifyApi, handleAdd, handleSkip }) => {
  return (
    <StyledPlayerBar>
      <StyledPlayButtons onClick={() => spotifyApi.play()}>▶</StyledPlayButtons>
      <StyledPlayButtons onClick={() => spotifyApi.pause()}>
        ⏸
      </StyledPlayButtons>
      <StyledPlayButtons onClick={() => handleAdd()}>👍</StyledPlayButtons>
      <StyledPlayButtons onClick={() => spotifyApi.skipToPrevious()}>
        👈🏽
      </StyledPlayButtons>
      <StyledPlayButtons onClick={() => handleSkip()}>👉🏽</StyledPlayButtons>
    </StyledPlayerBar>
  );
};

export default PlayerBar;
