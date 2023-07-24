import { NavLink } from "react-router-dom";
import { useUsers } from "../hooks/useUsers";
import { useAuth } from "../auth/hooks/useAuth";

export const UserRaw = ({ id, username, email, admin }) => {
  const { handlerRemoveUser, handlerUserSelectedForm } = useUsers();
  const { login } = useAuth();

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
              onClick={() =>
                handlerUserSelectedForm({ id, username, email, admin })
              }
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

