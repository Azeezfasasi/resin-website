import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../assets/components/context-api/user-context/UserContext';
import { Helmet } from 'react-helmet';
import MyAccountMenu from '../assets/components/account-components/MyAccountMenu';
import AccountHeader from '../assets/components/account-components/AccountHeader';

function UserManagement() {
  const { users, fetchUsers, editUser, resetUserPassword, deleteUser } = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadUsers = async () => {
      setLoading(true);
      setError(null);
      try {
        await fetchUsers();
      } catch (err) {
        setError('Failed to load users.');
      } finally {
        setLoading(false);
      }
    };

    loadUsers();
  }, [fetchUsers]);

  const handleResetPassword = async (userId, newPassword) => {
    try {
      await resetUserPassword(userId, newPassword);
      alert('Password reset successfully.');
    } catch (err) {
      alert('Failed to reset password.');
    }
  };

  const handleDeleteUser = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await deleteUser(userId);
        alert('User deleted successfully.');
      } catch (err) {
        alert('Failed to delete user.');
      }
    }
  };

  if (error) return <div>{error}</div>;

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
            <div>
                <h2>User Management</h2>
                {users.length === 0 ? (
                    <div>No users found.</div>
                ) : (
                    <table>
                    <thead>
                        <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Reset Password</th>
                        <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                        <tr key={user._id} className='border'>
                            <td className='border'>{user.firstName}</td>
                            <td className='border'>{user.lastName}</td>
                            <td className='border'>{user.email}</td>
                            <td className='border'>{user.role}</td>
                            <td className='border'>
                            <button onClick={() => handleResetPassword(user._id, 'defaultPassword')}>
                                Reset Password
                            </button>
                            </td>
                            <td className='border'>
                                <button onClick={() => handleDeleteUser(user._id)}>Delete User</button>
                            </td>
                        </tr>
                        ))}
                    </tbody>
                    </table>
                )}
            </div>
        </div>
    </div>
    </>
  );
}

export default UserManagement;