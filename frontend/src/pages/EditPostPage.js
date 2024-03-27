import { useState, useEffect } from "react";
import { Navigate, useParams } from "react-router-dom";
import Editor from "../components/Editor";

export default function EditPostPage() {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    fetch("https://bloguetown-api.vercel.app/post/" + id).then((response) => {
      response.json().then((postInfo) => {
        setTitle(postInfo.title);
        setSummary(postInfo.summary);
        setContent(postInfo.content);
      });
    });
  }, []);

  async function updatePost(ev) {
    ev.preventDefault();
    const post = { id, title, summary, content };
    const response = await fetch("https://bloguetown-api.vercel.app/post", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(post),
      credentials: "include",
    });

    if (response.ok) {
      setRedirect(true);
    }
  }

  if (redirect) {
    return <Navigate to={"/post/" + id} />;
  }

  return (
    <form className="create-edit-form" onSubmit={updatePost}>
      <input
        type="title"
        placeholder={"Title"}
        value={title}
        onChange={(ev) => setTitle(ev.target.value)}
      />
      <input
        type="summary"
        placeholder={"Summary"}
        value={summary}
        onChange={(ev) => setSummary(ev.target.value)}
      />
      <Editor onChange={setContent} value={content} />
      <button>Update Post</button>
    </form>
  );
}
