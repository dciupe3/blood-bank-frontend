import { useNavigate } from "react-router-dom";

import LayoutMini from "../components/layout/general/LayoutMini";
import LoginForm from "../components/login/LoginForm";

function LoginPage() {
  const navigate = useNavigate();

  function loginHandler(loginData) {
    fetch("http://localhost:8080/user/login", {
      method: "POST",
      body: JSON.stringify(loginData),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to log in");
        }
        return response.json();
      })
      .then((data) => {
        // store token, userType and userId somewhere
        localStorage.setItem("token", data.token);
        localStorage.setItem("userType", data.userType);
        localStorage.setItem("userId", data.userId);

        switch (data.userType) {
          case "ADMIN":
            navigate("/admin", { replace: true });
            break;
          case "DOCTOR":
            navigate("/doctor", { replace: true });
            break;
          case "DONOR":
            navigate("/donor", { replace: true });
            break;
          default:
            throw new Error("Invalid user type");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  return (
    <LayoutMini>
      <section>
        <h1>Login</h1>
        <LoginForm onLogin={loginHandler} />
      </section>
    </LayoutMini>
  );
}

export default LoginPage;
