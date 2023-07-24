import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { UserForm } from "../components/UserForm";
import { useUsers } from "../hooks/useUsers";

export const RegisterPage = () => {
  const { users = [], initialUserForm } = useUsers();

  const [userSelected, setUserSelected] = useState(initialUserForm);

  const { id } = useParams();

  useEffect(() => {
    if (id) {
      const user = users.find((u) => u.id == id) || initialUserForm;
      setUserSelected(user);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <div className="container my-4">
      <h4>{userSelected.id > 0 ? "Edit user " : "Register new user"}</h4>
      <div className="raw">
        <div className="col">
          <UserForm userSelected={userSelected} />
        </div>
      </div>
    </div>
  );
};

