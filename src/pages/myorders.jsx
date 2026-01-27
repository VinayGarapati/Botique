import { CheckCircle, Package, Truck } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/footer';
import Header from '../components/header';
import './myorders.css';

function Myorders() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  
  // Logic to restrict access: Check if payment was just completed or user is logged in
  const isPaymentDone = localStorage.getItem('payment_success') === 'true';

  useEffect(() => {
    if (!isPaymentDone) {
      // Redirect to home or checkout if they try to access this page without paying
      navigate('/orders');
    } else {
      // Mock data for orders - in a real app, fetch from your DB
      setOrders([
        {
          id: "ORD-99281",
          date: "Jan 27, 2026",
          status: "Processing",
          total: 480.20,
          items: [
            { name: "saree", price: 160.40, qty: 1, img: "h" },
            { name: "dress", price: 120.99, qty: 1, img: "" }
          ]
        }
      ]);
    }
  }, [isPaymentDone, navigate]);

  if (!isPaymentDone) return null;

  return (
    <div className="orders-page">
      <Header />
      <main className="orders-container">
        <div className="orders-header">
          <h1>My Orders</h1>
          <p>Track and manage your recent purchases</p>
        </div>

        <div className="orders-list">
          {orders.map((order) => (
            <div key={order.id} className="order-card">
              <div className="order-card-header">
                <div className="order-info">
                  <span className="order-id">Order {order.id}</span>
                  <span className="order-date">{order.date}</span>
                </div>
                <div className={`status-pill ${order.status.toLowerCase()}`}>
                  <Package size={14} /> {order.status}
                </div>
              </div>

              <div className="order-items">
                {order.items.map((item, idx) => (
                  <div key={idx} className="order-item-row">
                    <img src={item.img} alt={item.name} className="item-thumb" />
                    <div className="item-meta">
                      <h4>{item.name}</h4>
                      <p>Qty: {item.qty}</p>
                    </div>
                    <span className="item-price">₹{item.price.toFixed(2)}</span>
                  </div>
                ))}
              </div>

              <div className="order-footer">
                <div className="tracking-timeline">
                  <div className="step completed"><CheckCircle size={16}/> Paid</div>
                  <div className="step active"><Truck size={16}/> Processing</div>
                  <div className="step"><Package size={16}/> Delivered</div>
                </div>
                <div className="order-total">
                  <span>Total Amount</span>
                  <h3>₹{order.total.toFixed(2)}</h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Myorders;