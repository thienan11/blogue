import { Link } from "react-router-dom";


export default function RegisterPage(){
  return(
    // <form action="">
    //   <input type="text" placeholder="username"/>
    //   <input type="password" placeholder="password"/>
    //   <button>Register</button>
    //   <p>Already have an account? <Link to="/login">Log in</Link> </p>
    // </form>

    <div class="container">
      <h1>Sign up</h1>
      <form action="" >
        <p>
          <label for="username">Username:</label>
          <input type="text" name="username" id="username"/>
        </p>
        <p>
          <label for="password">Password:</label>
          <input type="password" name="password" id="password" />
          <i class="bi bi-eye-slash" id="togglePassword"></i>
        </p>
        <button type="submit" id="submit" class="submit">Register</button>
        <p className="tag">Already have an account? <Link to="/login">Log in</Link> </p>      
      </form>
    </div>
  );
}