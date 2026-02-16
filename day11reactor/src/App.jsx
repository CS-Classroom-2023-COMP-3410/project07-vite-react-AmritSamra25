// src/App.jsx
import { useMemo, useState } from "react";
import Header from "./components/Header";
import ShoppingCart from "./components/ShoppingCart";

import HomePage from "./pages/HomePage";
import ProductsPage from "./pages/ProductsPage";
import ProfilePage from "./pages/ProfilePage";
import CartPage from "./pages/CartPage";

function App() {
  // Simple navigation state management
  const [currentPage, setCurrentPage] = useState("home");

  // LIFTED cart state (shared across pages)
  const [cartItems, setCartItems] = useState([]); 
  // expected item shape: { id, name, price, quantity }

  const handleNavigate = (pageId) => {
    setCurrentPage(pageId);
  };

  // Cart helpers
  const addToCart = (product) => {
    // product: { id, name, price }
    setCartItems((prev) => {
      const existing = prev.find((i) => i.id === product.id);
      if (existing) {
        return prev.map((i) =>
          i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const incrementItem = (id) => {
    setCartItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, quantity: i.quantity + 1 } : i))
    );
  };

  const decrementItem = (id) => {
    setCartItems((prev) =>
      prev
        .map((i) => (i.id === id ? { ...i, quantity: i.quantity - 1 } : i))
        .filter((i) => i.quantity > 0)
    );
  };

  const removeItem = (id) => {
    setCartItems((prev) => prev.filter((i) => i.id !== id));
  };

  const cartCount = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.quantity, 0),
    [cartItems]
  );

  // Render the appropriate page based on state
  const renderPage = () => {
    switch (currentPage) {
      case "products":
        return <ProductsPage addToCart={addToCart} cartItems={cartItems} />;
      case "profile":
        return <ProfilePage />;
      case "cart":
        return (
          <CartPage
            cartItems={cartItems}
            onIncrement={incrementItem}
            onDecrement={decrementItem}
            onRemove={removeItem}
          />
        );
      case "home":
      default:
        return <HomePage onNavigate={handleNavigate} />;
    }
  };

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "20px" }}>
      <Header currentPage={currentPage} onNavigate={handleNavigate} cartCount={cartCount} />

      {/* Cart summary on EVERY page only if items > 0 */}
      {cartItems.length > 0 && (
        <ShoppingCart
          cartItems={cartItems}
          onIncrement={incrementItem}
          onDecrement={decrementItem}
          onRemove={removeItem}
          compact={true}
        />
      )}

      <main>{renderPage()}</main>

      <footer
        style={{
          marginTop: "50px",
          padding: "20px",
          borderTop: "1px solid #eee",
          textAlign: "center",
          color: "#666",
        }}
      >
        <p>React Multi-Page Application</p>
      </footer>
    </div>
  );
}

export default App;
