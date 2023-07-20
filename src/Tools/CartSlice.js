import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cartItems: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action) {
      const { productId, quantity } = action.payload;
      const existingItemIndex = state.cartItems.findIndex(item => item.productId === productId);

      if (existingItemIndex !== -1) {
        state.cartItems[existingItemIndex].quantity += quantity;
      } else {
        state.cartItems.push({ productId, quantity });
      }
    },
    removeFromCart(state, action) {
      const { productId } = action.payload;
      state.cartItems = state.cartItems.filter(item => item.productId !== productId);
    },
    emptyCart(state) {
      state.cartItems = [];
    },
  },
});

export const { addToCart, removeFromCart, emptyCart } = cartSlice.actions;
export default cartSlice.reducer;
