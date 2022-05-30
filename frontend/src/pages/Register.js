import { register, reset } from "../../src/features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.auth
  );
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
    password2: "",
  });
  const { fullname, email, password, password2 } = formData;

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (isSuccess || user) {
      navigate("/");
    }
    setTimeout(() => {
      dispatch(reset());
    }, 5000);
  }, [user, isError, isSuccess, message, navigate, dispatch, isLoading]);
  const HandleChange = (e) => {
    const { name, value } = e.target;
    setFormData((preState) => ({ ...preState, [name]: value }));
  };

  const handeSubmit = (e) => {
    e.preventDefault();
    if (password !== password2) {
      alert("Passwords do not match");
    } else {
      const userData = {
        fullname,
        email,
        password,
      };

      dispatch(register(userData));
    }
  };
  if (isLoading) {
    return <h2>Loading....</h2>;
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
         rounded-lg px-8 py-4 my-4 "
        >
          <div className="flex flex-col items-center">
            <h1 className="text-2xl">Register</h1>
          </div>

          <div className="flex flex-col py-4 items-start">
            <div className="flex flex-col py-2">
              <label>Full Name</label>
              <input
                onChange={HandleChange}
                className=" px-2 py-2 border-2 rounded-md"
                type="text"
                name="fullname"
              />
            </div>
            <div className="flex flex-col py-2">
              <label>Email</label>
              <input
                onChange={HandleChange}
                className=" px-2 py-2 border-2 rounded-md"
                type="text"
                name="email"
              />
            </div>
            <div className="flex flex-col py-2  items-start">
              <label>Password</label>
              <input
                onChange={HandleChange}
                name="password"
                type="password"
                className=" px-2 py-2 border-2 rounded-md"
              />
            </div>{" "}
            <div className="flex flex-col py-2 items-start">
              <label>Re-Enter Password</label>
              <input
                onChange={HandleChange}
                name="password2"
                type="password"
                className=" px-2 py-2 border-2 rounded-md"
              />
            </div>
          </div>
          <div className="flex justify-center">
            <button className="rounded-xl px-6 py-3 bg-blue-400 text-white text-lg">
              Register
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Register;
