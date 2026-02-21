import { configureStore, combineReducers } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";

import authReducer from "../features/auth/authSlice";
import storage from "redux-persist/lib/storage";
// import productReducer from "../features/products/productSlice";
// import wishlistReducer from "../features/wishlist/wishlistSlice";

// import storage from "redux-persist/lib/storage";
// import refreshReducer from '../features/refresh/refreshSlice';
// import syncReducer from '../features/sync/syncSlice';

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

import rootSaga from "./rootSaga";

// 1️⃣ Create saga middleware
const sagaMiddleware = createSagaMiddleware();

// 2️⃣ Root reducer
const rootReducer = combineReducers({
  auth: authReducer,
//   products: productReducer,
//   wishlist: wishlistReducer,
//   refresh: refreshReducer,
//   sync: syncReducer, 
});

// 3️⃣ Persist config
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"],
};

// 4️⃣ Persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// 5️⃣ Store
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: false, // ❗ disable thunk when using saga
      serializableCheck: {
        ignoredActions: [
          FLUSH,
          REHYDRATE,
          PAUSE,
          PERSIST,
          PURGE,
          REGISTER,
        ],
      },
    }).concat(sagaMiddleware),
});

// 6️⃣ Run saga
sagaMiddleware.run(rootSaga);

// 7️⃣ Persistor
export const persistor = persistStore(store);
export default store;