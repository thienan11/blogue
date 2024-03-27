import { format } from "date-fns";

export default function Post({
  title,
  summary,
  image,
  content,
  createdAt,
  author,
}) {
  return (
    <div className="post">
      <div className="texts">
        <h2>{title}</h2>
        <p className="info">
          <a className="author">By: {author.username}</a>
          <time>{format(new Date(createdAt), "MMM d, yyyy HH:mm")}</time>
        </p>
        <p className="summary">{summary}</p>
      </div>
      {/* <div className="image">
        <img
          src="https://www.dexerto.com/cdn-cgi/image/width=1080,quality=75,format=auto/https://editors.dexerto.com/wp-content/uploads/2023/07/03/one-piece-netflix-luffy.jpg"
          alt=""
        />
      </div> */}
    </div>
  );
}
