import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

const Navbar = () => {
  const [cookies, setCookies] = useCookies(["access_token"]);
  const navigate = useNavigate();

  const logout = () => {
    setCookies("access_token", "");
    window.localStorage.removeItem("userID");
    navigate("/auth");
  };
  return (
    <nav className="flex justify-center items-center bg-gray-800 text-white py-3 ">
      <ul className="flex">
        <li className="px-4 py-2">
          <Link to="/">Home</Link>
        </li>
        <li className="px-4 py-2">
          <Link to="/create-recipe">Create Recipe</Link>
        </li>
        {!cookies?.access_token ? (
          <li className="px-4 py-2">
            <Link to="/auth">Login/Register</Link>
          </li>
        ) : (
          <>
            <li className="px-4 py-2">
              <Link to="/saved-recipes">Saved Recipes</Link>
            </li>
            <li>
              <button
                onClick={logout}
                type="submit"
                className="w-full bg-blue-800 text-white rounded-md py-2 px-4 inline-flex items-center justify-center hover:bg-blue-600 transition-all duration-200 ease-in"
              >
                logout
              </button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
