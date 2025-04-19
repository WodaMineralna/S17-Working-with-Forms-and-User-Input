import { useState } from "react";

import Input from "./Input.jsx";

const ERROR_MESSAGES = {
  email: "Please enter a valid email adress.",
  password: "Password must be at least 6 characters long.",
};

export default function Login() {
  const [enteredValues, setEnteredValues] = useState({
    email: "",
    password: "",
  });

  const [didEdit, setDidEdit] = useState({
    email: false,
    password: false,
  });

  const emailIsInvalid = didEdit.email && !enteredValues.email.includes("@");
  const passwordIsInvalid =
    didEdit.password && enteredValues.password.trim().length < 6;

  function handleSubmit(event) {
    event.preventDefault();

    if (emailIsInvalid || passwordIsInvalid) {
      return;
    }

    console.log(
      JSON.stringify(enteredValues) + " [DUMMY] Sending a HTTP request..."
    );
  }

  function handleInputBlur(identifier) {
    setDidEdit((prev) => {
      return {
        ...prev,
        [identifier]: true,
      };
    });
  }

  function handleInputChange(identifier, event) {
    setEnteredValues((prevValues) => ({
      ...prevValues,
      [identifier]: event.target.value,
    }));
    setDidEdit((prev) => {
      return {
        ...prev,
        [identifier]: false,
      };
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>

      <div className="control-row">
        <Input
          label="Email"
          id="email"
          type="email"
          name="email"
          error={emailIsInvalid && ERROR_MESSAGES.email}
          onBlur={() => handleInputBlur("email")}
          onChange={(event) => handleInputChange("email", event)}
          value={enteredValues.email}
        />

        <Input
          label="Password"
          id="password"
          type="password"
          name="password"
          error={passwordIsInvalid && ERROR_MESSAGES.password}
          onBlur={() => handleInputBlur("password")}
          onChange={(event) => handleInputChange("password", event)}
          value={enteredValues.password}
        />
      </div>

      <p className="form-actions">
        <button className="button button-flat">Reset</button>
        <button className="button">Login</button>
      </p>
    </form>
  );
}
