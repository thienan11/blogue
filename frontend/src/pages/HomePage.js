import Post from "../Post";
import { useEffect, useState } from "react";

const HomePage = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("https://bloguetown-api.vercel.app/post").then((response) => {
      response.json().then((posts) => {
        setPosts(posts);
      });
    });
  }, []);

  return (
    <>
      <h2 className="info">The Latest</h2>

      {posts.length > 0 && posts.map((post) => <Post {...post} />)}
    </>
  );
};

export default HomePage;
