import React from "react";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./app/Home";
import Shop from "./app/Shop";
import MyAccount from './app/MyAccount';
import Product from "./app/Product";
import Cart from "./app/Cart";
import Checkout from "./app/Checkout";
import Login from "./Login";
import Register from "./app/Register";
import Order from "./app/Order";
import BillingAddress from "./app/BillingAddress";
import Message from "./app/Message";
import Settings from "./app/Settings";
import TrackOders from "./app/TrackOders";
import AddProduct from "./app/AddProduct";
import ManageProducts from "./app/ManageProducts";
import AccountDetails from "./app/AccountDetails";
import EditProduct from "./app/EditProduct";
import ProductSingle from "./app/ProductSingle";
import ScrollToTop from "./assets/components/home-components/ScrollToTop";
import ProtectedRoute from "./assets/components/account-components/ProtectedRoute";
import ResinRegistrationForm from "./app/ResinRegistrationForm";
import ForgotPasswordForm from "./ForgotPasswordForm";
import ResetPasswordForm from "./ResetPasswordForm";
import TrackMyOders from "./app/TrackMyOrder";
import UserManagement from "./app/UserManagement";
import CategoryProducts from "./app/CategoryProducts";
import Wishlist from "./app/Wishlist";
import OrderSuccess from "./app/OrderSuccess";
import CustomerOrder from "./app/CustomerOrder";
import ShippingDetails from "./app/ShippingDetails";

function App() {
  return (
    <>
      <Router>
        <ScrollToTop />
        <Routes>
          {/* Un-protected Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/app/shop" element={<Shop />} />
          <Route path="/app/cart" element={<Cart />} />
          <Route path="/app/register" element={<Register />} />
          <Route path="/app/trackorders" element={<TrackOders />} />
          <Route path="/app/resinregistrationform" element={<ResinRegistrationForm />} />
          <Route path="/forgotpasswordform" element={<ForgotPasswordForm />} />
          <Route path="/resetpasswordform" element={<ResetPasswordForm />} />
          <Route path="/app/product/:id" element={<ProductSingle />} />
          <Route path="/app/trackmyorder" element={<TrackMyOders />} />
          <Route path="/app/category/:category" element={<CategoryProducts />} />
          <Route path="/app/wishlist" element={<Wishlist />} />
          <Route path="/app/checkout" element={<Checkout />} />
          <Route path="/app/ordersuccess" element={<OrderSuccess />} />

          {/*  Protected Routes */}
          <Route path="/app/myaccount" element={<ProtectedRoute><MyAccount /></ProtectedRoute>} />
          <Route path="/app/product" element={<ProtectedRoute><Product /></ProtectedRoute>} />
          <Route path="/app/order" element={<ProtectedRoute><Order /></ProtectedRoute>} />
          <Route path="/app/billingaddress" element={<ProtectedRoute><BillingAddress /></ProtectedRoute>} />
          <Route path="/app/message" element={<ProtectedRoute><Message /></ProtectedRoute>} />
          <Route path="/app/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
          <Route path="/app/addproduct" element={<ProtectedRoute><AddProduct /></ProtectedRoute>} />
          <Route path="/app/manageproduct" element={<ProtectedRoute><ManageProducts /></ProtectedRoute>} />
          <Route path="/app/accountdetails" element={<ProtectedRoute><AccountDetails /></ProtectedRoute>} />
          <Route path="/app/editproduct/:id" element={<ProtectedRoute><EditProduct /></ProtectedRoute>} />
          <Route path="/myaccount" element={<ProtectedRoute><MyAccount /></ProtectedRoute>} />
          <Route path="/app/usermanagement" element={<ProtectedRoute><UserManagement /></ProtectedRoute>} />
          <Route path="/app/wishlist" element={<ProtectedRoute><Wishlist /></ProtectedRoute>} />
          <Route path="/app/customerorder" element={<ProtectedRoute><CustomerOrder /></ProtectedRoute>} />
          <Route path="/app/shippingdetails" element={<ProtectedRoute><ShippingDetails /></ProtectedRoute>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
