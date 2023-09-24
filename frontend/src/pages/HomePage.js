import Post from "../Post";

const HomePage = () => {
  return(
    <>
      <h2 className="info">The Latest</h2>
      <Post />
      <Post />
      <Post />
    </>
  );
}

export default HomePage;