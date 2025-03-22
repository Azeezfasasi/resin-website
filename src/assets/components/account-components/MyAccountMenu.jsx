import React, { useState, useEffect, useContext } from "react";
import { Helmet } from "react-helmet";
import { Link, useNavigate, NavLink } from "react-router-dom";
import heroarrow from '../../images/heroarrow.svg';
import resin from '../../images/resin.png';
import { UserContext } from "../context-api/user-context/UserContext";
import OrderStatusChart from "./OrderChart";

function MyAccountMenu() {
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const [openDropMenu, setOpenDropMenu] = useState(null);
  const { logoutUser, user } = useContext(UserContext);
  const navigate = useNavigate();


  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    logoutUser();
    navigate('/');
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMenuOpen(true);
      } else {
        setIsMenuOpen(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const toggleMenuDropdown = (menu) => {
    setOpenDropMenu(openDropMenu === menu ? null : menu);
  };

  return (
    <>
    <Helmet>
      <title>My Account - Resin By Saidat</title>
    </Helmet>
      <div className="flex items-center p-4 lg:hidden fixed top-[8px] left-[0px] z-[50] bg-transparent">
        <i className="fa fa-bars" onClick={toggleMenu}></i>
      </div>
      <div className="w-full h-screen flex border">
        <div
          className={`fixed lg:static top-[100px] md:top-0 left-0 h-full w-64 bg-white dark:bg-gray-800 border-r shadow-lg transition-transform duration-300 z-40 mt-[-30px] md:mt-0 ${
            isMenuOpen ? "translate-x-0" : "-translate-x-full"
          } lg:translate-x-0`}         
          >
          <div className="flex flex-col md:flex-row items-start p-4">
            <Link to="/"><img src={resin} alt="FIDAR Logo" className="w-16 h-15" /></Link>
            {isMenuOpen && (
              <Link to="/"
                className="ml-2 text-lg font-bold text-gray-800 dark:text-gray-100"
              >
                Resin By Saidat
              </Link>
            )}
          </div>

          {/* Admin Menu */}
          {user?.role === "Admin" && (
            <>
          <NavLink
            to="/app/myaccount"
            className={({ isActive }) =>
              `flex items-center p-4 dark:hover:bg-gray-700 ${
                isActive ? "bg-gray-200 dark:bg-gray-700" : ""
              }`
            }
          >
            <i className="fa-solid fa-chart-line"></i>
            {isMenuOpen && <span className="w-full ml-4 mr-20 text-gray-700 dark:text-gray-300">Dashboard</span>}
          </NavLink>

          <NavLink
            to="/app/order"
            className={({ isActive }) =>
              `flex items-center p-4 dark:hover:bg-gray-700 ${
                isActive ? "bg-gray-200 dark:bg-gray-700" : ""
              }`
            }
          >
            <i className="fa-solid fa-cart-arrow-down"></i>
            {isMenuOpen && <span className="ml-4 text-gray-700 dark:text-gray-300">Recived Orders</span>}
          </NavLink>

          <NavLink
            to="/app/trackorders"
            className={({ isActive }) =>
              `flex items-center p-4 dark:hover:bg-gray-700 ${
                isActive ? "bg-gray-200 dark:bg-gray-700" : ""
              }`
            }
          >
            <i className='fa fa-truck'></i>
            {isMenuOpen && <span className="ml-4 text-gray-700 dark:text-gray-300">Track your Orders</span>}
          </NavLink>

          
          <NavLink
            to="/app/product"
            className={({ isActive }) =>
              `flex items-center p-4 dark:hover:bg-gray-700 ${
                isActive ? "bg-gray-200 dark:bg-gray-700" : ""
              }`
            }
          >
            <i className="fa-solid fa-store"></i>
            {isMenuOpen && <span className="ml-4 text-gray-700 dark:text-gray-300">Products</span>}
          </NavLink>

          <NavLink
            to="/app/addproduct"
            className={({ isActive }) =>
              `flex items-center p-4 dark:hover:bg-gray-700 ${
                isActive ? "bg-gray-200 dark:bg-gray-700" : ""
              }`
            }
          >
            <i className="fa-solid fa-shop"></i>
            {isMenuOpen && <span className="ml-4 text-gray-700 dark:text-gray-300">Add Products</span>}
          </NavLink>

          <NavLink
            to="/app/usermanagement"
            className={({ isActive }) =>
              `flex items-center p-4 dark:hover:bg-gray-700 ${
                isActive ? "bg-gray-200 dark:bg-gray-700" : ""
              }`
            }
          >
            <i className="fa-solid fa-users"></i>
            {isMenuOpen && <span className="ml-4 text-gray-700 dark:text-gray-300">Manage Users</span>}
          </NavLink>

          <NavLink
            to="/app/accountdetails"
            className={({ isActive }) =>
              `flex items-center p-4 dark:hover:bg-gray-700 ${
                isActive ? "bg-gray-200 dark:bg-gray-700" : ""
              }`
            }
          >
            <i className="fa-solid fa-user"></i>
            {isMenuOpen && <span className="ml-4 text-gray-700 dark:text-gray-300">Account Details</span>}
          </NavLink>

          <NavLink onClick={handleLogout}
            to="/"
            className={({ isActive }) =>
              `flex items-center p-4 dark:hover:bg-gray-700 ${
                isActive ? "bg-gray-200 dark:bg-gray-700" : ""
              }`
            }
          >
            <i className="fa-solid fa-arrow-right-from-bracket"></i>
            {isMenuOpen && <span className="ml-4 text-gray-700 dark:text-gray-300">Log Out</span>}
          </NavLink>
          </>
          )}


          {/* Customers menu */}
          {user?.role === "Customer" && (
            <>
          <NavLink
            to="/app/myaccount"
            className={({ isActive }) =>
              `flex items-center p-4 dark:hover:bg-gray-700 ${
                isActive ? "bg-gray-200 dark:bg-gray-700" : ""
              }`
            }
          >
            <i className="fa-solid fa-chart-line"></i>
            {isMenuOpen && <span className="w-full ml-4 mr-20 text-gray-700 dark:text-gray-300">Dashboard</span>}
          </NavLink>

          <NavLink
            to="/app/CustomerOrder"
            className={({ isActive }) =>
              `flex items-center p-4 dark:hover:bg-gray-700 ${
                isActive ? "bg-gray-200 dark:bg-gray-700" : ""
              }`
            }
          >
            <i className="fa-solid fa-cart-arrow-down"></i>
            {isMenuOpen && <span className="ml-4 text-gray-700 dark:text-gray-300">My Orders</span>}
          </NavLink>

          <NavLink
            to="/app/trackorders"
            className={({ isActive }) =>
              `flex items-center p-4 dark:hover:bg-gray-700 ${
                isActive ? "bg-gray-200 dark:bg-gray-700" : ""
              }`
            }
          >
            <i className='fa fa-truck'></i>
            {isMenuOpen && <span className="ml-4 text-gray-700 dark:text-gray-300">Track your Orders</span>}
          </NavLink>

          <NavLink
            to=""
            className={({ isActive }) =>
              `flex items-center p-4 dark:hover:bg-gray-700 ${
                isActive ? "bg-gray-200 dark:bg-gray-700" : ""
              }`
            }
          >
            <i className="fa-solid fa-cart-arrow-down"></i>
            {isMenuOpen && <span className="ml-4 text-gray-700 dark:text-gray-300">Shipping Address</span>}
          </NavLink>

          <NavLink
            to="/app/accountdetails"
            className={({ isActive }) =>
              `flex items-center p-4 dark:hover:bg-gray-700 ${
                isActive ? "bg-gray-200 dark:bg-gray-700" : ""
              }`
            }
          >
            <i className="fa-solid fa-user"></i>
            {isMenuOpen && <span className="ml-4 text-gray-700 dark:text-gray-300">Account Details</span>}
          </NavLink>

          <NavLink
            to="/app/settings"
            className={({ isActive }) =>
              `flex items-center p-4 dark:hover:bg-gray-700 ${
                isActive ? "bg-gray-200 dark:bg-gray-700" : ""
              }`
            }
          >
            <i className="fa-solid fa-cart-arrow-down"></i>
            {isMenuOpen && <span className="ml-4 text-gray-700 dark:text-gray-300">Settings</span>}
          </NavLink>

          <NavLink onClick={handleLogout}
            to="/"
            className={({ isActive }) =>
              `flex items-center p-4 dark:hover:bg-gray-700 ${
                isActive ? "bg-gray-200 dark:bg-gray-700" : ""
              }`
            }
          >
            <i className="fa-solid fa-arrow-right-from-bracket"></i>
            {isMenuOpen && <span className="ml-4 text-gray-700 dark:text-gray-300">Log Out</span>}
          </NavLink>
          </>
          )}
        
        </div>
      </div>
    </>
  );
}

export default MyAccountMenu;
