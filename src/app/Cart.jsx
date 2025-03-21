import React, { useState, useContext } from 'react';
import { ProductContext } from '../assets/components/context-api/product-context/ProductContext';
import { UserContext } from '../assets/components/context-api/user-context/UserContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../assets/components/context-api/product-context/CartContext'; // Import useCart
import MainHeader from '../assets/components/home-components/MainHeader';
import TopHeader from '../assets/components/home-components/TopHeader';
import Login from '../Login';
import Footer from '../assets/components/home-components/Footer';

const Cart = () => {
    const { products } = useContext(ProductContext);
    const { user } = useContext(UserContext);
    const navigate = useNavigate();
    const { cart, removeFromCart, updateQuantity } = useCart();

    const [step, setStep] = useState(1);
    const [shippingAddress, setShippingAddress] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('');
    const [orderSuccess, setOrderSuccess] = useState(false);
    const [orderError, setOrderError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [country, setCountry] = useState('Nigeria'); // Default value
    const [streetAddress, setStreetAddress] = useState('');
    const [townCity, setTownCity] = useState('');
    const [state, setState] = useState('Lagos'); // Default value
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');

    const calculateTotal = () => {
      return cart.reduce((total, item) => {
          const quantity = parseInt(item.quantity, 10);
          if (isNaN(quantity) || quantity < 0) { // Check for invalid quantities
              return total;
          }
          return total + item.price * quantity;
      }, 0);
  };

  const total = calculateTotal();

  const handleQuantityChange = (itemId, value) => {
    const parsedValue = parseInt(value, 10);
    if (isNaN(parsedValue) || parsedValue < 0) {
        // Prevent invalid input, set to 1 if invalid
        updateQuantity(itemId, 1);
    } else {
        updateQuantity(itemId, parsedValue);
    }
};

    const handleNext = () => {
        if (step === 1) {
            if (user) {
                setStep(3);
            } else {
                setStep(2);
            }
        } else {
            setStep(step + 1);
        }
    };

    const handlePrevious = () => {
        setStep(step - 1);
    };

    const handlePlaceOrder = async () => {
        setLoading(true);
        setOrderError(null);
        try {
            if (!user) {
                throw new Error("User not logged in");
            }

            const orderData = {
              userId: user.id,
              items: cart.map(item => ({
                  productId: item._id,
                  quantity: item.quantity,
                  price: item.price,
                  name: item.name,
              })),
              shippingAddress: shippingAddress,
              paymentMethod: paymentMethod,
              total: calculateTotal(),
              orderDate: new Date().toISOString(),
              firstName: firstName,
              lastName: lastName,
              country: country,
              streetAddress: streetAddress,
              townCity: townCity,
              state: state,
              phone: phone,
              email: email,
            };
            console.log("Order Data being sent:", orderData);

            const response = await axios.post("https://resin-backend.onrender.com/api/orders", orderData);
            if (response.status === 201) {
                setOrderSuccess(true);
                console.log("Order number from backend:", response.data.orderNumber);
                navigate('/app/ordersuccess', { state: { orderNumber: response.data.orderNumber } });
            } else {
                throw new Error("Failed to place order");
            }
        } catch (error) {
            console.error("Order placement error:", error);
            setOrderError(error.message || "An error occurred while placing your order.");
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (orderSuccess) {
        return <div>Order placed successfully! Thank you for your purchase.</div>;
    }

    if (orderError) {
        return <div>Error placing order: {orderError}</div>;
    }

    return (
        <div className="container mx-auto mt-0">
            {step === 1 && (
              <>
              <TopHeader />
              <MainHeader />
                <div className='w-[100%] lg:w-[70%] flex flex-col items-center justify-start mx-auto mt-[20px] lg:mt-[30px] mb-[80px]'>
                    <h2 className="text-2xl text-center font-bold mb-4 w-full">Cart Review</h2>
                    {cart.length === 0 ? (
                          <p className="text-center">Your cart is empty.</p>
                        ) : (
                            <div className="w-[90%] lg:w-[60%] flex flex-col items-start justify-start">
                                {cart.map((item) => (
                                    <div key={item._id} className="w-full border rounded shadow-sm p-4 mb-2 flex">
                                        <img
                                            src={Array.isArray(item.images) ? item.images[0] : item.images}
                                            alt={item.name}
                                            className="w-20 h-20 object-cover inline-block mr-4"
                                        />
                                        <div className="w-full inline-block">
                                            <h3 className="font-semibold">{item.name}</h3>
                                            <p>Price: ₦{item.price}</p>
                                            <input
                                                type="number"
                                                value={item.quantity}
                                                onChange={(e) => handleQuantityChange(item._id, e.target.value)} 
                                                className="w-[20%] border p-1 mr-2"
                                                defaultValue={1}
                                            />
                                            <button onClick={() => removeFromCart(item._id)} className="bg-red-500 text-white p-1 rounded ml-[100px] lg:ml-[180px]">
                                                Remove
                                            </button>
                                        </div>
                                    </div>
                                ))}
                                <p className="font-semibold">Total: ₦{total}</p>
                                <button onClick={handleNext} className="bg-yellow-900 text-white py-2 px-6 mt-4 rounded">
                                    Checkout
                                </button>
                            </div>
                        )}
                </div>
                <Footer />
                </>
            )}

            {step === 2 && (
                <div>
                    <h2 className="text-2xl font-bold mb-4">Login or Register to Continue</h2>
                    <p>Please log in or register to complete your purchase.</p>
                    <Login />
                    <button onClick={() => {
                        // Redirect to login/register page or show a modal
                        // Example: navigate('/login');
                        setStep(3)
                    }} className="bg-blue-500 text-white p-2 mt-4 rounded">Continue as Guest (Skip Login)</button>
                </div>
            )}

            {step === 3 && (
              <>
              <TopHeader />
              <MainHeader />
                <div className="w-[90%] grid grid-cols-1 md:grid-cols-2 gap-8 mx-auto mt-[30px] mb-[60px]">
                    {/* Billing Details Column */}
                    <div>
                        <h2 className="text-2xl font-bold mb-4">Billing Details</h2>

                        {/* first name */}
                        <label className='font-semibold'>First Name</label>
                        <input
                          type="text"
                          placeholder="First name *"
                          className="border p-2 mb-2 w-full"
                          value={firstName}
                          onChange={(e) => {setFirstName(e.target.value);}}
                          required
                        />

                        {/* last name */}
                        <label className='font-semibold'>Last Name</label>
                        <input type="text" placeholder="Last name *" className="border p-2 mb-2 w-full" 
                        value={lastName}
                        onChange={(e) => {setLastName(e.target.value);}}
                        required
                        />

                        {/* country */}
                        <label className='font-semibold'>Country</label>
                        <select className="border p-2 mb-2 w-full"
                             value={country}
                             onChange={(e) => {setCountry(e.target.value);}}
                            >
                            <option value="">Select</option>
                            <option value="Nigeria">Nigeria</option>
                        </select>

                        {/* Street address */}
                        <label className='font-semibold'>Street Address</label>
                        <input type="text" placeholder="Street address" className="border p-2 mb-2 w-full" 
                        value={streetAddress}
                        onChange={(e) => {setStreetAddress(e.target.value);}}
                        required
                        />

                        {/* Town/city */}
                        <label className='font-semibold'>Town/City</label>
                        <input type="text" placeholder="Town / City" className="border p-2 mb-2 w-full" 
                        value={townCity}
                        onChange={(e) => setTownCity(e.target.value)}
                        required
                        />

                        {/* state */}
                        <label className='font-semibold'>State</label>
                        <select className="border p-2 mb-2 w-full" value={state} onChange={(e) => setState(e.target.value)}>
                            <option value="">Select State</option>
                            <option value="Lagos">Lagos</option>
                            <option value="Abuja">Abuja</option>
                        </select>

                        {/* phone number */}
                        <label className='font-semibold'>Phone Number</label>
                        <input type="text" placeholder="Phone" className="border p-2 mb-2 w-full" 
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                        />

                        {/* email */}
                        <label className='font-semibold'>Email</label>
                        <input type="email" placeholder="Email address" className="border p-2 mb-2 w-full" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        />
                        
                        {/* PAYMENT METHOD */}
                        <label className='font-semibold'>Preferred Payment Method</label>
                        <select className="border p-2 mb-2 w-full" value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
                            <option value="">Select</option>
                            <option value="Bank Transfer">Bank Transfer</option>
                            <option value="Payment On Delivery">Payment On Delivery</option>
                        </select>
                    </div>

                    {/* Order Summary Column */}
                    <div className="border p-4">
                        <h2 className="text-xl font-bold mb-4">Your Order</h2>
                        <table className="w-full">
                            <thead>
                                <tr>
                                    <th className="text-left">Product</th>
                                    <th className="text-right">Subtotal</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cart.map((item) => (
                                    <tr key={item._id}>
                                        <td className="py-2">{item.name} x {item.quantity}</td>
                                        <td className="py-2 text-right">₦{item.price * item.quantity}</td>
                                    </tr>
                                ))}
                                <tr>
                                    <td className="py-2 font-semibold">Subtotal</td>
                                    <td className="py-2 text-right">₦{total}</td>
                                </tr>
                                <tr>
                                    <td className="py-2 font-semibold">Total</td>
                                    <td className="py-2 text-right">₦{total}</td>
                                </tr>
                            </tbody>
                        </table>
                        <div className="mt-4">
                            <p className="font-semibold">Direct bank transfer</p>
                            <p className="text-sm">
                                Make your payment directly into our bank account. Please use your Order ID as the payment reference.
                                Your order will not be shipped until the funds have cleared in our account.
                            </p>
                        </div>
                        <button onClick={handlePlaceOrder} className="bg-yellow-900 text-white p-2 mt-4 rounded w-full">
                            Place Order
                        </button>
                        <p className="text-xs mt-2">
                            Your personal data will be used to process your order, support your experience throughout this website, and for
                            other purposes described in our privacy policy.
                        </p>
                    </div>
                </div>
                <Footer />
              </>
            )}
        </div>
    );
};

export default Cart;