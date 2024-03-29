import { useEffect, useState, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { format, utcToZonedTime } from "date-fns-tz";
import { UserContext } from "../components/UserContext";

const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

export default function PostPage() {
  const [postInfo, setPostInfo] = useState(null);
  const { userInfo } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true); // Initialize loading state
  const [error, setError] = useState(null); // Initialize error state

  const { id } = useParams();

  // get post info
  // [] is dependencies?
  useEffect(() => {
    const fetchPostInfo = async () => {
      try {
        setIsLoading(true); // Start loading
        const response = await fetch(`https://bloguetown-api.vercel.app/post/${id}`);
        // http://localhost:4000/post/${id}
        if (!response.ok) {
          throw new Error('Could not fetch post data');
        }
        const postInfo = await response.json();
        setPostInfo(postInfo);
      } catch (err) {
        setError(err.message); // Catch and set any error that occurs during fetch
      } finally {
        setIsLoading(false); // Ensure loading state is updated when operation is complete
      }
    };
    fetchPostInfo();
  }, [id]); // Include `id` in the dependencies array to refetch when the id changes ???

  // Handle loading state
  if (isLoading) {
    return (
      <div class="loading-container">
        <div class="loader"></div>
      </div>
    )
  }

  // Handle error state
  if (error) {
    return <div>Error: {error}</div>; // Display error message
  }

  // Ensure postInfo is available before proceeding to render the component
  if (!postInfo) {
    return <div>Post not found</div>;
  }

  return (
    <div className="post-page">
      <h1>{postInfo.title}</h1>
      <div className="date-container">
        <img src="/icons/calendar.svg" className="calendar-icon" />
        <time>
          {format(
            new Date(utcToZonedTime(postInfo.createdAt, userTimeZone)),
            "MMM d, yyyy • hh:mm a z",
            { timeZone: userTimeZone }
          )}
        </time>
      </div>
      <div className="author">by {postInfo.author.username}</div>

      {userInfo.id === postInfo.author._id && (
        <div className="edit-row">
          <Link className="edit-button" to={`/edit/${postInfo._id}`}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
              />
            </svg>
            Edit post
          </Link>
        </div>
      )}

      {/* print html from a string */}
      <div
        className="content"
        dangerouslySetInnerHTML={{ __html: postInfo.content }}
      />
    </div>
  );
}
