import { useMemo, useState } from "react";
import Header from "./components/Header";
import ShoppingCart from "./components/ShoppingCart";

import HomePage from "./pages/HomePage";
import ProductsPage from "./pages/ProductsPage";
import ProfilePage from "./pages/ProfilePage";
import CartPage from "./pages/CartPage";

function App() {
  const [currentPage, setCurrentPage] = useState("home");

  // Global cart state (shared)
  // item shape: { id, name, price, quantity }
  const [cartItems, setCartItems] = useState([]);

  const handleNavigate = (pageId) => {
    setCurrentPage(pageId);
  };

  const addToCart = ({ id, name, price }) => {
    setCartItems((prev) => {
      const existing = prev.find((i) => i.id === id);
      if (existing) {
        return prev.map((i) => (i.id === id ? { ...i, quantity: i.quantity + 1 } : i));
      }
      return [...prev, { id, name, price, quantity: 1 }];
    });
  };

  const incrementItem = (id) => {
    setCartItems((prev) => prev.map((i) => (i.id === id ? { ...i, quantity: i.quantity + 1 } : i)));
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

  const clearCart = () => setCartItems([]);

  const cartCount = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.quantity, 0),
    [cartItems]
  );

  const renderPage = () => {
    switch (currentPage) {
      case "products":
        return (
          <ProductsPage
            cartItems={cartItems}
            addToCart={addToCart}
            onIncrement={incrementItem}
            onDecrement={decrementItem}
            onRemove={removeItem}
          />
        );
      case "profile":
        return <ProfilePage />;
      case "cart":
        return (
          <CartPage
            cartItems={cartItems}
            onIncrement={incrementItem}
            onDecrement={decrementItem}
            onRemove={removeItem}
            onClear={clearCart}
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
