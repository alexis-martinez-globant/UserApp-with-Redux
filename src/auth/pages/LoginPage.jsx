import { useContext, useState } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../context/AuthContext";

export const LoginPage = () => {
  const { handlerLogin } = useContext(AuthContext);
  const initialLoginForm = {
    username: "",
    password: "",
  };
  const [loginForm, setLoginForm] = useState(initialLoginForm);
  const { username, password } = loginForm;

  const onInputChange = ({ target }) => {
    const { name, value } = target;
    setLoginForm({
      ...loginForm,
      [name]: value,
    });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    if (!username || !password) {
      Swal.fire("Validation fail", "All input must be filled", "error");
      return;
    }
    handlerLogin({ username, password });

    setLoginForm(initialLoginForm);
  };
  return (
    <>
      <div className="modal" style={{ display: "block" }} tabIndex="-1">
        <div className="modal-dialog ">
          <div className="modal-content ">
            <div className="modal-header bg-secondary">
              <h5 className="modal-title text-white ">Login</h5>
            </div>
            <form onSubmit={onSubmit} className="form-group">
              <div className="modal-body">
                <input
                  type="text"
                  className="form-control my-3 w-75"
                  name="username"
                  placeholder="username"
                  value={username}
                  onChange={onInputChange}
                />
                <input
                  type="password"
                  className="form-control my-3 w-75"
                  name="password"
                  placeholder="password"
                  value={password}
                  onChange={onInputChange}
                />
              </div>
              <div className="modal-footer">
                <button type="submit" className="btn btn-primary">
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

