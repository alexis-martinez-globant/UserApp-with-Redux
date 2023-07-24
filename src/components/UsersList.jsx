import { UserRaw } from "./UserRaw";
import { useUsers } from "../hooks/useUsers";
import { useAuth } from "../auth/hooks/useAuth";

export const UsersList = () => {
  const { users } = useUsers();
  const { login } = useAuth();

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
          {users.map(({ id, username, email, admin }) => (
            <UserRaw
              id={id}
              username={username}
              email={email}
              key={id}
              admin={admin}
            />
          ))}
        </tbody>
      </table>
    </>
  );
};

