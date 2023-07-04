import { useDispatch, useSelector } from "react-redux"
import Cart from "./components/Cart/Cart"
import Layout from "./components/Layout/Layout"
import Products from "./components/Shop/Products"
import React, { useEffect } from "react"
import { uiActions } from "./store/ui-slice"
import Notification from "./components/UI/Notification"
import { sendCartData } from "./store/cart-slice"

let isInitial = true

const FIREBASE_KEY = process.env.REACT_APP_FIREBASE_KEY

function App() {
  const dispatch = useDispatch()
  const { cartIsVisible, notification } = useSelector((state) => state.ui)
  const cart = useSelector((state) => state.cart)

  useEffect(() => {
    if (isInitial) {
      isInitial = false
      return
    }

    dispatch(sendCartData(cart))
  }, [cart, dispatch])
  return (
    <React.Fragment>
      {notification && <Notification status={notification.status} title={notification.title} message={notification.message} />}
      <Layout>
        {cartIsVisible && <Cart />}
        <Products />
      </Layout>
    </React.Fragment>
  )
}

export default App
