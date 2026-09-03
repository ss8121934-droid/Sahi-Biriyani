import React, { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState(() => {
    try {
      const saved = localStorage.getItem("sahi_biriyani_cart");
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [orderType, setOrderType] = useState("delivery"); // "delivery" | "takeaway"
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [lastOrderDetails, setLastOrderDetails] = useState(null);

  useEffect(() => {
    try {
      localStorage.setItem("sahi_biriyani_cart", JSON.stringify(items));
    } catch (e) {
      console.error(e);
    }
  }, [items]);

  const addToCart = (product, options = {}) => {
    const { extraAloo = false, extraEgg = false } = options;
    const itemKey = `${product.id}-${extraAloo ? "ea" : ""}-${extraEgg ? "ee" : ""}`;
    const addOnPrice = (extraAloo ? 35 : 0) + (extraEgg ? 25 : 0);
    const itemPrice = product.price + addOnPrice;

    setItems((prev) => {
      const existing = prev.find((item) => item.cartId === itemKey);
      if (existing) {
        return prev.map((item) =>
          item.cartId === itemKey ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [
        ...prev,
        {
          ...product,
          cartId: itemKey,
          quantity: 1,
          extraAloo,
          extraEgg,
          unitPrice: itemPrice,
        },
      ];
    });

    setIsCartOpen(true);
  };

  const removeFromCart = (cartId) => {
    setItems((prev) => prev.filter((item) => item.cartId !== cartId));
  };

  const updateQuantity = (cartId, delta) => {
    setItems((prev) =>
      prev
        .map((item) => {
          if (item.cartId === cartId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const totalItemsCount = items.reduce((sum, item) => sum + item.quantity, 0);

  const subtotal = items.reduce(
    (sum, item) => sum + item.unitPrice * item.quantity,
    0
  );

  const deliveryFee = orderType === "takeaway" ? 0 : subtotal > 799 ? 0 : 40;
  const gst = Math.round(subtotal * 0.05); // 5% GST
  const total = subtotal > 0 ? subtotal + deliveryFee + gst : 0;

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        orderType,
        setOrderType,
        totalItemsCount,
        subtotal,
        deliveryFee,
        gst,
        total,
        isOrderModalOpen,
        setIsOrderModalOpen,
        lastOrderDetails,
        setLastOrderDetails,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
