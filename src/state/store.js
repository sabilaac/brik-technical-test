import { configureStore } from '@reduxjs/toolkit';
import { productSlice } from './productSlice';

export const store = configureStore({
    reducer: {
        product: productSlice.reducer
    }
})

store.subscribe(() => localStorage.setItem("data2", JSON.stringify(store.getState())));