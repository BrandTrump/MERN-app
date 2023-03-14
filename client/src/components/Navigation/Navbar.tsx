import { Link } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useLogout } from "../../hooks/useLogout";

const Navbar = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext();

  const handleClick = () => {
    logout();
  };

  return (
    <header>
      <div className="container">
        <Link to="/">Workout Buddy</Link>
        <nav>
          {user && (
            <div className="logout-tab">
              <h3>{user.email}</h3>
              <button onClick={handleClick}>Logout</button>
            </div>
          )}
          {!user && (
            <div className="nav-links">
              <Link to="/login" className="link">
                Login
              </Link>
              <Link to="/signup" className="link">
                Sign up
              </Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
