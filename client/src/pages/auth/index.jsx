import React from "react";
import Register from "./register";
import Login from "./login";

const Auth = () => {
  return (
    <main className="">
      <div className="flex justify-center mt-24 w-full gap-5">
        <Register />
        <Login />
      </div>
    </main>
  );
};

export default Auth;
