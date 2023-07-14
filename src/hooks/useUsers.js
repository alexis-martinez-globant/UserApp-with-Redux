import { useReducer, useState } from "react";
import { userReducer } from "../reducers/usersReducer";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { findAll, remove, save, update } from "../services/userService";

const initialUsers = [];
const initialUserForm = {
  id: 0,
  userName: "",
  password: "",
  email: "",
};
const initialError = {
  userName: "",
  password: "",
  email: "",
};
export const useUsers = () => {
  const [users, dispatch] = useReducer(userReducer, initialUsers);
  const [userSelected, setUserSelected] = useState(initialUserForm);
  const [visibleForm, setVisibleForm] = useState(false);
  const [errors, setErrors] = useState(initialError);
  const navigate = useNavigate();

  const getUsers = async () => {
    const result = await findAll();
    dispatch({
      type: "loadingUsers",
      payload: result.data,
    });
  };

  const handlerAddUser = async (user) => {
    let response;
    try {
      if (user.id === 0) {
        response = await save(user);
      } else {
        response = await update(user);
      }
      dispatch({
        type: user.id === 0 ? "addUser" : "updateUser",
        payload: response.data,
      });

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
      // console.error(error);
      if (error.response && error.response.status == 400) {
        setErrors(error.response.data);
      } else if (
        error.response &&
        error.response.status == 500 &&
        error.response.data?.message?.includes("constraint")
      ) {
        // setErrors({ userName: "That name or email is already in use" });
        if (error.response.data?.message?.includes("UK_userName")) {
          setErrors({ userName: "That name is already in use" });
        }
        if (error.response.data?.message?.includes("UK_email")) {
          setErrors({ email: "That email is already in use" });
        }
      } else {
        throw error;
      }
    }
  };
  const handlerUserSelectedForm = (user) => {
    setVisibleForm(true);
    setUserSelected({ ...user });
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
    }).then((result) => {
      if (result.isConfirmed) {
        remove(id);
        dispatch({
          type: "removeUser",
          payload: id,
        });
        Swal.fire("Deleted!", "The user has been deleted.", "success");
      }
    });
  };

  const handlerOpenForm = () => {
    setVisibleForm(true);
  };
  const handlerCloseForm = () => {
    setVisibleForm(false);
    setUserSelected(initialUserForm);
    setErrors({});
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

