import { useDispatch, useSelector } from "react-redux"
import Cart from "./components/Cart/Cart"
import Layout from "./components/Layout/Layout"
import Products from "./components/Shop/Products"
import React, { useEffect } from "react"
import { uiActions } from "./store/ui-slice"
import Notification from "./components/UI/Notification"

let isInitial = true

const FIREBASE_KEY = process.env.REACT_APP_FIREBASE_KEY

console.log(FIREBASE_KEY)

function App() {
  const dispatch = useDispatch()
  const { cartIsVisible, notification } = useSelector((state) => state.ui)
  const cart = useSelector((state) => state.cart)

  useEffect(() => {
    const sendCartData = async () => {
      dispatch(uiActions.showNotification({ status: "Pending...", title: "Sending...", message: "Sending Cart Data!" }))

      const response = await fetch(`${FIREBASE_KEY}cart.json`, {
        method: "PUT",
        body: JSON.stringify(cart),
      })

      if (!response.ok) throw new Error("Someting went Wrong!")

      dispatch(uiActions.showNotification({ status: "success", title: "Success!", message: "Sent Cart Data Successfully" }))
    }

    if (isInitial) {
      isInitial = false
      return
    }

    sendCartData().catch((error) => {
      dispatch(uiActions.showNotification({ status: "error", title: "Error!", message: "Sending Cart Data failed" }))
    })
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
