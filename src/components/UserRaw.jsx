export const UserRaw = ({
  id,
  userName,
  email,
  handlerRemoveUser,
  handlerUserSelectedForm,
}) => {
  const onUpdateUser = (user) => {
    handlerUserSelectedForm(user);
  };
  return (
    <tr>
      <td>{id}</td>
      <td>{userName}</td>
      <td>{email}</td>
      <td>
        <button
          type="button"
          className="btn btn-sm btn-warning"
          onClick={() => onUpdateUser({ id, userName, email })}
        >
          Update
        </button>
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

