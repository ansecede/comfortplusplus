import React, { useState } from "react";
import { Link } from "react-router-dom";
import menu from "../../assets/menu.svg";
import { FaTimes } from "react-icons/fa";
import "./navbar.css";

function NavBar() {
  const [toggle, setToggle] = useState(false);
  const menuClickHandler = () => setToggle(!toggle);

  return (
    <nav className="w-full flex bg-gray-800 py-6 justify-between items-center navbar">
      <Link to={"/about"}>
        <h1 className="text-xl font-semibold text-gray-50 sm:pl-20 pl-5">
          Comfort++
        </h1>
      </Link>
      <ul className="list-none hidden sm:flex justify-end items-center pr-20 text-gray-50 ">
        <li className="mr-10">
          <Link to={"/"}>Home</Link>
        </li>
        <li>
          <Link to={"/reports"}>Reports</Link>
        </li>
      </ul>

      {/* Menu icon */}
      <div
        className="sm:hidden justify-end items-center sm:pr-20 pr-5 z-10 "
        onClick={menuClickHandler}
      >
        {" "}
        {!toggle ? (
          <img
            src={menu}
            alt="menu"
            className="w-[28px] h-[28px] object-contain"
          />
        ) : (
          <FaTimes color="white" />
        )}
      </div>

      {/* Mobile menu */}
      <ul
        className={
          !toggle
            ? "hidden"
            : "absolute top-0 left-0 w-full h-screen bg-gray-800 text-gray-50 flex flex-col justify-center text-center"
        }
      >
        <li className="text-5xl py-6">
          <Link to={"/about"} onClick={menuClickHandler}>
            About
          </Link>
        </li>
        <li className="text-5xl py-6">
          <Link to={"/"} onClick={menuClickHandler}>
            Home
          </Link>
        </li>
        <li className="text-5xl py-6">
          <Link to={"/reports"} onClick={menuClickHandler}>
            Reports
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
