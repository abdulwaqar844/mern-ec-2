import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout, reset } from "../../features/auth/authSlice";
function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const HandleClick = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarTogglerDemo03"
          aria-controls="navbarTogglerDemo03"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <a className="navbar-brand" href="#">
          MERN STack App
        </a>
        <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
          {user ? (
            <div className="navbar-nav ms-auto mb-2 mb-lg-0">
              <button onClick={HandleClick} className="btn btn-outline-primary">
                Logout
              </button>
            </div>
          ) : (
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="/">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/register">
                  Register
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link " href="/login">
                  Login
                </a>
              </li>
            </ul>
          )}
        </div>
      </div>
    </nav>
    // <div
    //   style={{
    //     padding: "5px 0px",

    //     display: "flex",
    //     flexDirection: "row",
    //     justifyContent: "space-around",
    //     alignItems: "center",
    //   }}
    // >
    //   <a>MERN App</a>
    //   {user ? (
    //     <button onClick={HandleClick}> Logout</button>
    //   ) : (
    //     <ul
    //       style={{
    //         padding: "1px 4px",

    //         listStyle: "none",
    //         display: "flex",
    //         flexDirection: "row",
    //         justifyContent: "space-between",
    //       }}
    //     >
    //       <li
    //         style={{
    //           padding: "1px 4px",
    //         }}
    //       >
    //         <a href="/">Home</a>
    //       </li>
    //       <li
    //         style={{
    //           padding: "1px 4px",
    //         }}
    //       >
    //         <a href="/login">Login</a>
    //       </li>
    //       <li
    //         style={{
    //           padding: "1px 4px",
    //         }}
    //       >
    //         <a href="/register">Register</a>
    //       </li>
    //     </ul>
    //   )}
    // </div>
  );
}

export default Navbar;
