// src/components/ShoppingCart.jsx
export default function ShoppingCart({
    cartItems,
    onIncrement,
    onDecrement,
    onRemove,
    compact = false,
  }) {
    const totalQty = cartItems.reduce((sum, item) => sum + item.qty, 0);
    const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);
  
    return (
      <div style={styles.card}>
        <h3 style={styles.title}>
          Shopping Cart {compact ? `(${totalQty})` : ""}
        </h3>
  
        {cartItems.length === 0 ? (
          <p style={{ margin: 0 }}>Cart is empty.</p>
        ) : (
          <>
            <ul style={styles.list}>
              {cartItems.map((item) => (
                <li key={item.id} style={styles.row}>
                  <div style={{ flex: 1 }}>
                    <div style={styles.name}>{item.name}</div>
                    <div style={styles.meta}>
                      ${item.price.toFixed(2)} × {item.qty}
                    </div>
                  </div>
  
                  <div style={styles.controls}>
                    <button onClick={() => onDecrement(item.id)} style={styles.btn}>
                      −
                    </button>
                    <button onClick={() => onIncrement(item.id)} style={styles.btn}>
                      +
                    </button>
  
                    {!compact && (
                      <button
                        onClick={() => onRemove(item.id)}
                        style={{ ...styles.btn, ...styles.danger }}
                      >
                        Remove
                      </button>
                    )}
                  </div>
                </li>
              ))}
            </ul>
  
            <div style={styles.footer}>
              <strong>Total:</strong> ${totalPrice.toFixed(2)}
            </div>
          </>
        )}
      </div>
    );
  }
  
  const styles = {
    card: {
      border: "1px solid #ddd",
      borderRadius: 12,
      padding: 16,
      margin: "16px auto",
      maxWidth: 720,
      textAlign: "left",
    },
    title: { marginTop: 0, marginBottom: 12 },
    list: { listStyle: "none", padding: 0, margin: 0 },
    row: {
      display: "flex",
      alignItems: "center",
      gap: 12,
      padding: "10px 0",
      borderTop: "1px solid #eee",
    },
    name: { fontWeight: 700 },
    meta: { fontSize: 14, opacity: 0.8 },
    controls: { display: "flex", gap: 8, alignItems: "center" },
    btn: { padding: "6px 10px", borderRadius: 8, border: "1px solid #ccc", cursor: "pointer" },
    danger: { borderColor: "#f3b0b0" },
    footer: { borderTop: "1px solid #eee", paddingTop: 10, marginTop: 10 },
  };
  