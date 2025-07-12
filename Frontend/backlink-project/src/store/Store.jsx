
import {configureStore} from "@reduxjs/toolkit"
import authSlice from "./Auth.Store"
import orderSlice from "../store/Order"

const store = configureStore({
    reducer:{
           auth: authSlice,
           order: orderSlice
    }
})

export default store