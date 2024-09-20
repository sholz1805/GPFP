import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signin } from "../../redux/actions/signInActions";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [response, setResponse] = useState({}); 

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
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
        const role = response.payload.data.role; 
            
        setResponse(response); 
        setLoading(false);
        setIsModalOpen(true); 
      
        setTimeout(() => {
          if (role === 'DEVELOPER') {
            navigate("/profile-developer", {
              state: { uniqueId: uniqueId, token: token },
            });
          } else {
            navigate("/profile-investor", {
              state: { uniqueId: uniqueId, token: token },
            });
          }
        }, 3000);
      }
    } catch (error) {
      setPasswordError(error.payload || "Signin failed!"); 
      setLoading(false);
      setIsModalOpen(true);
  };
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
          {emailError && (
            <p className="text-red-500 text-xs mb-2">{emailError}</p>
          )}
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
            {passwordError && (
              <p className="text-red-500 text-xs mt-1">{passwordError}</p>
            )}
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
            disabled={loading} 
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <p className="text-m font-medium">Loading...</p>
              </div>
            ) : (
              <p>Sign In</p>
            )}
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

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full">
            {response.type === 'SIGNIN_SUCCESS' ? (
              <div className="flex flex-col items-center">
                <FaCheckCircle className="text-green-500 text-4xl mb-3" />
                <p className="text-lg font-semibold">Sign in successful!</p>
                <p className="text-gray-500 mt-2 text-center leading-tight">
                  You will be redirected to your profile page.
                </p>
              </div>
            ) : (
              <div className="flex flex-col items-center">
                <FaTimesCircle className="text-red-500 text-4xl mb-3" />
                <p className="text-lg font-semibold">Error</p>
                <p className="text-gray-500 mt-2 text-center leading-tight">
                  {response.payload || "Signin failed!"}
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};


export default Login;