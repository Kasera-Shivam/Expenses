import React from "react";
import Logo from "/logo.jpeg";
import { Link, useLocation } from "react-router-dom";
import { NavLinks } from "@/lib/links";
import Profile from "../profile/Profile";

const Header = () => {
  const location = useLocation();

  return (
    <header className="flex h-24 w-screen max-w-full flex-col sm:h-16">
      <section className="flex h-full w-full items-center justify-between px-5 xl:px-24">
        <section className="flex h-full items-center gap-x-8">
          <Link to={"/"}>
            <img src={Logo} alt="logo" />
          </Link>
          <ul className="hidden h-full items-center gap-x-8 sm:flex">
            {NavLinks.map((obj, index) => (
              <li
                key={index}
                className="relative flex h-full w-fit items-center justify-center font-medium capitalize"
              >
                <Link to={obj.to}>{obj.name}</Link>
                <div
                  className={`absolute bottom-0 h-1 w-full rounded-full ${location.pathname === obj.to ? "bg-black" : "bg-transparent"}`}
                ></div>
              </li>
            ))}
          </ul>
        </section>
        <Profile />
      </section>
      <ul className="flex h-full items-center gap-x-8 overflow-x-auto overflow-y-hidden px-5 sm:hidden">
        {NavLinks.map((obj, index) => (
          <li
            key={index}
            className="relative flex h-full w-fit shrink-0 items-center justify-center font-medium capitalize"
          >
            <Link to={obj.to}>{obj.name}</Link>
            <div
              className={`absolute bottom-0 h-1 w-full rounded-full ${location.pathname === obj.to ? "bg-black" : "bg-transparent"}`}
            ></div>
          </li>
        ))}
      </ul>
    </header>
  );
};

export default Header;
