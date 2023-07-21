import { useContext } from "react";
import { UserRaw } from "./UserRaw";
import { UserContext } from "../context/UserContext";
import { AuthContext } from "../auth/context/AuthContext";

export const UsersList = () => {
  const { users } = useContext(UserContext);
  const { login } = useContext(AuthContext);

  return (
    <>
      <table className="table table-hover table-striped">
        <thead>
          <tr className="">
            <th>#</th>
            <th>username</th>
            <th>eMail</th>
            {!login.isAdmin || (
              <>
                <th>Update</th>
                <th>Go to</th>
                <th>Delete</th>
              </>
            )}
          </tr>
        </thead>
        <tbody>
          {users.map(({ id, username, email }) => (
            <UserRaw id={id} username={username} email={email} key={id} />
          ))}
        </tbody>
      </table>
    </>
  );
};

