import { cartActions } from "./cart-slice"
import { uiActions } from "./ui-slice"

const FIREBASE_KEY = process.env.REACT_APP_FIREBASE_KEY

export const fetchCartData = () => async (dispatch) => {
  const fetchData = async () => {
    const response = await fetch(`${FIREBASE_KEY}cart.json`)
    if (!response.ok) throw new Error("could not cart data!")
    const responseData = await response.json()

    return responseData
  }

  try {
    const cartData = await fetchData()
    dispatch(
      cartActions.replaceCart({
        items: cartData.items || [],
        totalQuantity: cartData.totalQuantity || 0,
      })
    )
  } catch (error) {
    dispatch(uiActions.showNotification({ status: "error", title: "Error!", message: "Fetching Cart Data failed" }))
  }
}

export const sendCartData = (cart) => async (dispatch) => {
  dispatch(
    uiActions.showNotification({
      status: "Pending...",
      title: "Sending...",
      message: "Seding Cart Data!",
    })
  )

  const sendRequest = async () => {
    const response = await fetch(`${FIREBASE_KEY}cart.json`, {
      method: "PUT",
      body: JSON.stringify({
        items: cart.items,
        totalQuantity: cart.totalQuantity,
      }),
    })

    if (!response.ok) throw new Error("Someting went Wrong!")
  }

  try {
    await sendRequest()
    dispatch(uiActions.showNotification({ status: "success", title: "Success!", message: "Sent Cart Data Successfully" }))
  } catch (error) {
    dispatch(uiActions.showNotification({ status: "error", title: "Error!", message: "Sending Cart Data failed" }))
  }
}
