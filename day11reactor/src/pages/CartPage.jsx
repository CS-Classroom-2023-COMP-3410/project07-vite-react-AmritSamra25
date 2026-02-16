// src/pages/CartPage.jsx
import ShoppingCart from "../components/ShoppingCart";

export default function CartPage({ cartItems, onIncrement, onDecrement, onRemove }) {
  return (
    <div>
      <h2>Cart</h2>
      <ShoppingCart
        cartItems={cartItems}
        onIncrement={onIncrement}
        onDecrement={onDecrement}
        onRemove={onRemove}
        compact={false}
      />
    </div>
  );
}
