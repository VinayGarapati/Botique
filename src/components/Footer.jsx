import './footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-brand">
          <img src="/logo.png" alt="Logo" className="footer-logo" />
          <p>
            Your one-stop shop for high-quality products. Style and comfort delivered to your door.
          </p>
          <div className="social-links">
            <span>f</span>
            <span>◎</span>
            <span>x</span>
          </div>
        </div>

        <div className="footer-links">
          <div className="link-group">
            <h3>Shop</h3>
            <ul>
              <li><a href="#new">New Arrivals</a></li>
              <li><a href="#best">Best Sellers</a></li>
              <li><a href="#offers">Offers</a></li>
            </ul>
          </div>

          <div className="link-group">
            <h3>Support</h3>
            <ul>
              <li><a href="#track">Track Order</a></li>
              <li><a href="#returns">Returns</a></li>
              <li><a href="#faq">FAQs</a></li>
            </ul>
          </div>

          <div className="link-group">
            <h3>Company</h3>
            <ul>
              <li><a href="#about">About Us</a></li>
              <li><a href="#careers">Careers</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2025 YourBrand. All rights reserved.</p>
        <div className="payment-methods">
          <span>Visa</span>
          <span>Mastercard</span>
          <span>PayPal</span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
