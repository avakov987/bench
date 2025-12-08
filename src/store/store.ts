import { configureStore, createSlice } from '@reduxjs/toolkit';

export type TestState = {
  value: number
}

const initialState: TestState = {
  value: 0
}

const testSlice = createSlice({
  name: 'test',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    reset: (state) => {
      state.value = 0;
    },
  },
});

const testReducer = testSlice.reducer

const rerenderSlice = createSlice({
  name: 'rerender',
  initialState: {
    timestamp: Date.now()
  },
  reducers: {
    rerender: (state) => {
      state.timestamp = Date.now();
    }
  },
});

const rerenderReducer = rerenderSlice.reducer

export const { rerender } = rerenderSlice.actions;
export default rerenderSlice.reducer;

export const { increment, decrement, reset } = testSlice.actions;

export const store = configureStore({
  reducer: {
    test: testReducer,
    rerender: rerenderReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;