import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { loginUser } from "../services/authService";
import { useDispatch, useSelector } from "react-redux";
import { onLogin, onLogout } from "../../store/slices/auth/authSlice";

export const useAuth = () => {
  const dispatch = useDispatch();
  const { user, isAdmin, isAuth } = useSelector((state) => state.auth);
  const navidate = useNavigate();

  const handlerLogin = async ({ username, password }) => {
    try {
      const response = await loginUser({ username, password });
      const token = response.data.token;
      const claims = JSON.parse(window.atob(token.split(".")[1]));
      const user = { username: claims.username };
      dispatch(onLogin({ user, isAdmin: claims.isAdmin }));

      sessionStorage.setItem(
        "login",
        JSON.stringify({ isAuth: true, isAdmin: claims.isAdmin, user })
      );
      sessionStorage.setItem("token", `Bearer ${token}`);
      navidate("/users");
    } catch (error) {
      if (error.response?.status == 401) {
        Swal.fire("Validation fail", "Invalid username or password", "error");
      } else if (error.response?.status == 403) {
        Swal.fire("Validation fail", "No access allowed ", "error");
      } else {
        throw error;
      }
    }
  };

  const handlerLogout = () => {
    dispatch(onLogout());
    sessionStorage.removeItem("login");
    sessionStorage.removeItem("token");
    sessionStorage.clear();
  };
  return {
    login: {
      user,
      isAdmin,
      isAuth,
    },
    handlerLogin,
    handlerLogout,
  };
};

