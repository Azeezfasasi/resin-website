import React, { useState, useContext, useEffect } from 'react';
import { UserContext } from '../assets/components/context-api/user-context/UserContext';
import { Helmet } from 'react-helmet';
import AccountHeader from '../assets/components/account-components/AccountHeader';
import MyAccountMenu from '../assets/components/account-components/MyAccountMenu';
import MobileFooter from '../assets/components/home-components/MobileFooter';

const EditCurrentUser = () => {
  const { user, editUser, userLoading } = useContext(UserContext);
  const [userData, setUserData] = useState({
    email: '',
    firstName: '',
    lastName: '',
  });
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setUserData({
        email: user.email || '',
        firstName: user.firstName || '',
        lastName: user.lastName || '',
      });
      setProfileImage(user.profileImage || null);
    }
  }, [user]);

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setProfileImage(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user?._id) {
      alert('User ID is missing. Please log in again.');
      return;
    }

    if (password && password !== confirmPassword) {
      alert('Passwords do not match.');
      return;
    }

    const formData = new FormData();
    formData.append('email', userData.email);
    formData.append('firstName', userData.firstName);
    formData.append('lastName', userData.lastName);
    if (password) {
      formData.append('password', password);
    }
    if (profileImage) {
      formData.append('profileImage', profileImage);
    }

    try {
      setIsLoading(true);
      await editUser(user._id, formData, { 'Content-Type': 'multipart/form-data' });
      alert('Account details updated successfully.');
    } catch (error) {
      console.error('Update failed:', error.response?.data || error.message);
      alert('Failed to update account details.');
    } finally {
      setIsLoading(false);
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
      <div className="w-full flex flex-row justify-start border">
        <div className="w-[0%] lg:w-[20%]">
          <MyAccountMenu />
        </div>
        <div className="w-full flex flex-col justify-start md:items-center items-center">
          <AccountHeader />
          <div className="w-[95%] lg:w-[55%] lg:h-[80vh] overflow-y-scroll overflow-x-hidden mb-[30px] lg:mb-0">
            <h2 className="text-2xl font-semibold mb-6 mt-[25px] lg:mt-8">Edit Account Details</h2>
            <form onSubmit={handleSubmit} className="w-full space-y-4 grid grid-cols-1 gap-4 lg:mb-[30px]">
              <div>
                <label className="block text-sm font-medium mb-1">First Name:</label>
                <input
                  type="text"
                  name="firstName"
                  value={userData.firstName}
                  onChange={handleChange}
                  className="w-full border p-2 rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Last Name:</label>
                <input
                  type="text"
                  name="lastName"
                  value={userData.lastName}
                  onChange={handleChange}
                  className="w-full border p-2 rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Email:</label>
                <input
                  type="email"
                  name="email"
                  value={userData.email}
                  onChange={handleChange}
                  className="w-full border p-2 rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Profile Image:</label>
                <input
                  type="file"
                  accept="image/*"
                  className="w-full border p-2 rounded"
                  onChange={handleImageChange}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Password:</label>
                <input
                  type="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full border p-2 rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Confirm Password:</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full border p-2 rounded"
                />
              </div>
              <button
                type="submit"
                className="bg-yellow-900 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                disabled={isLoading}
              >
                {isLoading ? 'Saving...' : 'Save Changes'}
              </button>
            </form>
          </div>
        </div>
      </div>
      <MobileFooter />
    </>
  );
};

export default EditCurrentUser;