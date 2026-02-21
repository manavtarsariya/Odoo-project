import { all } from "redux-saga/effects";
// import { wishlistSaga } from "../features/wishlist/wishlistSaga";
// import { authSaga } from "../features/auth/authSaga";
// import { productSaga } from "../features/products/productSaga";
// import refreshSaga from "../features/refresh/refreshSaga";
// import syncSaga from "../features/sync/syncSaga";

export default function* rootSaga() {
    yield all([
        // authSaga(),
        //   wishlistSaga(),
        // productSaga(),
        // refreshSaga(),
        // syncSaga(),
    ]);
}