import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  // const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]); // Store all users (admin feature)

  const [user, setUser] = useState(() => {
    // Load user from localStorage on page load
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
});

  const api = 'https://resin-backend.onrender.com/api/users'; // Update with your backend URL

  

  // Load user data from local storage on initial render
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Login User
  const loginUser = async (data) => {
  try {
      const response = await axios.post("https://resin-backend.onrender.com/api/users/login", data);

      if (response.data && response.data.token) {
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("user", JSON.stringify(response.data.user));
          setUser(response.data.user);
      }
      return response.data;
  } catch (error) {
      console.error("Login API Error:", error.response?.data || error.message);
      throw error;
  }
};

  // Logout User
  const logoutUser = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setUser(null);
  };

  // Register User
  const registerUser = async (userData) => {
    try {
      const { data } = await axios.post(`${api}/register`, userData);
      return data;
    } catch (error) {
      // console.error('Registration failed', error);
      console.error('Registration failed', error.response?.data || error.message);
      return false;
    }
  };

  // Fetch all users (Admin Feature)
  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem('token');
      const { data } = await axios.get(api, { headers: { Authorization: `Bearer ${token}` } });
      setUsers(data);
    } catch (error) {
      console.error('Failed to fetch users', error);
    }
  };

  // Edit User Details
  const editUser = async (userId, updatedData) => {
    try {
        const token = localStorage.getItem('token');
        const { data } = await axios.put(`${api}/${userId}`, updatedData, {
            headers: { Authorization: `Bearer ${token}` },
        });
        // After successful edit, fetch the updated user and update context
        const { data: updatedUser } = await axios.get(`${api}/me`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        setUser(updatedUser);
        return data;
    } catch (error) {
        console.error('Failed to edit user', error);
        throw error;
    }
};

  // Change User Role (Admin Feature)
  const changeUserRole = async (userId, newRole) => {
    try {
      const token = localStorage.getItem('token');
      const { data } = await axios.patch(
        `${api}/${userId}/role`,
        { role: newRole },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return data;
    } catch (error) {
      console.error('Failed to change user role', error);
    }
  };

  // Disable User (Admin Feature)
  const disableUser = async (userId) => {
    try {
      const token = localStorage.getItem('token');
      const { data } = await axios.patch(
        `${api}/${userId}/disable`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return data;
    } catch (error) {
      console.error('Failed to disable user', error);
    }
  };

  // Reset User Password
  const resetUserPassword = async (userId, newPassword) => {
    try {
      const token = localStorage.getItem('token');
      const { data } = await axios.patch(
        `${api}/${userId}/reset-password`,
        { newPassword },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return data;
    } catch (error) {
      console.error('Failed to reset password', error);
    }
  };

  // Delete User (Admin Feature)
  const deleteUser = async (userId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${api}/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers((prev) => prev.filter((u) => u._id !== userId));
    } catch (error) {
      console.error('Failed to delete user', error);
    }
  };

  // Add New User from Admin Dashboard
  const addNewUser = async (newUser) => {
    try {
      const token = localStorage.getItem('token');
      const { data } = await axios.post(api, newUser, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers((prev) => [...prev, data]);
      return data;
    } catch (error) {
      console.error('Failed to add new user', error);
    }
  };

  // Request Password Reset (Forgot Password)
const forgotPassword = async (email) => {
  try {
    const { data } = await axios.post(`${api}/forgot-password`, { email });
    return data; // Backend should send a success message
  } catch (error) {
    console.error('Failed to send password reset link', error);
    throw error;
  }
};

// Reset Password with Token
const resetPassword = async (token, newPassword) => {
  try {
    const { data } = await axios.post(`${api}/reset-password`, { token, newPassword });
    return data; // Backend should confirm the password has been reset
  } catch (error) {
    console.error('Failed to reset password', error);
    throw error;
  }
};


  return (
    <UserContext.Provider
      value={{
        user,
        users,
        loginUser,
        logoutUser,
        registerUser,
        fetchUsers,
        editUser,
        changeUserRole,
        disableUser,
        resetUserPassword,
        deleteUser,
        addNewUser,
        forgotPassword,
        resetPassword,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
