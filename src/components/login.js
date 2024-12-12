import React, { useState } from "react";
import { FaArrowRightToBracket } from "react-icons/fa6";
import fullimage from "../assets/fullimage.png"; // Replace with the actual image path in your React setup
import icon from "../assets/suslogo.png"; // Replace with the actual image path in your React setup
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import Toastify styles

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Hardcoded username and password validation
    const validEmail = "optibyte@gmail.com";
    const validPassword = "demo";

    if (email === validEmail && password === validPassword) {
      // Simulate a successful response (you can replace this with your API call)
      const response = {
        data: {
          success: true,
          token: "your-jwt-token",
          role: "USER",
          empId: "12345",
        },
      };

      if (response.data.success) {
        // Set credentials in localStorage
        localStorage.setItem("auth", "true");
        localStorage.setItem("token", response.data.token); // Store the JWT token
        localStorage.setItem("role", response.data.role); // Store user role
        localStorage.setItem("empId", response.data.empId); // Store employee ID

        // Navigate to the home page or reload
        window.location.href = "/";
      } else {
        // Handle login failure (optional)
        toast.error("Login failed! Please check your credentials.");
      }
    } else {
      // Show error message using Toastify if login fails
      toast.error("Invalid email or password!");
    }
  };

  return (
    <div className="font-quicksand bg-white lg:bg-login-bg lg:h-screen lg:overflow-hidden">
      <div className="flex flex-col lg:flex-row h-full">
        {/* Left Section */}
        <div className="w-full hidden lg:flex lg:w-1/2 flex items-center justify-center bg-login-bg">
          <div className="relative w-full h-full">
            {/* Background Image */}
            <img
              src={fullimage}
              alt="Background"
              className="absolute inset-0 w-full h-full object-cover"
            />
            {/* Text Overlay */}
            <div className="absolute inset-0 flex flex-col justify-between text-white text-center p-8 bg-black bg-opacity-40">
              <h1 className="text-5xl lg:text-7xl font-extrabold mb-6 tracking-wide">
                Welcome to OptiByte!
              </h1>
              <p className="text-lg lg:text-2xl font-medium mt-auto">
                Empower your future with our cutting-edge Energy Management System.
                <br />
                Optimize energy usage, enhance sustainability, and lead the way toward a greener planet.
                <br />
                Join us and make a difference today!
              </p>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-4 bg-white">
  <div className="lg:hidden text-center mb-6 mt-12 w-full max-w-md">
    <h1 className="text-custom-blue text-4xl font-extrabold tracking-wider">
      Welcome to OptiByte Energy Management System!
    </h1>
    <p className="text-lg text-black mt-2 font-medium">
      We're excited to have you on board. Please log in to optimize your energy usage and contribute to a more sustainable future.
    </p>
  </div>
  <div className="w-full mt-8 lg:mt-0 max-w-md bg-white rounded-lg shadow-xl lg:shadow-none p-8 lg:p-10 flex flex-col justify-between">
    <div>
      <div className="flex justify-center mb-6">
        <img
          src={icon}
          aria-hidden="true"
          className="w-32 h-39"
          alt="OptiByte Logo"
        />
      </div>
      <div className="text-center text-login1 mb-6">
        <h6 className="text-xl font-bold">Login to Your OptiByte Account</h6>
        <p className="text-blueGray-500 text-login1 text-base mt-2">
          Enter your email and password to access your personalized energy management dashboard.
        </p>
      </div>
      <div className="max-w-sm mx-auto">
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <input
              type="text"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              name="email"
              placeholder="Email"
              required
              className="w-full h-12 border placeholder-custom border-gray-300 rounded-lg py-2 px-4 text-base"
              autoComplete="off"
            />
          </div>
          <div className="mb-6">
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              name="password"
              placeholder="Password"
              className="w-full h-12 border placeholder-custom border-gray-300 rounded-lg py-2 px-4 text-base"
              autoComplete="off"
            />
          </div>
          <div className="flex justify-end mb-6">
            <a
              href="#"
              className="text-placeholder text-sm font-semibold"
            >
              Forgot Password?
            </a>
          </div>
          <button
            type="submit"
            className="bg-blue-600 h-12 text-white text-base font-semibold rounded-lg py-2 px-4 w-full flex items-center justify-center"
          >
            <FaArrowRightToBracket className="mr-3 text-lg" />
            Sign In
          </button>
        </form>
      </div>
    </div>
  </div>
</div>

      </div>

      {/* Toast Container */}
      <ToastContainer />
    </div>
  );
}
