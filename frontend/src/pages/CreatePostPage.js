import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import React, {useState} from "react";

const modules = {
  toolbar: [
    [{ 'header': [1, 2, false] }],
    ['bold', 'italic', 'underline','strike', 'blockquote'],
    [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
    ['link', 'image'],
    ['clean']
  ]
};

const formats = [
  'header',
  'bold', 'italic', 'underline', 'strike', 'blockquote',
  'list', 'bullet', 'indent',
  'link', 'image'
];

export default function CreatePostPage() {
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');

  return (
    <form className="create-post-form">
      <input type="title" 
             placeholder={"Title"} 
             value={title} 
             onChange={ev => setTitle(ev.target.value)}/>
      <input type="summary" 
             placeholder={"Summary"} 
             value={summary}
             onChange={ev => setSummary(ev.target.value)}/>
      <input type="file" />
      <ReactQuill 
        value={content} 
        onChange={newValue => setContent(newValue)}
        modules={modules} 
        formats={formats}/>
      <button>Create Post</button>
    </form>
  );
}
