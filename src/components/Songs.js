const Songs = ({ songs }) => {
  return (
    <div>
      {songs.map((song) => {
        return <div key={song.id}>{song.track.name}</div>;
      })}
    </div>
  );
};

export default Songs;
