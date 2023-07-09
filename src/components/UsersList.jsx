import { UserRaw } from "./UserRaw";

export const UsersList = ({
  users = [],
  handlerRemoveUser,
  handlerUserSelectedForm,
}) => {
  return (
    <>
      <table className="table table-hover table-striped">
        <thead>
          <tr className="">
            <th>#</th>
            <th>userName</th>
            <th>email</th>
            <th>update</th>
            <th>remove</th>
          </tr>
        </thead>
        <tbody>
          {users.map(({ id, userName, email }) => (
            <UserRaw
              id={id}
              userName={userName}
              email={email}
              key={id}
              handlerRemoveUser={handlerRemoveUser}
              handlerUserSelectedForm={handlerUserSelectedForm}
            />
          ))}
        </tbody>
      </table>
    </>
  );
};

