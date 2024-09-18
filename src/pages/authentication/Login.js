import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signin } from "../../redux/actions/signInActions"; 
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validateEmail = (email) => {
    
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
   
    setEmailError("");
    setPasswordError("");

    
    if (!email) {
      setEmailError("Email is required");
      return;
    }
    if (!validateEmail(email)) {
      setEmailError("Invalid email format");
      return;
    }
    if (!password) {
      setPasswordError("Password is required");
      return;
    }

    try {
      const response = await dispatch(signin({ email, password }));
      if (response.type === 'SIGNIN_SUCCESS') {
        const uniqueId = response.payload.data.uniqueId; 
        const token = response.payload.data.jwt.jsonWebToken;
        console.log(token)
        toast.success("Sign in successful! Redirecting...");
        setTimeout(() => {
          navigate("/profile-developer", {
            state: { uniqueId: uniqueId, token: token } 
          });
        }, 3000); 
      }
    } catch (error) {
      setPasswordError(error.payload || "Signin failed!"); 
    }
  };

  return (
    <div
      className="relative min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: "url('/images/bg1_.jpg')" }}
    >
      <div className="absolute inset-0 bg-black opacity-70"></div>
      <div className="relative z-10 bg-white rounded-lg shadow-lg p-8 md:p-10 w-11/12 max-w-sm">
        <div className="flex justify-center mb-8">
          <img src="/images/gpfpLogo.svg" alt="Logo" className="h-8 w-auto" />
        </div>

        <h2 className="text-xl font-medium mb-8 text-center text-primary">
          Welcome
        </h2>

        <form onSubmit={handleSubmit}>
          {emailError && <p className="text-red-500 text-xs mb-2">{emailError}</p>}
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 text-xs md:text-sm font-normal mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="appearance-none border rounded w-full py-1 md:py-2 px-2 md:px-3 text-xs md:text-sm text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-2">
            <label
              htmlFor="password"
              className="block text-gray-700 text-xs md:text-sm font-normal mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="appearance-none border rounded w-full py-1 md:py-2 px-2 md:px-3 text-xs md:text-sm text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            {passwordError && <p className="text-red-500 text-xs mt-1">{passwordError}</p>}
          </div>

          <div className="mb-6 text-right">
            <Link
              to="/forgot-password"
              className="text-sm text-[#467D9A] hover:text-secondary"
            >
              Forget Password?
            </Link>
          </div>

          <button
            type="submit"
            className="w-full bg-[#467D9A] hover:bg-secondary text-white font-medium py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Sign In
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-700">
            Not a member?{" "}
            <Link
              to="/"
              className="text-primary hover:text-secondary font-medium"
            >
              Signup now
            </Link>
          </p>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
};

export default Login;
