import { UsersList } from "../components/UsersList";
import { useUsers } from "../hooks/useUsers";
import { UserModalForm } from "../components/UserModalForm";
import { useEffect } from "react";
import { useAuth } from "../auth/hooks/useAuth";

export const UsersPage = () => {
  const { users, visibleForm, handlerOpenForm, getUsers } = useUsers();

  const { login } = useAuth();

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <>
      {!visibleForm || <UserModalForm />}
      <div className="container my-4">
        <div className="row">
          <div className="col">
            {visibleForm || !login.isAdmin || (
              <button
                className="btn btn-primary my-2"
                onClick={handlerOpenForm}
              >
                New user
              </button>
            )}
            {users.length === 0 ? (
              <div className="alert alert-warning p-3 text-center">
                There are not users
              </div>
            ) : (
              <UsersList />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

