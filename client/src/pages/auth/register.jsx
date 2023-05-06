import React, { useState } from "react";
import Form from "../../components/form";
import axios from "axios";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = async (e) => {
    e?.preventDefault();
    try {
      await axios.post("http://localhost:3001/auth/register", {
        username,
        password,
      });
      alert("Registration completed! Now login");
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <Form
      username={username}
      setUsername={setUsername}
      password={password}
      setPassword={setPassword}
      buttonText="Register"
      onSubmit={onSubmit}
    />
  );
};

export default Register;
