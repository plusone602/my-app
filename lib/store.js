import { configureStore } from '@reduxjs/toolkit';
import counter from './features/counterSlice';

export const store = configureStore({
  reducer: { counter },
});
