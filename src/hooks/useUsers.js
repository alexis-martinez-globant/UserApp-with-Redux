import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { findAll, remove, save, update } from "../services/userService";
import { useDispatch, useSelector } from "react-redux";
import {
  initialUserForm,
  addUser,
  removeUser,
  updateUser,
  loadingError,
  loadingUsers,
  onUserSelectedForm,
  onOpenForm,
  onCloseForm,
} from "../store/slices/users/usersSlice";
import { useAuth } from "../auth/hooks/useAuth";

export const useUsers = () => {
  const { users, userSelected, visibleForm, errors } = useSelector(
    (state) => state.users
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { login, handlerLogout } = useAuth();

  const getUsers = async () => {
    const result = await findAll();
    dispatch(loadingUsers(result.data));
  };

  const handlerAddUser = async (user) => {
    if (!login.isAdmin) return;

    let response;
    try {
      if (user.id === 0) {
        response = await save(user);
        dispatch(addUser(response.data));
      } else {
        response = await update(user);
        dispatch(updateUser(response.data));
      }

      Swal.fire(
        user.id === 0 ? "Created" : "Updated",
        user.id === 0
          ? "The user was created successfully"
          : "The user was actualized successfully",
        "success"
      );
      handlerCloseForm();
      navigate("/users");
    } catch (error) {
      if (error.response && error.response.status == 400) {
        dispatch(loadingError(error.response.data));
      } else if (
        error.response &&
        error.response.status == 500 &&
        error.response.data?.message?.includes("constraint")
      ) {
        if (error.response.data?.message?.includes("UK_username")) {
          dispatch(loadingError({ username: "That name is already in use" }));
        }
        if (error.response.data?.message?.includes("UK_email")) {
          dispatch(loadingError({ email: "That email is already in use" }));
        }
      } else if (error.response?.status == 401) {
        handlerLogout();
      } else {
        throw error;
      }
    }
  };

  const handlerRemoveUser = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await remove(id);
          dispatch(removeUser(id));
          Swal.fire("Deleted!", "The user has been deleted.", "success");
        } catch (error) {
          if (error.response?.status == 401) {
            handlerLogout();
          }
        }
      }
    });
  };
  const handlerUserSelectedForm = (user) => {
    dispatch(onUserSelectedForm(user));
  };
  const handlerOpenForm = () => {
    dispatch(onOpenForm());
  };
  const handlerCloseForm = () => {
    dispatch(onCloseForm());
    dispatch(loadingError({}));
  };

  return {
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
  };
};

