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
            <th>userName</th>
            <th>eMail</th>
            <th>Update</th>
            <th>Go to</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {users.map(({ id, userName, email }) => (
            <UserRaw id={id} userName={userName} email={email} key={id} />
          ))}
        </tbody>
      </table>
    </>
  );
};

