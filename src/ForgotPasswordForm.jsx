import React, { useState, useContext } from "react";
import { UserContext } from "./assets/components/context-api/user-context/UserContext";
import MainHeader from './assets/components/home-components/MainHeader';
import TopHeader from './assets/components/home-components/TopHeader';
import { Helmet } from "react-helmet";
import Footer from "./assets/components/home-components/Footer";
import { Link } from "react-router-dom";

const ForgotPasswordForm = () => {
  const { forgotPassword } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await forgotPassword(email);
      setMessage(response.message || "Password reset link sent to your email.");
      setError("");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to send reset link.");
      setMessage("");
    }
  };

  return (
    <>
    <Helmet>
    <title>Fogot Password - Resin By Saidat</title>
    </Helmet>
    <TopHeader />
    <MainHeader />
    <div className="flex flex-col w-[50%] h-[500px] justify-start items-center self-center mx-auto border">
      <div className="w-full flex flex-col justify-start items-center self-center mx-auto mt-[100px]">
        <h2 className="text-[26px] font-semibold mb-2">Forgot Password?</h2>
        <form onSubmit={handleSubmit} className="flex flex-col items-center w-full">
            <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-[70%] py-3 pl-1 border border-solid border-yellow-900 rounded"
            />

            {/* button */}
            <button type="submit" className="border px-[15px] py-[10px] mt-5 bg-yellow-900 text-white text-[18px] rounded">Send Reset Link</button>

            {/* Remember password */}
          <div className="flex flex-row justify-start text-left font-['Poppins-Regular',_sans-serif] text-small font-normal relative mt-6">
            <div className='flex flex-row items-start'>
              <p className="text-[16px] text-left text-[#7c838a]">
                Remember your password
              </p>
              <Link to="/login" className="already-have-a-account-log-in-span5 ml-1">
                <p className="text-[16px] font-semibold already-have-a-account-log-in-span6 text-yellow-900">Login</p>
              </Link>
            </div>
          </div>
        </form>
      </div>
      {message && <p style={{ color: "green" }}>{message}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
    <Footer />
    </>
  );
};

export default ForgotPasswordForm;
