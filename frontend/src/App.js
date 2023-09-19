import './App.css';

function App() {
  return (
    <main>
      <header>
        <a href="" className="logo">Bloguetown</a>
        <nav>
          {/* <a href="">Login</a>
          <a href="">Register</a> */}
          <button className="button-4">Login</button>
          <button className="button-4">Register</button>
        </nav>
      </header>

      <div className="post">
        <div className="texts">
          <h2>What is the One Piece?</h2>
          <p className="info">
            <a className="author">By: Thien An Tran</a>
            <time>September 18, 2023 • 3:00 PM PDT</time>
          </p>
          <p className="summary">One Piece, written by Eiichiro Oda, is a widely popular and critically acclaimed series revolving around the protagonist, Monkey D. Luffy, who currently embarks on an exciting quest to become the King of the Pirates.</p>
        </div>
        <div className="image">
          <img src="https://zaigadusa.weebly.com/uploads/5/1/8/8/51882967/7940130_orig.jpg" alt=""/>
        </div>
      </div>
      <div className="post">
        <div className="texts">
          <h2>One Piece: 5 reasons the anime is better than live-action</h2>
          <p className="info">
            <a className="author">By: Thien An Tran</a>
            <time>September 18, 2023 • 3:00 PM PDT</time>
          </p>
          <p className="summary">One Piece live-action becomes a global sensation as soon as it premieres on Netflix as fans compare it with the anime series. Although it is an exceptional adaptation, there are just a few things that the anime does better.</p>
        </div>
        <div className="image">
          <img src="https://www.dexerto.com/cdn-cgi/image/width=1080,quality=75,format=auto/https://editors.dexerto.com/wp-content/uploads/2023/07/03/one-piece-netflix-luffy.jpg" alt=""/>
        </div>
      </div>
      <div className="post">
        <div className="texts">
          <h2>What is the One Piece?</h2>
          <p className="info">
            <a className="author">By: Thien An Tran</a>
            <time>September 18, 2023 • 3:00 PM PDT</time>
          </p>
          <p className="summary">One Piece, written by Eiichiro Oda, is a widely popular and critically acclaimed series revolving around the protagonist, Monkey D. Luffy, who currently embarks on an exciting quest to become the King of the Pirates.</p>
        </div>
        <div className="image">
          <img src="https://zaigadusa.weebly.com/uploads/5/1/8/8/51882967/7940130_orig.jpg" alt=""/>
        </div>
      </div>
    </main>
  );
}

export default App;
