import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../assets/components/context-api/user-context/UserContext';
import { Helmet } from 'react-helmet';
import MyAccountMenu from '../assets/components/account-components/MyAccountMenu';
import AccountHeader from '../assets/components/account-components/AccountHeader';

function UserManagement() {
  const { users, fetchUsers, editUser, resetUserPassword, deleteUser } = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10; // Adjust as needed

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

  const handleResetPassword = async (userId) => {
    const newPassword = prompt('Enter the new password:');
    if (newPassword) {
      try {
        await resetUserPassword(userId, newPassword);
        alert('Password reset successfully.');
      } catch (err) {
        alert('Failed to reset password.');
      }
    }
  };

  const handleToggleUserStatus = async (user) => {
    try {
      const updatedUser = { ...user, disabled: !user.disabled };
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

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <Helmet>
        <title>Account Details - Resin By Saidat</title>
      </Helmet>
      <div className="w-full flex flex-row justify-start border">
        {/* Menu section */}
        <div className="w-[0%] md:w-[20%]">
          <MyAccountMenu />
        </div>

        {/* Main Account details Section */}
        <div className="w-full flex flex-col justify-start md:items-center items-center">
          <AccountHeader />
          <div className="w-[90%] flex flex-col items-center justify-start self-center mx-auto overflow-x-auto">
            <h2 className="text-2xl font-semibold mb-4">User Management</h2>
            {currentUsers.length === 0 ? (
              <div className="p-4">No users found on this page.</div>
            ) : (
              <div className="overflow-x-auto w-full">
                <table className="w-full min-w-[800px] border-collapse">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="p-2 border text-left">First Name</th>
                      <th className="p-2 border text-left">Last Name</th>
                      <th className="p-2 border text-left">Email</th>
                      <th className="p-2 border text-left">Role</th>
                      <th className="p-2 border text-left">Status</th>
                      <th className="p-2 border text-center">Password Actions</th>
                      <th className="p-2 border text-center">Disable Actions</th>
                      <th className="p-2 border text-center">Delete Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentUsers.map((user) => (
                      <tr key={user._id} className="border-b hover:bg-gray-50">
                        <td className="p-2 border">{user.firstName}</td>
                        <td className="p-2 border">{user.lastName}</td>
                        <td className="p-2 border">{user.email}</td>
                        <td className="p-2 border">{user.role}</td>
                        <td className="p-2 border">{user.disabled ? 'Disabled' : 'Enabled'}</td>
                        <td className="p-2 border text-center">
                          <button
                            onClick={() => handleResetPassword(user._id)}
                            className="bg-blue-500 hover:bg-blue-700 text-white py-1 px-3 rounded"
                          >
                            Reset
                          </button>
                        </td>
                        <td className="p-2 border text-center">
                          <button
                            onClick={() => handleToggleUserStatus(user)}
                            className={`py-1 px-3 rounded ${
                              user.disabled ? 'bg-green-500 hover:bg-green-700 text-white' : 'bg-yellow-500 hover:bg-yellow-700 text-white'
                            }`}
                          >
                            {user.disabled ? 'Enable' : 'Disable'}
                          </button>
                        </td>
                        <td className="p-2 border text-center">
                          <button
                            onClick={() => handleDeleteUser(user._id)}
                            className="bg-red-500 hover:bg-red-700 text-white py-1 px-3 rounded"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            {/* Pagination */}
            <div className="mt-4 flex justify-center">
              {Array.from({ length: Math.ceil(users.length / usersPerPage) }, (_, i) => (
                <button
                  key={i}
                  onClick={() => paginate(i + 1)}
                  className={`mx-1 px-3 py-1 rounded ${
                    currentPage === i + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200'
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserManagement;