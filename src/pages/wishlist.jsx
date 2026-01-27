import { Link, useNavigate } from 'react-router-dom';
import Footer from '../components/footer';
import Header from '../components/header';
import { useCart } from './CartContext';
import './wishlist.css';

function Wishlist() {
  const { wishlist, toggleWishlist, addToCart } = useCart();
  const navigate = useNavigate();

  return (
    <>
      <Header />
      <div className="wishlist-container">
        <h1>My Wishlist ({wishlist.length})</h1>
        
        {wishlist.length === 0 ? (
          <div className="empty-wishlist">
            <p>Your wishlist is empty.</p>
            <Link to="/home" className="shop-now-btn">Explore Products</Link>
          </div>
        ) : (
          <div className="wishlist-grid">
            {wishlist.map((item) => (
              <div key={item.id} className="wishlist-card">
                <button className="remove-wish" onClick={() => toggleWishlist(item)}>✕</button>
                <div className="wish-img" onClick={() => navigate(`/product/${item.id}`)}>
                  Product {item.id}
                </div>
                <div className="wish-info">
                  <h3>{item.name}</h3>
                  <p>${item.price}</p>
                  <button className="move-to-cart" onClick={() => addToCart(item, 1)}>
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}
export default Wishlist;