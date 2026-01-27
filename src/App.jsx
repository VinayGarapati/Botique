import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Import the Provider and Pages
import About from './pages/about';
import Cart from './pages/cart';
import { CartProvider } from './pages/CartContext';
import Checkout from './pages/checkout';
import Collections from './pages/collections';
import Home from './pages/home';
import Login from './pages/login';
import Myorders from './pages/myorders';
import Myprofile from './pages/myprofile';
import Product from './pages/product';
import Signup from './pages/signup';
import Wishlist from './pages/wishlist';

function App() {
  return (
    <CartProvider>
      <div className="app-wrapper">
        {/* ToastContainer must be here to work across all pages */}
        <ToastContainer position="bottom-right" autoClose={2000} theme="dark" />
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/login" element={<Login />} />
          <Route path="/collections" element={<Collections />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/about" element={<About />} />
          <Route path="/signup" element={<Signup/>} />
          <Route path="/profile" element={<Myprofile/>} />
          <Route path="/orders" element={<Myorders/>} />
        </Routes>
      </div>
    </CartProvider>
  );
}

export default App;