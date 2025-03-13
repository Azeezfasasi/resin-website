import React, {useState} from 'react'
import { Helmet } from 'react-helmet'
import MyAccountMenu from '../assets/components/account-components/MyAccountMenu'
import AccountHeader from '../assets/components/account-components/AccountHeader'

function Settings() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
    const [darkMode, setDarkMode] = useState(false);
    const [language, setLanguage] = useState('en');

    const handleNotificationsToggle = () => {
        setNotificationsEnabled(!notificationsEnabled);
    };

    const handleDarkModeToggle = () => {
        setDarkMode(!darkMode);
    };

    const handleLanguageChange = (e) => {
        setLanguage(e.target.value);
        // Implement language change logic here (e.g., using i18n).
    };
  return (
    <>
    <Helmet>
      <title>Settings - Resin By Saidat</title>
    </Helmet>
    <div className='w-full flex flex-row justify-start border'>
      {/* Menu section */}
      <div className='w-[0%] md:w-[20%]'>
        <MyAccountMenu />
      </div>

      {/* Main Account Section */}
      <div className='w-[100%] md:w-[80%] flex flex-col items-start justify-start '>
        <AccountHeader />
        <div className="w-[95%] lg:w-[60%] self-center flex-1 flex flex-col p-4">
          <div className="container mx-auto mt-8">
              <h2 className="text-2xl font-semibold mb-6">Settings</h2>
              <div className="bg-white shadow-md rounded-md p-6 mb-8">
                <h3 className="text-lg font-semibold mb-4">Account</h3>
                  <div className="flex items-center justify-between mb-4">
                    <label htmlFor="notifications" className="block text-gray-700 text-sm font-bold">
                      Enable Notifications:
                    </label>
                    <label className="switch">
                      <input
                        type="checkbox"
                        id="notifications"
                        checked={notificationsEnabled}
                        onChange={handleNotificationsToggle}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 rounded-full peer-focus:ring-2 peer-focus:ring-blue-300 peer-focus:ring-opacity-60 peer-checked:bg-blue-600 after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full cursor-pointer"></div>
                    </label>
                  </div>

                  {/* Add more account-related settings here */}
              </div>

              <div className="bg-white shadow-md rounded-md p-6 mb-8">
                <h3 className="text-lg font-semibold mb-4">Appearance</h3>
                <div className="flex items-center justify-between mb-4">
                  <label htmlFor="dark-mode" className="block text-gray-700 text-sm font-bold">
                    Dark Mode:
                  </label>
                  <label className="switch">
                    <input
                        type="checkbox"
                        id="dark-mode"
                        checked={darkMode}
                        onChange={handleDarkModeToggle}
                        className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 rounded-full peer-focus:ring-2 peer-focus:ring-blue-300 peer-focus:ring-opacity-60 peer-checked:bg-blue-600 after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full cursor-pointer"></div>
                    </label>
                  </div>

                  <div className="mb-4">
                    <label htmlFor="language" className="block text-gray-700 text-sm font-bold mb-2">
                      Language:
                    </label>
                    <select
                        id="language"
                        value={language}
                        onChange={handleLanguageChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    >
                      <option value="en">English</option>
                      <option value="es">Spanish</option>
                      <option value="fr">French</option>
                      {/* Add more language options as needed */}
                    </select>
                  </div>

                  {/* Add more appearance settings here */}
              </div>

              {/* Add more setting sections as needed (e.g., Privacy, Security) */}
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default Settings