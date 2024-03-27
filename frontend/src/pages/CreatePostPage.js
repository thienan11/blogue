import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import Editor from "../components/Editor";

export default function CreatePostPage() {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  // const [files, setFiles] = useState("");
  const [redirect, setRedirect] = useState(false);

  async function createNewPost(ev) {
    // const data = new FormData();
    // data.set("title", title);
    // data.set("summary", summary);
    // data.set("content", content);
    // data.set("file", files[0]); // grab first file (if theres multiple)
    ev.preventDefault();
    const post = { title, summary, content };
    const response = await fetch("https://bloguetown-api.vercel.app/post", {
      // http://localhost:4000/post
      // method: "POST",
      // body: data,
      // credentials: "include",
      method: "POST",
      headers: {
          'Content-Type': 'application/json',
          // Include other headers as needed, for example, for authentication
      },
      body: JSON.stringify(post),
      credentials: "include",
    });

    if (response.ok) {
      setRedirect(true);
    }
  }

  if (redirect) {
    return <Navigate to={"/"} />;
  }

  return (
    <form className="create-edit-form" onSubmit={createNewPost}>
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
      {/* <input type="file" onChange={(ev) => setFiles(ev.target.files)} /> */}
      <Editor onChange={setContent} value={content}/>
      <button>Create Post</button>
    </form>
  );
}
