import { NavLink } from "react-router-dom";
import { useAuth } from "../../auth/hooks/useAuth";

export const Navbar = () => {
  const { login, handlerLogout } = useAuth();

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <h1 className="navbar-brand ">UsersApp</h1>
          <div className="collapse navbar-collapse  " id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <NavLink className="nav-link" to="/users">
                  Users
                </NavLink>
              </li>

              {!login.isAdmin || (
                <li className="nav-item">
                  <NavLink className="nav-link" to="/users/register">
                    Register
                  </NavLink>
                </li>
              )}
            </ul>
          </div>
          <div
            className="collapse navbar-collapse justify-content-end"
            id="navbarNavLogout"
          >
            <span>Hi</span>
            <span className="nav-item nav-link text-primary mr-3">
              {login.user?.username}
            </span>
            <button className="btn btn-outline-success" onClick={handlerLogout}>
              Logout
            </button>
          </div>
        </div>
      </nav>
    </>
  );
};

