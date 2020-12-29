export default function Track(props) {
  return (
    <div style={{ display: "grid", gridAutoFlow: "column" }}>
      <img src={props?.current?.album?.images[2]?.url} alt="" />
      <>
        <div className="text">
          <h1>
            Currently Playing:{" "}
            {props.current ? props.current.name : "None playing!"}
          </h1>
        </div>
        <div className="text">
          <h3>
            By:{" "}
            {props.current
              ? props.current.artists.map((item) => item.name).join(", ")
              : "No artist!"}
          </h3>
        </div>
      </>
    </div>
  );
}
