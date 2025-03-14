import React, { useState, useContext, useEffect } from 'react';
import { UserContext } from '../assets/components/context-api/user-context/UserContext'; // Adjust the path as needed
import { Helmet } from 'react-helmet';
import AccountHeader from '../assets/components/account-components/AccountHeader';
import MyAccountMenu from '../assets/components/account-components/MyAccountMenu';
import MobileFooter from '../assets/components/home-components/MobileFooter';

const EditCurrentUser = () => {
const { user, editUser } = useContext(UserContext);
    const [userData, setUserData] = useState({
        username: '',
        email: '',
        firstName: '',
        lastName: '',
    });
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    useEffect(() => {
        if (user) {
            setUserData({
                username: user.username || '',
                email: user.email || '',
                firstName: user.firstName || '',
                lastName: user.lastName || '',
            });
        }
    }, [user]);

    const handleChange = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (user && user._id) { // Added check for user and user._id
            if (password && password !== confirmPassword) {
                alert("Passwords do not match.");
                return;
            }
            try {
                const updatedData = { ...userData };
                if (password) {
                    updatedData.password = password;
                }
                await editUser(user._id, updatedData);
                alert('Profile updated successfully!');
            } catch (error) {
                console.error('Failed to update profile', error);
                alert('Failed to update profile.');
            }
        } else {
            console.error("User or user._id is undefined");
            alert("User data is not available.");
        }
    };

    if (!user) {
        return <p>Loading or user not logged in.</p>;
    }


  return (
    <>
    <Helmet>
      <title>Account Details - Resin By Saidat</title>
    </Helmet>
    <div className='w-full flex flex-row justify-start border'>
      {/* Menu section */}
      <div className='w-[0%] md:w-[20%]'>
        <MyAccountMenu />
      </div>

      {/* Main Account details Section */}
      <div className='w-full flex flex-col justify-start md:items-center items-center'>
        <AccountHeader />
        {/* Account details section */}
        <div className='w-[95%] lg:w-[55%] lg:h-[80vh] overflow-y-scroll overflow-x-hidden mb-[30px] lg:mb-0'>
          <h2 className='text-2xl font-semibold mb-6 mt-[25px] lg:mt-8'>Edit Account Details</h2>
          <form onSubmit={handleSubmit} className='w-full space-y-4 grid grid-cols-1 gap-4 lg:mb-[30px]'>

            {/* First name */}
            <div>
              <label className='block text-sm font-medium mb-1'>First Name:</label>
              <input
                type="text"
                name="firstName"
                value={userData.firstName}
                onChange={handleChange}
                className='w-full border p-2 rounded'
                autoComplete='name'
              />
            </div>

            {/* First name */}
            <div>
              <label className='block text-sm font-medium mb-1'>Last Name:</label>
              <input
                type="text"
                name="lastName"
                value={userData.lastName}
                onChange={handleChange}
                className='w-full border p-2 rounded'
                autoComplete='name'
              />
            </div>

            {/* email */}
            <div>
              <label className='block text-sm font-medium mb-1'>Email:</label>
              <input
                type="email"
                name="email"
                value={userData.email}
                onChange={handleChange}
                className='w-full border p-2 rounded'
                autoComplete='email'
              />
            </div>

            {/* Password */}
            <div>
              <label className='block text-sm font-medium mb-1'>Password:</label>
              <input
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className='w-full border p-2 rounded'
              />
            </div>

            {/* Confirm Password */}
            <div>
              <label className='block text-sm font-medium mb-1'>Confirm Password:</label>
              <input
                type="password"
                name="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className='w-full border p-2 rounded'
              />
            </div>
            {/* Add other input fields for user properties */}
            <button type="submit" className='bg-yellow-900 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'>Save Changes</button>
          </form>
        </div>
      </div>
    </div>
    <MobileFooter />
    </>
  );
};

export default EditCurrentUser;

