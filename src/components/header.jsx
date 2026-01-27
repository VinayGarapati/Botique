import { AnimatePresence, motion } from 'framer-motion';
import {
  ChevronDown,
  Heart,
  LogOut,
  Menu,
  Package,
  Search,
  Settings,
  ShoppingCart,
  X
} from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useCart } from '../pages/CartContext';
import { useUser } from '../pages/UserContext';
import "./header.css";

const PRODUCTS = [
  { id: 1, name: "Kurthi", price: "₹299" },
  { id: 2, name: "Jeans", price: "₹199" },
  { id: 3, name: "Lehanga", price: "₹349" },
  { id: 4, name: "Saree", price: "₹249" },
];

function Header() {
  const { cartItems } = useCart();
  const context = useUser();
  
  const user = context?.user || { name: "Guest", profilePic: "" };
  const logout = context?.logout || (() => {});

  const location = useLocation();
  const navigate = useNavigate();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [query, setQuery] = useState("");
  const searchRef = useRef(null);

  const cartCount = cartItems?.length > 0 
    ? cartItems.reduce((total, item) => total + (item.quantity || 0), 0) 
    : 0;

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="nav-container">
        
        <div className="nav-left">
          {/* Mobile Menu Toggle Button */}
          <button className="mobile-btn" onClick={() => setIsMobileMenuOpen(true)}>
            <Menu size={24} />
          </button>
          <Link to="/home" className="logo">
            FOOD<span>IE</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <ul className="nav-links desktop-only">
          {['Home', 'About', 'Collections', 'Offers'].map((item) => (
            <li key={item}>
              <Link to={`/${item.toLowerCase()}`} className={location.pathname === `/${item.toLowerCase()}` ? 'active' : ''}>
                {item}
              </Link>
            </li>
          ))}
        </ul>

        <div className="nav-right">
          <div className="search-container desktop-only" ref={searchRef}>
            <div className="search-bar">
              <Search size={16} className="search-icon" />
              <input 
                type="text" 
                placeholder="Search" 
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="action-group">
            <Link to="/cart" className="icon-btn">
              <ShoppingCart size={22} />
              {cartCount > 0 && <span className="badge">{cartCount}</span>}
            </Link>

            <div 
              className="profile-wrapper desktop-only" 
              onMouseEnter={() => setIsProfileOpen(true)} 
              onMouseLeave={() => setIsProfileOpen(false)}
            >
              <button className="icon-btn profile-trigger">
                <div className="avatar-container">
                  {user.profilePic ? (
                    <img src={user.profilePic} alt="Profile" className="header-avatar" />
                  ) : (
                    <div className="default-avatar">{user.name.charAt(0)}</div>
                  )}
                </div>
                <div className="user-welcome-info">
                   <small>Hi, Welcome</small>
                   <p>{user.name.split(' ')[0]}</p>
                </div>
                <ChevronDown size={14} className={`chevron ${isProfileOpen ? 'rotate' : ''}`} />
              </button>
              
              <AnimatePresence>
                {isProfileOpen && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="profile-dropdown"
                  >
                    <Link to="/profile"><Package size={16}/> Profile</Link>
                    <Link to="/orders"><Package size={16}/> Orders</Link>
                    <Link to="/wishlist"><Heart size={16}/> Wishlist</Link>
                    <Link to="/settings"><Settings size={16}/> Settings</Link>
                    <hr />
                    <button className="logout-btn" onClick={handleLogout}>
                      <LogOut size={16}/> Logout
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      {/* MOBILE SIDEBAR & OVERLAY */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Background Dimmer */}
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              className="overlay" 
              onClick={() => setIsMobileMenuOpen(false)} 
            />
            {/* Slide-in Menu */}
            <motion.div 
              initial={{ x: '-100%' }} 
              animate={{ x: 0 }} 
              exit={{ x: '-100%' }} 
              transition={{ type: 'tween', duration: 0.3 }} 
              className="sidebar"
            >
              <div className="sidebar-top">
                <span className="logo">FOOD<span>IE</span></span>
                <button className="close-btn" onClick={() => setIsMobileMenuOpen(false)}>
                  <X size={24}/>
                </button>
              </div>

              <div className="sidebar-user-section">
                <div className="avatar-container large">
                   {user.profilePic ? (
                     <img src={user.profilePic} alt="User" className="header-avatar" />
                   ) : (
                     <div className="default-avatar">{user.name.charAt(0)}</div>
                   )}
                </div>
                <div className="sidebar-user-info">
                  <p className="sidebar-username">{user.name}</p>
                  <small className="sidebar-email">{user.email}</small>
                </div>
              </div>

              <div className="sidebar-links">
                {['Home', 'About', 'Collections', 'Offers'].map((item) => (
                  <Link 
                    key={item} 
                    to={`/${item.toLowerCase()}`} 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={location.pathname === `/${item.toLowerCase()}` ? 'sidebar-active' : ''}
                  >
                    {item}
                  </Link>
                ))}
                <hr />
                <Link to="/profile" onClick={() => setIsMobileMenuOpen(false)}><Package size={18}/> Profile</Link>
                <Link to="/orders" onClick={() => setIsMobileMenuOpen(false)}><Package size={18}/> My Orders</Link>
                <button className="sidebar-logout" onClick={handleLogout}>
                  <LogOut size={18}/> Logout
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
}

export default Header;