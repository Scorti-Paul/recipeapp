import React from "react";

const Form = ({
  username,
  setUsername,
  password,
  setPassword,
  buttonText,
  onSubmit,
}) => {
  return (
    <>
      <form
        onSubmit={onSubmit}
        className="bg-slate-50 p-6 shadow-md rounded-md"
      >
        <h2 className="text-center text-3xl mb-3 font-bold text-blue-950">
          {buttonText}
        </h2>

        <div className="mb-4">
          <label className="block" htmlFor="username">
            Username
          </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            className="w-full rounded-sm"
          />
        </div>

        <div className="mb-4">
          <label className="block" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            className="w-full rounded-sm"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-800 text-white rounded-md py-2 inline-flex items-center justify-center hover:bg-blue-600 transition-all duration-200 ease-in"
        >
          {buttonText}
        </button>
      </form>
    </>
  );
};

export default Form;
