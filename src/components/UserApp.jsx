import { UserForm } from "./UserForm";
import { UsersList } from "./UsersList";
import { useUsers } from "../hooks/useUsers";

export const UserApp = () => {
  const {
    users,
    userSelected,
    initialUserForm,
    visibleForm,
    handlerAddUser,
    handlerUserSelectedForm,
    handlerRemoveUser,
    handlerOpenForm,
    handlerCloseForm,
  } = useUsers();
  return (
    <>
      {!visibleForm || (
        <div className="abrir-modal animacion fadeIn ">
          <div className="modal" tabIndex="-1" style={{ display: "block" }}>
            <div className="modal-dialog" role="document">
              <div className="modal-content ">
                <div className="modal-header ">
                  <h5 className="modal-title ">
                    {userSelected.id > 0 ? "Edit user" : "Create"}
                  </h5>
                </div>
                <div className="modal-body">
                  <UserForm
                    handlerAddUser={handlerAddUser}
                    initialUserForm={initialUserForm}
                    userSelected={userSelected}
                    handlerCloseForm={handlerCloseForm}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="container my-4">
        <h2>UsersApp</h2>
        <div className="row">
          {/* {!visibleForm || (
            <div className="col">
              <UserForm
                handlerAddUser={handlerAddUser}
                initialUserForm={initialUserForm}
                userSelected={userSelected}
                handlerCloseForm={handlerCloseForm}
              />
            </div>
          )} */}
          <div className="col">
            {visibleForm || (
              <button
                className="btn btn-primary my-2"
                onClick={handlerOpenForm}
              >
                {" "}
                New user
              </button>
            )}
            {users.length === 0 ? (
              <div className="alert alert-warning p-3 text-center">
                No hay usuarios
              </div>
            ) : (
              <UsersList
                users={users}
                handlerRemoveUser={handlerRemoveUser}
                handlerUserSelectedForm={handlerUserSelectedForm}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

