import { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { UserContext } from "../context/UserContext";

export const UserForm = ({ userSelected, handlerCloseForm }) => {
  const { handlerAddUser, initialUserForm, errors } = useContext(UserContext);
  const [userForm, setUserForm] = useState(initialUserForm);

  const { id, userName, password, email } = userForm;

  useEffect(() => {
    setUserForm({
      ...userSelected,
      password: "",
    });
  }, [userSelected]);

  const onInputChange = ({ target }) => {
    const { name, value } = target;
    setUserForm({
      ...userForm,
      [name]: value,
    });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    // validation is in the hook useUsers
    // if (!userName || (!password && id === 0) || !email) {
    //   Swal.fire(
    //     "Something went wrong!",
    //     "All fields must to be filled",
    //     "error"
    //   );
    //   return;
    // }
    // if (!email.includes("@")) {
    //   Swal.fire(
    //     "Something went wrong with the email",
    //     "The email has an error!",
    //     "error"
    //   );
    //   return;
    // }
    handlerAddUser(userForm);
    // setUserForm(initialUserForm);
  };
  const onCloseForm = () => {
    handlerCloseForm();
    setUserForm(initialUserForm);
  };
  return (
    <>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          className="form-control my-3 w-75"
          placeholder="Username"
          name="userName"
          value={userName}
          onChange={onInputChange}
        />
        <p className="text-danger">{errors?.userName}</p>
        {id > 0 || (
          <input
            type="password"
            className="form-control my-3 w-75"
            placeholder="Password"
            name="password"
            value={password}
            onChange={onInputChange}
          />
        )}
        <p className="text-danger">{errors?.password}</p>
        <input
          type="text"
          className="form-control my-3 w-75"
          placeholder="Email"
          name="email"
          value={email}
          onChange={onInputChange}
        />
        <p className="text-danger">{errors?.email}</p>
        <input type="hidden" name="id" value={id} />
        <button className="btn btn-primary" type="submit">
          {id > 0 ? "Confirm" : "Create"}
        </button>
        {!handlerCloseForm || (
          <button
            className="btn btn-secondary mx-2"
            type="button"
            onClick={() => onCloseForm()}
          >
            Close
          </button>
        )}
      </form>
    </>
  );
};

