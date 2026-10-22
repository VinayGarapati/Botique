import { Heart, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/header';
import { useCart } from './CartContext';
import './collections.css';

const PRODUCTS = [
  { id: 1, name: 'Sarees', price: 160.4, stock: 544, sold: 256, img: 'https://p1-ofp.static.pub/ShareResource/na/products/accessories/conf/smart-watch/apple/apple-watch-s10/apple-watch-s10-01.png' },
  { id: 2, name: 'Dresses', price: 120.99, stock: 544, sold: 256, img: 'https://m.media-amazon.com/images/I/61+9C5U+jPL.jpg' },
  { id: 3, name: 'Tops', price: 120.3, stock: 544, sold: 256, img: 'https://via.placeholder.com/150' },
  { id: 4, name: 'Westren', price: 110.2, stock: 544, sold: 256, img: 'https://via.placeholder.com/150' },
];

function Collections() {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const toggleWishlist = (e, product) => {
    e.stopPropagation();
    console.log('Added to Wishlist:', product.name);
  };

  const handleBuyNow = (e, product) => {
    e.stopPropagation();
    if (addToCart) {
      addToCart(product, 1);
    }
    navigate('/cart');
  };

  return (
    <div className="collections-page">
      <Header />

      <main className="collections-layout">
        <aside className="collection-sidebar desktop-only">
          <p className="sidebar-label">WORKSPACE</p>
          <nav>
            <div className="nav-item">Products</div>
            <div className="nav-item">Bundle</div>
            <div className="nav-item active">Collections</div>
          </nav>
        </aside>

        <section className="collection-content">
          <div className="content-top-bar">
            <h1>Products</h1>
            <div className="top-actions">
              <div className="search-pill">
                <Search size={16} />
                <input type="text" placeholder="Search product..." />
              </div>
            </div>
          </div>

          <div className="category-scroll">
            {['All Products', 'Women', 'Men', 'Kids', 'New Arrivals', 'Sports'].map((cat, i) => (
              <button key={cat} className={`cat-pill ${i === 0 ? 'active' : ''}`}>
                {cat}
              </button>
            ))}
          </div>

          <div className="product-grid">
            {PRODUCTS.map((item) => (
              <div key={item.id} className="prod-card" onClick={() => navigate(`/product/${item.id}`)}>
                <div className="prod-img-wrap">
                  <button className="wish-heart" onClick={(e) => toggleWishlist(e, item)}>
                    <Heart size={20} />
                  </button>
                  <img src={item.img} alt={item.name} />
                </div>

                <div className="prod-details">
                  <h3>{item.name}</h3>
                  <p className="prod-price">${item.price ? item.price.toFixed(2) : '0.00'}</p>
                  <div className="prod-stats">
                    <span>
                      Stock: <b>{item.stock}</b>
                    </span>
                    <span>
                      Sold: <b>{item.sold}</b>
                    </span>
                  </div>
                  <button className="buy-btn" onClick={(e) => handleBuyNow(e, item)}>
                    Buy Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default Collections;
