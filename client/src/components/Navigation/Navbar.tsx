import { Link } from "react-router-dom";
import { useLogout } from "../../hooks/useLogout";

const Navbar = () => {
  const { logout } = useLogout();

  const handleClick = () => {
    logout();
  };

  return (
    <header>
      <div className="container">
        <Link to="/">Workout Buddy</Link>
        <nav>
          <div>
            <button onClick={handleClick}>Logout</button>
          </div>
          <Link to="/login">Login</Link>
          <Link to="/signup">Sign up</Link>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
