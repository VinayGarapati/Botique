import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Header from '../components/header';
import Footer from '../components/Footer';
import { useCart } from '../pages/CartContext';
import './cart.css';

function Cart() {
  const { cartItems, removeFromCart, updateQuantity, cartTotal } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (cartItems.length > 0) {
      toast.success('Proceeding to Checkout!');
      navigate('/checkout');
    } else {
      toast.error('Your cart is empty!');
    }
  };

  return (
    <>
      <Header />
      <div className="cart-container">
        <h1 className="cart-title">Your Shopping Cart ({cartItems.length})</h1>

        {cartItems.length === 0 ? (
          <div className="empty-cart">
            <h2>Your cart is empty</h2>
            <Link to="/home" className="shop-link">Start Shopping</Link>
          </div>
        ) : (
          <div className="cart-layout">
            <div className="cart-items-list">
              {cartItems.map((item) => (
                <div className="cart-item" key={item.id}>
                  <div className="item-img-placeholder">Product {item.id}</div>
                  <div className="item-info">
                    <h3>{item.name}</h3>
                    <p>${item.price}</p>
                  </div>
                  <div className="item-controls">
                    <div className="qty-picker">
                      <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                      <span>{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                    </div>
                    <button
                      className="remove-btn"
                      onClick={() => {
                        removeFromCart(item.id);
                        toast.error('Removed from cart');
                      }}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="cart-summary">
              <h3>Order Summary</h3>
              <div className="summary-row">
                <span>Subtotal</span>
                <span>${(cartTotal || 0).toFixed(2)}</span>
              </div>
              <div className="summary-row total">
                <span>Total</span>
                <span>${(cartTotal || 0).toFixed(2)}</span>
              </div>
              <button className="checkout-btn" onClick={handleCheckout}>
                Checkout
              </button>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}

export default Cart;
