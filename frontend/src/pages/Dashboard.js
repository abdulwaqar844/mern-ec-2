import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { reset } from "../features/auth/authSlice";
import Goals from "./Goals";

function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isError, message, isLoading, isSuccess } = useSelector(
    (state) => state.auth
  );
  useEffect(() => {
    console.log(user);
    if (!user) {
      navigate("/login");
    }
    dispatch(reset());
  }, [user, navigate, isError, message, dispatch, isSuccess]);
  if (isLoading) {
    return <div>Loading</div>;
  }
  return (
    <div
      className="container flex flex-col"
      style={{
        justifyContent: "center",
        alignItems: "center",
        margin: "0rem 7rem",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h1 style={{ fontSize: "1rem" }}>Welcome {user && user.fullname}</h1>
        <div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",

              width: "23rem",
            }}
          >
            <div>
              <h2>Goals</h2>
            </div>
            <a href="goal/createNew" className="btn btn-success">
              Add New Goal
            </a>
          </div>
        </div>
        <Goals />
      </div>
    </div>
  );
}

export default Dashboard;
