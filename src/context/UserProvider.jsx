import { useUsers } from "../hooks/useUsers";
import { UserContext } from "./UserContext";

export const UserProvider = ({ children }) => {
  const {
    users,
    userSelected,
    initialUserForm,
    visibleForm,
    errors,
    handlerAddUser,
    handlerUserSelectedForm,
    handlerRemoveUser,
    handlerOpenForm,
    handlerCloseForm,
    getUsers,
  } = useUsers();
  return (
    <UserContext.Provider
      value={{
        users,
        userSelected,
        initialUserForm,
        visibleForm,
        errors,
        handlerAddUser,
        handlerUserSelectedForm,
        handlerRemoveUser,
        handlerOpenForm,
        handlerCloseForm,
        getUsers,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

