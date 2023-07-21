import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { AuthContext } from "../auth/context/AuthContext";

export const UserRaw = ({ id, username, email }) => {
  const { handlerRemoveUser, handlerUserSelectedForm } =
    useContext(UserContext);
  const { login } = useContext(AuthContext);

  return (
    <tr>
      <td>{id}</td>
      <td>{username}</td>
      <td>{email}</td>
      {!login.isAdmin || (
        <>
          <td>
            <button
              type="button"
              className="btn btn-sm btn-warning"
              onClick={() => handlerUserSelectedForm({ id, username, email })}
            >
              Update
            </button>
          </td>
          <td>
            <NavLink
              className="btn btn-secondary btn-sm"
              to={"/users/update/" + id}
            >
              Edit
            </NavLink>
          </td>
          <td>
            <button
              type="button"
              className="btn btn-sm btn-danger"
              onClick={() => handlerRemoveUser(id)}
            >
              Remove
            </button>
          </td>
        </>
      )}
    </tr>
  );
};

