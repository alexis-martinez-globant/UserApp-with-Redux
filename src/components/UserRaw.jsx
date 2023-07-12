import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { UserContext } from "../context/UserContext";

export const UserRaw = ({ id, userName, email }) => {
  const { handlerRemoveUser, handlerUserSelectedForm } =
    useContext(UserContext);

  return (
    <tr>
      <td>{id}</td>
      <td>{userName}</td>
      <td>{email}</td>
      <td>
        <button
          type="button"
          className="btn btn-sm btn-warning"
          onClick={() => handlerUserSelectedForm({ id, userName, email })}
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
    </tr>
  );
};

