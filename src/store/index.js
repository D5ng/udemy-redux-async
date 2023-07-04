import cartSlice from "./cart-slice"
import uiSlice from "./ui-slice"
import { configureStore } from "@reduxjs/toolkit"

const store = configureStore({
  reducer: {
    cart: cartSlice,
    ui: uiSlice,
  },
})

export default store
