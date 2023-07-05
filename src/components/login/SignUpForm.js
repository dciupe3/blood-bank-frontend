import { useRef } from "react";

import Card from "../ui/Card";
import classes from "./SignUpForm.module.css";

function SignUpForm(props) {
  const usernameInputRef = useRef();
  const passwordInputRef = useRef();
  const firstNameInputRef = useRef();
  const lastNameInputRef = useRef();
  const bloodInputRef = useRef();
  const emailInputRef = useRef();
  const phoneInputRef = useRef();

  function signUpHandler(event) {
    event.preventDefault();

    const enteredUsername = usernameInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    const enteredFirstName = firstNameInputRef.current.value;
    const enteredLastName = lastNameInputRef.current.value;
    const enteredBlood = bloodInputRef.current.value;
    const enteredEmail = emailInputRef.current.value;
    const enteredPhone = phoneInputRef.current.value;

    const signUpData = {
      username: enteredUsername,
      password: enteredPassword,
      firstName: enteredFirstName,
      lastName: enteredLastName,
      bloodType: enteredBlood,
      email: enteredEmail,
      phoneNumber: enteredPhone
    };

    props.onSignUp(signUpData);
  }

  return (
    <Card>
      <form className={classes.form} onSubmit={signUpHandler}>
        <div className={classes.control}>
          <label htmlFor="username">Username</label>
          <input type="text" required id="username" ref={usernameInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            required
            id="password"
            ref={passwordInputRef}
          />
        </div>
        <div className={classes.control}>
          <label htmlFor="firstName">First name</label>
          <input type="text" required id="firstName" ref={firstNameInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="lastName">Last name</label>
          <input type="text" required id="lastName" ref={lastNameInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="blood">Blood Group</label>
          <input type="text" required id="blood" ref={bloodInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="email">Email</label>
          <input type="email" required id="email" ref={emailInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="phoneNumber">Phone number</label>
          <input type="text" required id="phoneNumber" ref={phoneInputRef} />
        </div>
        <div className={classes.actions}>
          <button>Sign Up</button>
        </div>
      </form>
    </Card>
  );
}

export default SignUpForm;
