import { useNavigate } from 'react-router-dom';
import './hero.css';

function Hero() {
  const navigate = useNavigate();
  const dummyProducts = [1, 2, 3, 4, 5, 6];

  const goToCollections = () => navigate('/collections');
  
  const goToCart = (e) => {
    e.stopPropagation(); // Prevents flipping or product navigation
    navigate('/cart');
  };

  // Navigates to the specific product page
  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  const renderFlipCard = (p, index, customClass = "") => (
    <div 
      key={index} 
      className={`flip-card ${customClass}`}
      onClick={() => handleProductClick(p)} // Click handler for the whole card
    >
      <div className="flip-card-inner">
        {/* Front Side */}
        <div className="flip-card-front">
          <div className="product-badge">New</div>
          <h3>Product {p}</h3>
          <p className="tag">View Details</p>
        </div>
        
        {/* Back Side */}
        <div className="flip-card-back">
          <div className="back-header">
            <h3>Quick View</h3>
            <p className="description">
              High-quality material with a comfortable, athletic fit.
            </p>
          </div>
          <div className="button-wrapper">
            <button className="buy-now-btn" onClick={goToCart}>
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="hero-container">
      <section className="hero-banner">
        <div className="banner-content">
          <h1>Upgrade Your Style</h1>
          <p>Discover the latest trends with our exclusive collection.</p>
          <button className="shop-now" onClick={goToCollections}>Shop Now</button>
        </div>
      </section>

      <section className="product-section">
        <h2>High Demand 🔥</h2>
        <div className="product-grid">
          {dummyProducts.slice(0, 4).map((p, i) => renderFlipCard(p, i, "hot"))}
        </div>
      </section>

      <section className="product-section">
        <h2>Recommended for You</h2>
        <div className="product-grid">
          {dummyProducts.map((p, i) => renderFlipCard(p, i))}
        </div>
      </section>

      <section className="infinite-section">
        <h2>Our Full Collection</h2>
        <div className="carousel-wrapper">
          <div className="carousel-track">
            {[...dummyProducts, ...dummyProducts].map((p, index) => 
              renderFlipCard(p, index, "carousel-item")
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Hero;