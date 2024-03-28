import { format } from "date-fns";
import { Link } from "react-router-dom";

export default function Post({
  _id,
  title,
  summary,
  image,
  content,
  createdAt,
  author,
}) {
  return (
    <Link to={`/post/${_id}`}>
      <div className="post">
        <div className="texts">
          <h2>{title}</h2>
          <p className="info">
            <a className="author">By: {author.username}</a>
            <div className="date-container">
              <img src="/icons/calendar.svg"/>
              <time>{format(new Date(createdAt), "MMM d, yyyy hh:mm a")}</time>
            </div>
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
    </Link>
  );
}
