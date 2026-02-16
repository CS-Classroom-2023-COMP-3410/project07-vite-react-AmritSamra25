function ShoppingCart({ cartItems, onIncrement, onDecrement, onRemove, compact = false }) {
    const totalItems = cartItems.reduce((sum, i) => sum + i.quantity, 0);
    const totalPrice = cartItems.reduce((sum, i) => sum + i.price * i.quantity, 0);
  
    return (
      <div
        style={{
          border: "1px solid #ddd",
          borderRadius: "10px",
          padding: "15px",
          backgroundColor: "#f8f9fa",
          marginBottom: "20px",
        }}
      >
        <h3 style={{ marginTop: 0 }}>
          Shopping Cart {compact ? `(${totalItems} items)` : ""}
        </h3>
  
        {cartItems.length === 0 ? (
          <p style={{ margin: 0 }}>Cart is empty.</p>
        ) : (
          <>
            <ul style={{ padding: 0, listStyle: "none", margin: 0 }}>
              {cartItems.map((item) => (
                <li
                  key={item.id}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "10px 0",
                    borderBottom: "1px solid #ddd",
                    gap: "10px",
                  }}
                >
                  <div style={{ flex: 1 }}>
                    <strong>{item.name}</strong> × {item.quantity}
                    <div>${item.price * item.quantity}</div>
                  </div>
  
                  <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                    <button
                      onClick={() => onDecrement(item.id)}
                      style={btnStyle("#dc3545")}
                      aria-label={`Decrease ${item.name}`}
                    >
                      −
                    </button>
  
                    {!compact && (
                      <>
                        <button
                          onClick={() => onIncrement(item.id)}
                          style={btnStyle("#0d6efd")}
                          aria-label={`Increase ${item.name}`}
                        >
                          +
                        </button>
  
                        <button
                          onClick={() => onRemove(item.id)}
                          style={btnStyle("#6c757d")}
                          aria-label={`Remove ${item.name}`}
                        >
                          Remove
                        </button>
                      </>
                    )}
                  </div>
                </li>
              ))}
            </ul>
  
            <div
              style={{
                marginTop: "15px",
                paddingTop: "10px",
                borderTop: "2px solid #ddd",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <strong>Total:</strong>
              <strong>${totalPrice}</strong>
            </div>
          </>
        )}
      </div>
    );
  }
  
  function btnStyle(bg) {
    return {
      backgroundColor: bg,
      color: "white",
      border: "none",
      padding: "8px 12px",
      borderRadius: "6px",
      cursor: "pointer",
    };
  }
  
  export default ShoppingCart;
  