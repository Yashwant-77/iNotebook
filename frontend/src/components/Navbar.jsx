import React, { useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ProfileInfo from "./ProfileInfo";

function Navbar() {
  let location = useLocation();
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
  const ref = useRef();

  const handlProfileClick = () => {
    ref.current.click();
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-white navbar-light border-bottom shadow-sm ">
        <div className="container-fluid">
          <Link
            className="navbar-brand  fw-bold"
            to="/"
            style={{ color: "#6366f1" }}
          >
            iNotebook
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  className={`nav-link fw-semibold ${
                    location.pathname === "/" ? "active" : ""
                  }`}
                  aria-current="page"
                  to="/"
                >
                  Home
                </Link>
              </li>
              <li
                className={`nav-item  ${
                  location.pathname === "/" ? "active" : ""
                }`}
              >
                <Link className="nav-link" to="/about">
                  About
                </Link>
              </li>
            </ul>

            {!localStorage.getItem("token") ? (
              <form action="" className="d-flex">
                <Link
                  className="btn btn-outline-primary mx-1"
                  to="/login"
                  role="button"
                >
                  Login
                </Link>
                <Link
                  className="btn btn-outline-primary mx-1"
                  to="/signup"
                  role="button"
                >
                  SignUp
                </Link>
              </form>
            ) : (
              <div className="d-flex flex-column  flex-lg-row align-items-lg-center">
                {/* experimenting from now */}
                <i
                  className="fa-solid fa-user mx-lg-4 mx-sm-2 "
                  style={{
                    backgroundColor: "#f3f4f6", // light gray
                    color: "#6366f1", // primary indigo
                    padding: "8px",
                    borderRadius: "50%",
                    cursor: "pointer",
                  }}
                  onClick={handlProfileClick}
                ></i>
                <div className="d-flex flex-column flex-lg-row ">
                  <div
                    style={{ maxWidth: "fit-content" }}
                    className="btn btn-outline-primary mt-s-2"
                    onClick={handleLogout}
                  >
                    Logout
                  </div>

                  <div>
                    {/* <!-- Button trigger modal --> */}
                    <button
                      type="button"
                      ref={ref}
                      className="btn btn-primary d-none"
                      data-bs-toggle="modal"
                      data-bs-target="#Modal2"
                    ></button>
                    <ProfileInfo />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
