import { useReducer } from "react";
import { loginReducer } from "../reducers/loginReducer";
import Swal from "sweetalert2";
import { loginUser } from "../services/authService";
import { useNavigate } from "react-router-dom";

const initialLogin = JSON.parse(sessionStorage.getItem("login")) || {
  isAuth: false,
  user: undefined,
};

export const useAuth = () => {
  const [login, dispatch] = useReducer(loginReducer, initialLogin);
  const navidate = useNavigate();
  const handlerLogin = ({ userName, password }) => {
    const isLogin = loginUser({ userName, password });
    if (isLogin) {
      const user = { userName: "admin" };
      dispatch({ type: "login", payload: user });
      sessionStorage.setItem("login", JSON.stringify({ isAuth: true, user }));
      navidate("/users");
    } else {
      Swal.fire(
        "Validation fail",
        "The userName or the password has errors ",
        "error"
      );
    }
  };

  const handlerLogout = () => {
    dispatch({
      type: "logout",
    });
    sessionStorage.removeItem("login");
  };
  return {
    login,
    handlerLogin,
    handlerLogout,
  };
};

