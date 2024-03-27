import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { format } from "date-fns";

export default function PostPage() {
  const [postInfo, setPostInfo] = useState(null);
  const { id } = useParams();

  // get post info
  // [] is dependencies?
  useEffect(() => {
    fetch(`https://bloguetown-api.vercel.app/post/${id}`).then((response) => {
      // http://localhost:4000/post/${id}
      response.json().then((postInfo) => {
        setPostInfo(postInfo);
      });
    });
  }, []);

  if (!postInfo) return "";

  return (
    <div className="post-page">
      <h1>{postInfo.title}</h1>
      <time>{format(new Date(postInfo.createdAt), "MMM d, yyyy")}</time>
      <div className="author">by {postInfo.author.username}</div>
      {/* print html from a string */}
      <div className="content" dangerouslySetInnerHTML={{ __html: postInfo.content }} />
    </div>
  );
}
