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
    const [profileImage, setProfileImage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [popup, setPopup] = useState({ show: false, product: null });

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

    // Handle user details change
    const handleChange = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
    };

    // Handle profile image
    const handleImageChange = (e) => {
      setProfileImage(e.target.files[0]);
    };

    // Handling submit
    const handleSubmit = async (e) => {
      e.preventDefault();
      setIsLoading(true); // Set loading to true
      const currentUser = user;

      if (currentUser && currentUser._id) {
          if (password && password !== confirmPassword) {
              alert('Passwords do not match.');
              setIsLoading(false);
              return;
          }
          try {
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

              await editUser(currentUser._id, formData, {
                  headers: {
                      'Content-Type': 'multipart/form-data',
                  },
              });
              setPopup({ show: true});
          } 
          catch (error) {
              console.error('Failed to update profile', error);
              alert('Failed to update profile.');
          } finally {
              setIsLoading(false);
          }
          // setPopup({ show: true});
      } else {
          console.error('User or user._id is undefined');
          alert('User data is not available.');
          setIsLoading(false);
      }
  };

    if (!user) {
        return <p>Loading or user not logged in.</p>;
    }

  const closePopup = () => {
    setPopup({ show: false, product: null });
  };


  return (
    <>
    <Helmet>
      <title>Account Details - Resin By Saidat</title>
    </Helmet>
    <div className='w-full flex flex-row justify-start border'>
      {/* Menu section */}
      <div className='w-[0%] lg:w-[20%]'>
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

            {/* Profile Image */}
            <div>
              <label className='block text-sm font-medium mb-1'>Profile Image:</label>
              <input
                type="file"
                className='w-full border p-2 rounded'
                onChange={handleImageChange}
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
            {/* Submit button */}
            <button
              type="submit"
              className='bg-yellow-900 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
              disabled={isLoading}
          >
              {isLoading ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white text-center mx-auto"></div>
              ) : (
                  'Save Changes'
              )}
          </button>
          </form>
        </div>
      </div>

      {/* Submit popup */}
      {popup.show && (
        <div className="fixed inset-0 flex items-center justify-center z-[9999] mx-auto w-full border">
            <div className="bg-yellow-900 p-6 rounded-lg shadow-lg w-[350px] md:w-[400px] lg:ml-48 text-center relative">
                <div onClick={closePopup} className="w-[10%] absolute top-3 right-3 md:top-2 md:right-0 cursor-pointer text-white hover:text-black">
                    <i className="fa-regular fa-rectangle-xmark text-[26px]"></i>
                </div>
                <h3 className="text-[24px] font-semibold text-white">Product Added!</h3>
                <p className="text-white mt-2 mb-3">Account details updated successfully.</p>
            </div>
        </div>
      )}
    </div>
    <MobileFooter />
    </>
  );
};

export default EditCurrentUser;

