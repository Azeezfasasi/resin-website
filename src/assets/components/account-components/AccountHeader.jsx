import React, { useState, useContext, useEffect } from 'react';
import magnifier from '../../images/magnifier.svg';
import notification from '../../images/notification.svg';
import user1 from '../../images/user1.svg';
import profile from '../../images/profile.png';
import { UserContext } from '../context-api/user-context/UserContext';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function AccountHeader() {
    const { user, logoutUser } = useContext(UserContext);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const navigate = useNavigate();
    const [profileImageUrl, setProfileImageUrl] = useState(null);
    const token = localStorage.getItem('token');

    useEffect(() => {
        if (user && user.profileImage) {
            setProfileImageUrl(user.profileImage);
        } else {
            const fetchProfileImage = async () => {
                try {
                    const response = await axios.get('https://resin-backend.onrender.com/api/users/me', {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                    setProfileImageUrl(response.data.profileImage);
                } catch (error) {
                    console.error('Error fetching profile image:', error);
                    setProfileImageUrl(profile); // Use default profile image on error
                }
            };

            fetchProfileImage();
        }
    }, [user, token]);
    
    const toggleDropdown = () => {
      setIsDropdownOpen(!isDropdownOpen);
    };

    const handleLogout = () => {
        logoutUser();
        navigate('/');
      };
  return (
    <>
    <div className="w-full border sticky top-0 z-10">
        <div className="bg-color-white w-full h-[70px] flex flex-row items-center justify-between">
            {/* logo */}
            <div className="text-greys-blue-grey-900 text-left font-4xl-semibold-font-family text-[26px] leading-4xl-semibold-line-height font-4xl-semibold-font-weight relative hidden md:block ml-0 md:ml-[60px] lg:ml-[20px]">
            Dashboard
            </div>

            {/* Notification */}
            <div className="relative w-full md:w-[298px] h-[60px] flex flex-row items-center md:justify-start justify-end mr-6 md:mr-0">
                {/* Notification Icon */}
                <div className="mr-[20px] ml-[80px] md:ml-0 md:mr-[30px]">
                    <div className="bg-supporting-color-yellow-shade rounded-lg w-12 h-12 flex items-center justify-center">
                    <img
                        className="w-6 h-6"
                        src={notification}
                        alt="Notification Icon"
                    />
                    </div>
                </div>
                
                {/* Profile Section */}
                <div className="flex flex-row items-center justify-center cursor-pointer" onClick={toggleDropdown}>
                    <div className="relative">
                        <img
                            className="rounded-[50%] w-[40px] h-[40px] lg:w-[50px] lg:h-[50px] object-cover"
                            src={profileImageUrl || profile}
                            alt="Profile"
                        />
                    </div>
                    <div className="ml-4">
                        <div className="text-greys-blue-grey-900 text-base font-medium">
                            {user.firstName} {user.lastName}
                        </div>
                        <div className="text-greys-blue-grey-700 text-sm">   
                            {user.role}
                            
                        </div>
                    </div>
                </div>

                {/* Dropdown Menu */}
                {isDropdownOpen && (
                    <div className="absolute top-[55px] right-0 mt-2 w-[200px] bg-white rounded-lg shadow-lg">
                    <ul className="py-2">
                        <Link to="/app/accountdetails" className='flex flex-row justify-start items-center gap-2 px-4 py-2'>
                            <i className='fa fa-user'></i>
                            <li className="hover:bg-gray-100 cursor-pointer">
                            Profile
                            </li>
                        </Link>
                        <Link to="/app/trackorders" className='flex flex-row justify-start items-center gap-2 px-4 py-2'>
                            <i className='fa fa-truck'></i>
                            <li className="hover:bg-gray-100 cursor-pointer">
                            Track Order
                            </li>
                        </Link>

                        {user?.role === "Admin" && (
                        <Link to="/app/order" className='flex flex-row justify-start items-center gap-2 px-4 py-2'>
                            <i class="fa-solid fa-cart-arrow-down"></i>
                            <li className="hover:bg-gray-100 cursor-pointer">
                            Manage Orders
                            </li>
                        </Link>
                        )}

                        {user?.role === "Admin" && (
                        <Link to="/app/product" className='flex flex-row justify-start items-center gap-2 px-4 py-2'>
                            <i class="fa-solid fa-store"></i>
                            <li className="hover:bg-gray-100 cursor-pointer">
                            Manage Products
                            </li>
                        </Link>
                        )}
                        
                        <Link to="/app/settings" className='flex flex-row justify-start items-center gap-2 px-4 py-2'>
                            <i class="fa-solid fa-gear"></i>
                            <li className="hover:bg-gray-100 cursor-pointer">
                            Settings
                            </li>
                        </Link>
                        <div onClick={handleLogout} className='flex flex-row justify-start items-center gap-2 px-4 py-2'>
                            <i class="fa-solid fa-arrow-right-from-bracket"></i>
                            <li className="hover:bg-gray-100 cursor-pointer">
                            Logout
                            </li>
                        </div>
                    </ul>
                    </div>
                )}

            </div>



        </div>
    </div>

    </>
  )
}

export default AccountHeader