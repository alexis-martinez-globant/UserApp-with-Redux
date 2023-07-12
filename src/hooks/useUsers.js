import { useReducer, useState } from "react";
import { userReducer } from "../reducers/usersReducer";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const initialUsers = [
  {
    id: 1,
    userName: "Vegeta",
    password: "123",
    email: "vegeta@capsulecorp.com",
  },
];
const initialUserForm = {
  id: 0,
  userName: "",
  password: "",
  email: "",
};
export const useUsers = () => {
  const [users, dispatch] = useReducer(userReducer, initialUsers);
  const [userSelected, setUserSelected] = useState(initialUserForm);
  const [visibleForm, setVisibleForm] = useState(false);
  const navigate = useNavigate();

  const handlerAddUser = (user) => {
    dispatch({
      type: user.id === 0 ? "addUser" : "updateUser",
      payload: user,
    });

    Swal.fire(
      user.id === 0 ? "Created" : "Actualized",
      user.id === 0
        ? "The user was created successfully"
        : "The user was actualized successfully",
      "success"
    );
    handlerCloseForm();
    navigate("/users");
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
  };
  return {
    users,
    userSelected,
    initialUserForm,
    visibleForm,

    handlerAddUser,
    handlerUserSelectedForm,
    handlerRemoveUser,
    handlerOpenForm,
    handlerCloseForm,
  };
};

