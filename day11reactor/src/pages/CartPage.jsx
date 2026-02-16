import ShoppingCart from "../components/ShoppingCart";

function CartPage({ cartItems, onIncrement, onDecrement, onRemove, onClear }) {
  const totalPrice = cartItems.reduce((sum, i) => sum + i.price * i.quantity, 0);

  return (
    <div>
      <h1>Cart</h1>

      <ShoppingCart
        cartItems={cartItems}
        onIncrement={onIncrement}
        onDecrement={onDecrement}
        onRemove={onRemove}
        compact={false}
      />

      {cartItems.length > 0 && (
        <div style={{ display: "flex", gap: 10 }}>
          <button
            onClick={() => alert(`Checkout completed for $${totalPrice}!`)}
            style={{
              backgroundColor: "#198754",
              color: "white",
              border: "none",
              padding: "10px 14px",
              borderRadius: 8,
              cursor: "pointer",
            }}
          >
            Checkout
          </button>

          <button
            onClick={onClear}
            style={{
              backgroundColor: "#6c757d",
              color: "white",
              border: "none",
              padding: "10px 14px",
              borderRadius: 8,
              cursor: "pointer",
            }}
          >
            Clear Cart
          </button>
        </div>
      )}
    </div>
  );
}

export default CartPage;
