import { useMemo, useState } from "react";
import Card from "../components/Card";
import Button from "../components/Button";

function ProductsPage({ cartItems, addToCart, onDecrement }) {
  const initialProducts = [
    {
      id: 1,
      title: "Smartphone",
      description: "Latest model with advanced features",
      price: 699,
      stock: 15,
      imageUrl: "https://via.placeholder.com/300x150?text=Smartphone",
    },
    {
      id: 2,
      title: "Laptop",
      description: "Powerful laptop for work and gaming",
      price: 1299,
      stock: 8,
      imageUrl: "https://via.placeholder.com/300x150?text=Laptop",
    },
    {
      id: 3,
      title: "Headphones",
      description: "Noise-cancelling wireless headphones",
      price: 249,
      stock: 23,
      imageUrl: "https://via.placeholder.com/300x150?text=Headphones",
    },
    {
      id: 4,
      title: "Smartwatch",
      description: "Fitness tracking and notifications",
      price: 199,
      stock: 12,
      imageUrl: "https://via.placeholder.com/300x150?text=Smartwatch",
    },
  ];

  const [products, setProducts] = useState(initialProducts);
  const [sortBy, setSortBy] = useState("default");

  const sortedProducts = useMemo(() => {
    const arr = [...products];
    arr.sort((a, b) => {
      if (sortBy === "price-low") return a.price - b.price;
      if (sortBy === "price-high") return b.price - a.price;
      if (sortBy === "name") return a.title.localeCompare(b.title);
      return a.id - b.id;
    });
    return arr;
  }, [products, sortBy]);

  const itemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const handleAdd = (product) => {
    const p = products.find((x) => x.id === product.id);
    if (!p || p.stock <= 0) return;

    // decrement stock locally
    setProducts((prev) =>
      prev.map((x) => (x.id === product.id ? { ...x, stock: x.stock - 1 } : x))
    );

    // add to global cart
    addToCart({ id: product.id, name: product.title, price: product.price });
  };

  const handleRemoveOne = (productId) => {
    const item = cartItems.find((i) => i.id === productId);
    if (!item) return;

    // increment stock locally
    setProducts((prev) =>
      prev.map((x) => (x.id === productId ? { ...x, stock: x.stock + 1 } : x))
    );

    // decrement global cart
    onDecrement(productId);
  };

  const totalPrice = cartItems.reduce((t, i) => t + i.price * i.quantity, 0);

  return (
    <div>
      <h1>Products Page</h1>

      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }}>
        <div>
          <label htmlFor="sort-select" style={{ marginRight: "10px" }}>
            Sort by:
          </label>
          <select
            id="sort-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            style={{ padding: "5px" }}
          >
            <option value="default">Default</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="name">Name</option>
          </select>
        </div>

        <div>
          <strong>Cart ({itemCount} items)</strong>
        </div>
      </div>

      <div style={{ display: "flex", gap: "30px" }}>
        {/* Products */}
        <div style={{ flex: "1", display: "flex", flexWrap: "wrap", gap: "15px" }}>
          {sortedProducts.map((product) => (
            <Card
              key={product.id}
              title={product.title}
              description={`${product.description} - $${product.price}`}
              imageUrl={product.imageUrl}
              actions={[
                {
                  label: `Add to Cart ($${product.price})`,
                  onClick: () => handleAdd(product),
                  variant: product.stock > 0 ? "primary" : "secondary",
                  disabled: product.stock <= 0,
                },
              ]}
            >
              <p>In stock: {product.stock}</p>
            </Card>
          ))}
        </div>

        {/* Cart sidebar */}
        <div
          style={{
            width: "300px",
            padding: "15px",
            backgroundColor: "#f8f9fa",
            borderRadius: "8px",
            alignSelf: "flex-start",
          }}
        >
          <h3>Shopping Cart</h3>

          {cartItems.length === 0 ? (
            <p>Your cart is empty</p>
          ) : (
            <>
              <ul style={{ padding: 0, listStyle: "none" }}>
                {cartItems.map((item) => (
                  <li
                    key={item.id}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "8px 0",
                      borderBottom: "1px solid #ddd",
                    }}
                  >
                    <div>
                      <strong>{item.name}</strong> × {item.quantity}
                      <div>${item.price * item.quantity}</div>
                    </div>

                    <Button onClick={() => handleRemoveOne(item.id)} variant="danger">
                      −
                    </Button>
                  </li>
                ))}
              </ul>

              <div
                style={{
                  marginTop: "15px",
                  padding: "10px 0",
                  borderTop: "2px solid #ddd",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <strong>Total:</strong>
                <strong>${totalPrice}</strong>
              </div>

              <Button
                onClick={() => alert(`Checkout completed for $${totalPrice}!`)}
                variant="success"
                style={{ width: "100%", marginTop: "10px" }}
              >
                Checkout
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductsPage;
