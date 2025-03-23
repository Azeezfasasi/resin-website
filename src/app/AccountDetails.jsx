import React, { useState, useEffect } from 'react';
import axios from 'axios';
import LoadingSpinner from '../assets/components/LoadingSpinner';
import { Helmet } from 'react-helmet';
import AccountHeader from '../assets/components/account-components/AccountHeader';
import MyAccountMenu from '../assets/components/account-components/MyAccountMenu';
import MobileFooter from '../assets/components/home-components/MobileFooter';

const EditCurrentUser = () => {
    const [userData, setUserData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
    });
    const [profileImage, setProfileImage] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
    const [password, setPassword] = useState('');

    const token = localStorage.getItem('token'); 

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get('https://resin-backend.onrender.com/api/users/me', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setUserData(response.data);
                setProfileImage(response.data.profileImage);
                setIsLoading(false);
            } catch (err) {
                setError(err.response?.data?.message || 'Failed to fetch user data.');
                setIsLoading(false);
            }
        };

        fetchUserData();
    }, [token]);

    const handleChange = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
    };

    const handleImageChange = (e) => {
        setProfileImage(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);
        setSuccessMessage(null);

        const formData = new FormData();
        formData.append('firstName', userData.firstName);
        formData.append('lastName', userData.lastName);
        formData.append('email', userData.email);

        if (password) { 
          formData.append('password', password);
        }
        if (profileImage) {
            formData.append('profileImage', profileImage);
        }

        console.log("Form Data:", formData);

        try {
            const response = await axios.put(
                `https://resin-backend.onrender.com/api/users/${userData._id}`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );
            console.log("API Response:", response);
            setSuccessMessage(response.data.message);
            // fetchUserData();
        } catch (err) {
          console.error("API Error:", err);
            setError(err.response?.data?.message || 'Failed to update user data.');
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoading) return <LoadingSpinner />;
    if (error) return <p>Error: {error}</p>;

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
              {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
              <form onSubmit={handleSubmit} className="space-y-4 grid grid-cols-1 gap-4">
                  <div>
                    <label>First Name:</label>
                    <input type="text" name="firstName" placeholder="First Name" value={userData.firstName} onChange={handleChange} className="w-full border p-2 rounded"  />
                  </div>
                  <div>
                    <label>Last Name:</label>
                    <input type="text" name="lastName" placeholder="Last Name" value={userData.lastName} onChange={handleChange} className="w-full border p-2 rounded" />
                  </div>
                  <div>
                    <label>Email:</label>
                    <input type="email" name="email" placeholder="Email" value={userData.email} onChange={handleChange} className="w-full border p-2 rounded" />
                  </div>
                  <div>
                    <label>Profile Image:</label>
                    <input type="file" onChange={handleImageChange} className="w-full border p-2 rounded" />
                    {profileImage && (
                      <div>
                          <img src={profileImage} alt="Profile" className='w-[100px] h-[100px] rounded-full' />
                      </div>
                    )}
                  </div>
                  <div>
                    <label>Password:</label>
                    <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full border p-2 rounded" />
                  </div>
                  <div>
                    <label>Confirm Password:</label>
                    <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full border p-2 rounded" />
                  </div>
                  <button type="submit" disabled={isLoading} className="bg-yellow-900 hover:bg-yellow-600 text-white py-2 px-4 rounded">
                      {isLoading ? 'Updating...' : 'Update Profile'}
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