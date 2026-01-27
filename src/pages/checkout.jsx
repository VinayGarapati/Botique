import Footer from '../components/footer';
import Header from '../components/header';
import './checkout.css';

function Checkout() {
  return (
    <>
    <Header/>
    <div className="checkout-container">
      <div className="checkout-wrapper animate-fade-in">
        {/* Left Side: Form Sections */}
        <div className="checkout-form-section">
          <h1 className="checkout-title">Checkout</h1>
          
          <div className="form-card animate-slide-up" style={{ animationDelay: '0.1s' }}>
            <h3>1. Shipping Information</h3>
            <div className="input-grid">
              <input type="text" placeholder="First Name" required />
              <input type="text" placeholder="Last Name" required />
              <input type="email" placeholder="Email Address" className="full-width" required />
              <input type="text" placeholder="Street Address" className="full-width" required />
              <input type="text" placeholder="City" required />
              <input type="text" placeholder="Postal Code" required />
            </div>
          </div>

          <div className="form-card animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <h3>2. Payment Details</h3>
            <div className="input-grid">
              <input type="text" placeholder="Card Number" className="full-width" required />
              <input type="text" placeholder="MM/YY" required />
              <input type="text" placeholder="CVV" required />
            </div>
          </div>
        </div>

        {/* Right Side: Order Summary */}
        <div className="checkout-summary-section animate-slide-left">
          <div className="summary-card">
            <h3>Your Order</h3>
            <div className="summary-item">
              <span>Subtotal</span>
              <span>$498.00</span>
            </div>
            <div className="summary-item">
              <span>Shipping</span>
              <span className="free">Free</span>
            </div>
            <div className="summary-item">
              <span>Tax</span>
              <span>$40.00</span>
            </div>
            <div className="summary-total">
              <span>Total</span>
              <span>$538.00</span>
            </div>
            <button className="pay-btn">Complete Purchase</button>
            <p className="secure-text">🔒 Encrypted and Secure Payments</p>
          </div>
        </div>
      </div>
    </div>
    <Footer/>
    </>
  );
}

export default Checkout;