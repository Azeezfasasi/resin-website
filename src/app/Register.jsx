import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import MainHeader from '../assets/components/home-components/MainHeader';
import TopHeader from '../assets/components/home-components/TopHeader';
import google from '../assets/images/google.svg';
import facebook from '../assets/images/fb.png';
import { Link } from 'react-router-dom';
import { UserContext } from '../assets/components/context-api/user-context/UserContext';
import loginimage from '../assets/images/loginimage.svg';
import MobileFooter from '../assets/components/home-components/MobileFooter';
import WhatsAppChatRibbon from '../assets/components/home-components/WhatsappChatRibbon';
import { ThreeDots } from 'react-loader-spinner'; // Import loader

function Register() {
  const navigate = useNavigate();
  const { registerUser } = useContext(UserContext);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // Add loading state

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    if (!formData.firstName || !formData.lastName || !formData.email || !formData.password) {
      setError("All fields are required.");
      return;
    }

    setLoading(true); // Start loading
    try {
      const response = await registerUser(formData);
      if (response.success) {
        setMessage("Registration successful! Redirecting to login...");
        setTimeout(() => navigate("/app/myaccount"), 6000);
      } else {
        setError(response.message || "Registration failed. Please try again.");
      }
    } catch (error) {
      setError("An error occurred during registration.");
    } finally {
      setLoading(false); // Stop loading regardless of success or failure
    }
  };

  return (
    <>
      <Helmet>
        <title>Register - Resin By Saidat</title>
      </Helmet>
      <TopHeader />
      <MainHeader />
      <div className="w-full bg-[rgba(230,243,255,0.75)] flex flex-row h-auto min-h-screen relative overflow-hidden p-4 md:h-[1024px] mb-[80px] lg:mb-0">
        <div className='w-[40%] hidden md:block'>
          <img className="h-auto" src={loginimage} alt="Login" />
        </div>

        <form onSubmit={handleSubmit} className="bg-[#fcfeff] rounded-[25px] w-full md:w-[60%] md:h-[1024px] p-6 flex flex-col items-center">
          <h2 className="text-[#000000] text-center font-semibold text-xl md:text-2xl mt-6 md:mt-12">
            Create an Account
          </h2>

          {message && <p className="text-green-600">{message}</p>}
          {error && <p className="text-red-600">{error}</p>}

          <div className="w-full md:w-[600px] mt-6">
            <label className="text-[#7c838a] text-sm md:text-lg">First Name</label>
            <input
              className="w-full bg-[rgba(176,186,195,0.40)] rounded-[20px] mt-2 p-3 text-base"
              type="text"
              name="firstName"
              placeholder="Enter your first name here"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="w-full md:w-[600px] mt-6">
            <label className="text-[#7c838a] text-sm md:text-lg">Last Name</label>
            <input
              className="w-full bg-[rgba(176,186,195,0.40)] rounded-[20px] mt-2 p-3 text-base"
              type="text"
              name="lastName"
              placeholder="Enter your last name here"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="w-full md:w-[600px] mt-6">
            <label className="text-[#7c838a] text-sm md:text-lg">Email</label>
            <input
              className="w-full bg-[rgba(176,186,195,0.40)] rounded-[20px] mt-2 p-3 text-base"
              type="email"
              name="email"
              placeholder="Enter your email here"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="w-full md:w-[600px] mt-6">
            <label className="text-[#7c838a] text-sm md:text-lg">Password</label>
            <input
              className="w-full bg-[rgba(176,186,195,0.40)] rounded-[20px] mt-2 p-3 text-base"
              type="password"
              name="password"
              placeholder="Enter your password here"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <button type='submit' className="w-full md:w-[340px] bg-[#f9ed32] text-[#000000] rounded-[10px] mt-8 p-3 font-medium text-lg flex justify-center items-center">
            {loading ? (
              <ThreeDots color="#000000" height={20} width={40} />
            ) : (
              'Register'
            )}
          </button>

          <div className="flex flex-row justify-start text-left font-['Poppins-Regular',_sans-serif] text-small font-normal relative mt-6">
            <p className="text-[16px] text-left text-[#7c838a]">
              Already have an account?
            </p>
            <Link to="/login" className="ml-1 text-[#f9ed32]">Login</Link>
          </div>

          {/* <p className="w-full md:w-[220px] text-center text-[#b0bac3] font-medium text-sm mt-6">- OR -</p> */}

          {/* <div className="flex flex-col md:flex-row gap-4 mt-6">
            <div className="flex items-center gap-2 border border-[#7c838a] rounded-[15px] p-3 w-full md:w-[220px]">
              <img className="w-6 h-6" src={google} alt="Google" />
              <p className="text-[#7c838a] text-sm">Sign in with Google</p>
            </div>
            <div className="flex items-center gap-2 border border-[#7c838a] rounded-[15px] p-3 w-full md:w-[220px]">
              <img className="w-6 h-6" src={facebook} alt="Facebook" />
              <p className="text-[#7c838a] text-sm">Sign in with Facebook</p>
            </div>
          </div> */}
        </form>
      </div>
      <MobileFooter />
      <WhatsAppChatRibbon />
    </>
  );
}

export default Register;