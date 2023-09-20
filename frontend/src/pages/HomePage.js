import Post from "../Post";

export default function HomePage() {
  return(
    <>
      <h2 className="info">The Latest</h2>
      <Post />
      <Post />
      <Post />
    </>
  );
}