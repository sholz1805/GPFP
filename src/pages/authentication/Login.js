import React from 'react';


const Login = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: "url('/images/bg1_.jpg')" }}>
      <div className="absolute inset-0 bg-black opacity-70"></div>
      <div className="relative z-10 bg-white rounded-lg shadow-lg p-8 md:p-10 w-11/12 max-w-sm">
        
        <div className="flex justify-center mb-8">
          <img src="/images/gpfpLogo.svg" alt="Logo" className="h-8 w-auto" />
        </div>
        
        <h2 className="text-xl font-medium mb-8 text-center text-primary">Welcome</h2>
        <form>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 text-xs md:text-sm font-normal mb-2">Email</label>
            <input type="email" id="email" placeholder='Enter your email'  className="appearance-none border rounded w-full py-1 md:py-2 px-2 md:px-3 text-xs md:text-sm text-gray-700 leading-tight focus:outline-none focus:shadow-outline"  />
          </div>
          <div className="mb-2">
            <label htmlFor="password" className="block text-gray-700 text-xs md:text-sm font-normal mb-2">Password</label>
            <input type="password" id="password" placeholder='Enter your password'  className="appearance-none border rounded w-full py-1 md:py-2 px-2 md:px-3 text-xs md:text-sm text-gray-700 leading-tight focus:outline-none focus:shadow-outline"  />
          </div>

          <div className="mb-6 text-right">
            <a href="/forgot-password" className="text-sm text-[#467D9A] hover:text-secondary">Forget Password?</a>
          </div>

          <button type="submit" className="w-full bg-[#467D9A] hover:bg-secondary text-white font-medium py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Sign In
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-700">
            Not a member? <a href="/signup" className="text-primary hover:text-secondary font-medium">Signup now</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
