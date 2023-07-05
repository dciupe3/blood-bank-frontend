import { useNavigate } from "react-router-dom";

import SignUpForm from "../components/login/SignUpForm";
import LayoutMini2 from "../components/layout/general/LayoutMini2";

function SignUp() {
  const navigate = useNavigate();

  function signUpHandler(signUpData) {
    fetch("http://localhost:8080/api/donor/signup", {
      method: "POST",
      body: JSON.stringify(signUpData),
      headers: {
        "Content-Type": "application/json",
      },
    }).then(() => {
      navigate("/", { replace: true });
    });
  }

  return (
    <LayoutMini2>
      <section>
        <h1>Sign Up</h1>
        <SignUpForm onSignUp={signUpHandler} />
      </section>
    </LayoutMini2>
  );
}

export default SignUp;
