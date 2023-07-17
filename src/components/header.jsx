import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/visang_logo.png";

const Header = () => {
  const [theme, setTheme] = useState("pastel");
  const toggleTheme = () => {
    setTheme(theme === "dracula" ? "pastel" : "dracula");
  };

  useEffect(() => {
    document.querySelector("html").setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <header className="bg-base-100">
      <div className="flex h-16 max-w-screen-xl items-center gap-4 px-2 sm:px-4 lg:px-6">
        <a className="block" href="/">
          <span className="sr-only">Home</span>
          <img src={logo} className="h-16" />
        </a>

        <div className="flex flex-1 items-center justify-end lg:justify-between font-bold">
          <nav aria-label="Global" className="hidden lg:block">
            <ul className="flex items-center gap-6 text-sm">
              <li>
                <a href="/">학(學),습(習) 데이터</a>
              </li>

              <li>
                <a href="/">브랜드 데이터</a>
              </li>

              <li>
                <a href="/">데이터 기반 조직도</a>
              </li>

              <li>
                <a href="/">데이터 메타정보</a>
              </li>
            </ul>
          </nav>

          {/* <div className="flex items-center gap-4">
            <div className="md:flex md:gap-4">
              <input
                id="checkTheme"
                type="checkbox"
                className="toggle"
                checked={theme == "pastel" ? true : false}
                onClick={toggleTheme}
              />
            </div>
          </div> */}
          <div className="drawer-end z-10 pl-2 lg:hidden float-right">
            <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">
              <label htmlFor="my-drawer-4" className="drawer-button btn">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="inline-block w-5 h-5 stroke-current"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  ></path>
                </svg>
              </label>
            </div>
            <div className="drawer-side">
              <label htmlFor="my-drawer-4" className="drawer-overlay"></label>
              <ul className="menu p-4 w-80 h-full bg-base-200 text-base-content">
                <li>
                  <a href="/">학(學),습(習) 데이터</a>
                </li>

                <li>
                  <a href="/">브랜드 데이터</a>
                </li>

                <li>
                  <a href="/">데이터 기반 조직도</a>
                </li>

                <li>
                  <a href="/">데이터 메타정보</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
