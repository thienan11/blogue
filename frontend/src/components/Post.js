import { format, utcToZonedTime } from 'date-fns-tz';
import { Link } from "react-router-dom";

const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
// const userTimeZone = "Asia/Tokyo";
// const userTimeZone = "America/New_York";

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
            <div className="date-container">
              <img src="/icons/calendar.svg" className="calendar-icon"/>
              <time>{format(
                new Date(utcToZonedTime(createdAt, userTimeZone)), "MMM d, yyyy")}
              </time>
            </div>
            <a className="author">By: {author.username}</a>
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
