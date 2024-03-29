import Post from "../Post";
import { useEffect, useState } from "react";

const HomePage = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Define an asynchronous function inside the effect
    const fetchPosts = async () => {
      try {
        setIsLoading(true); // Start loading before fetching data
        const response = await fetch("https://bloguetown-api.vercel.app/post");
        // http://localhost:4000/post
        if (!response.ok) {
          throw new Error("Data could not be fetched!");
        }
        const posts = await response.json();
        setPosts(posts); // Set posts data
      } catch (err) {
        setError(err.message); // Set error if fetching fails
      } finally {
        setIsLoading(false); // Ensure loading is false after fetch completes
      }
    };
    // Call the async function
    fetchPosts();
  }, []);

  return (
    <>
      <h2 className="info">The Latest</h2> {/* This stays outside and always visible */}
      {isLoading ? (
        <div class="loading-container">
          <div class="loader"></div>
        </div>
      ) : error ? (
        <div>Error: {error}</div> // Error message
      ) : posts.length > 0 ? (
        posts.map((post) => <Post key={post.id} {...post} />)
      ) : (
        <div>No posts found.</div>
      )}
    </>
  );
};

export default HomePage;
