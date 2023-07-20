import { configureStore } from '@reduxjs/toolkit';

import cartReducer from './CartSlice'; // Import your cart slice reducer

const store = configureStore({
  reducer: {
    cart: cartReducer, // Add the cartSlice reducer here
    // Add other reducers here if needed
  },
});

export default store;
