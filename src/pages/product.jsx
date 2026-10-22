import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Footer from '../components/Footer';
import Header from '../components/header';
import { useCart } from './CartContext';
import './product.css';

function Product() {
  const { id } = useParams();
  const { addToCart, wishlist, toggleWishlist } = useCart();
  const [quantity, setQuantity] = useState(1);

  const product = { id, name: `Premium Item ${id}`, price: 299 };
  const isInWishlist = wishlist?.some((item) => item.id === id);

  return (
    <>
      <Header />
      <div className="product-page">
        <div className="main-layout">
          <div className="image-box">Product {id} Image</div>
          <div className="info-box">
            <div className="title-bar">
              <h1>{product.name}</h1>
              <button
                className="wish-btn"
                onClick={() => {
                  toggleWishlist(product);
                  toast.info(isInWishlist ? 'Removed from Wishlist' : 'Added to Wishlist', {
                    icon: '❤️',
                  });
                }}
              >
                {isInWishlist ? '❤️' : '🤍'}
              </button>
            </div>

            <p className="product-price">${product.price}</p>

            <div className="quantity-controls">
              <p>Quantity:</p>
              <div className="qty-selector">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
                <span>{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)}>+</button>
              </div>
            </div>

            <button
              className="add-to-cart-main"
              onClick={() => {
                addToCart(product, quantity);
                toast.success(`Added ${quantity} item(s) to Cart!`);
              }}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Product;
