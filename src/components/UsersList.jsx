import { useContext } from "react";
import { UserRaw } from "./UserRaw";
import { UserContext } from "../context/UserContext";

export const UsersList = () => {
  const { users } = useContext(UserContext);
  return (
    <>
      <table className="table table-hover table-striped">
        <thead>
          <tr className="">
            <th>#</th>
            <th>username</th>
            <th>eMail</th>
            <th>Update</th>
            <th>Go to</th>
            <th>Delete</th>
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

