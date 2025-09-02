import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import invoiceReducer from "../features/invoices/invoiceSlice";
import uiReducer from "../features/ui/uiSlice";
import storage from "redux-persist/lib/storage";
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import { apiClient } from "./api-client";

// Persist config
const persistConfig = {
  key: "root",
  storage,
  blacklist: [apiClient.reducerPath], // Do not persist RTK Query cache
  // Uncomment below to enable encryption
  // transforms: [
  //   encryptTransform({
  //     secretKey: import.meta.env.VITE_REDUX_PERSIST_SECRET_KEY,
  //     onError: (error) => console.error('Encryption error:', error),
  //   }),
  // ],
};

// Root reducer
const rootReducer = combineReducers({
  [apiClient.reducerPath]: apiClient.reducer,
  auth: authReducer,
  invoice: invoiceReducer,
  ui: uiReducer,
});

// Persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Actions to ignore in serializable check
const reduxPersistActions = [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER];

// Configure store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: reduxPersistActions,
      },
    }).concat(apiClient.middleware),
});

// Persistor
export const persistor = persistStore(store);
