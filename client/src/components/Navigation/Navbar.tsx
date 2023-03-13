import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <header>
      <div className="container">
        <Link to="/">Workout Buddy</Link>
        <nav>
          <Link to="/login">Login</Link>
          <Link to="/signup">Sign up</Link>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
