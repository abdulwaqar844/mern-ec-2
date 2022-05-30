import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { reset, login } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.auth
  );
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  // setTimeout(() => {
  //   dispatch(reset());
  // }, 8000);
  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (isSuccess || user) {
      navigate("/");
    }
    dispatch(reset());
  }, [[user, isError, isSuccess, message, navigate, dispatch]]);
  //Handler User Input
  const HandleChange = (e) => {
    const { name, value } = e.target;
    setFormData((preState) => ({ ...preState, [name]: value }));
  };
  const handeSubmit = (e) => {
    e.preventDefault();
    dispatch(login(formData));
  };

  if (isLoading && !isSuccess) {
    <h2>Loading</h2>;
  }

  return (
    <div
      className="py-8   
     mx-4  flex flex-col items-center justify-center px-12"
    >
      <div>
        <h1 className="text-3xl">MERN App</h1>
      </div>
      <form onSubmit={handeSubmit}>
        <div
          className="flex flex-col border-2
         rounded-lg px-8 py-8 my-4 "
        >
          <div className="flex flex-col items-center">
            <h1 className="text-2xl">Login</h1>
          </div>
          <div className="flex flex-col py-4 items-start">
            <div className="flex flex-col">
              <label>Email</label>
              <input
                className=" px-2 py-2 border-2 rounded-md"
                type="text"
                name="email"
                onChange={HandleChange}
              />
            </div>
            <div className="flex flex-col py-4 items-start">
              <label>Password</label>
              <input
                type="password"
                name="password"
                className=" px-2 py-2 border-2 rounded-md"
                onChange={HandleChange}
              />
            </div>
            <div>
              {message != null ? (
                <h1 className="text-danger text-center"> {message}</h1>
              ) : null}
            </div>
          </div>
          <div className="flex justify-center">
            <button className="rounded-xl px-6 py-3 bg-blue-400 text-white text-lg">
              Login
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Login;
