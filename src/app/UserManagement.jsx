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

  const handleToggleUserStatus = async (user) => {
    try {
        const updatedUser = {...user, disabled: !user.disabled};
        await editUser(user._id, updatedUser);
        await fetchUsers();
    } catch (err) {
        alert('Failed to toggle user status.');
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

//   if (loading) return <div className='h-screen flex flex-row justify-center items-center font-semibold text-[24px] text-yellow-900'>Loading users...</div>;
//   if (loading) return <div>Loading users...</div>;
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
                        <th>Status</th>
                        <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                        <tr key={user._id}>
                            <td>{user.firstName}</td>
                            <td>{user.lastName}</td>
                            <td>{user.email}</td>
                            <td>{user.role}</td>
                            <td>{user.disabled ? 'Disabled' : 'Enabled'}</td>
                            <td>
                            <button onClick={() => handleResetPassword(user._id, 'defaultPassword')}>
                                Reset Password
                            </button>
                            <button onClick={() => handleToggleUserStatus(user)}>
                                {user.disabled ? 'Enable' : 'Disable'}
                            </button>
                            <button onClick={() => handleDeleteUser(user._id)}>Delete</button>
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