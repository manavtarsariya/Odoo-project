// import { takeLatest, put,  call } from "redux-saga/effects";
// import { loginRequest, loginSuccess, loginFailure } from "./authSlice";
// import { toast } from "react-toastify"
// import { loginUser } from "../../api/auth.service";

// function* loginWorker(action) {



//   try {
    

//     // Call your backend API
//     console.log(action.payload)
//     const res = yield call(loginUser, action.payload);

//     // Assuming backend returns { success: true, data: { user info } }
//     if (res.data.success) {

//       yield put(loginSuccess(res.data.data.user));
//       toast.success("Login successful");

//     } else {
//       throw res.data.message || "Login failed";
//     }
//   } catch (error) {
   
//     console.log(error)

//     const errorMsg = error?.response?.data?.message || error.message || "Login Failed";
//     yield put(loginFailure(errorMsg));
//     toast.error(errorMsg);

//   }
// }


// // try {
// //   const { email, password } = action.payload;
// //   yield delay(1000);

// //   if (email === "admin123@gmail.com" && password === "Admin@123") {
// //     yield put(
// //       loginSuccess({
// //         id: "1",
// //         name: "Admin",
// //         email,
// //         role: "admin",
// //       })
// //     );
// //   } else if (email === "user123@gmail.com" && password === "User@123") {
// //     yield put(
// //       loginSuccess({
// //         id: "2",
// //         name: "User",
// //         email,
// //         role: "user",
// //       })
// //     );
// //   } else {
// //     throw "Invalid email or password";
// //   }
// // } catch (error) {
// //   yield put(loginFailure(error));
// // }


// export function* authSaga() {
//   yield takeLatest(loginRequest.type, loginWorker);
// }