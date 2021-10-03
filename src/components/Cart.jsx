import React from "react";
import { useState, useEffect } from "react";
import { TiDeleteOutline } from "react-icons/ti";

export default function Cart({ LastAdd }) {
  const [CartShow, setCartShow] = useState(false);
  const [Cart, setCart] = useState([]);
  const userId = 1;
  //   ====
  const getCart = async () => {
    try {
      let response = await fetch(
        `${process.env.REACT_APP_URLFETCHING}/cart/${userId}`
      );
      if (response.ok) {
        let data = await response.json();
        setCart(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  //   ===
  const deleteCart = async (prodId) => {
    try {
      let response = await fetch(
        `${process.env.REACT_APP_URLFETCHING}/cart/${userId}/${prodId}`,
        { method: "" }
      );
      if (response.ok) {
        let data = await response.json();
        setCart(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // ===
  useEffect(() => {
    getCart();
  }, [LastAdd]);
  return (
    <>
      {!CartShow && (
        <button className="cart-btn" onClick={(e) => setCartShow(true)}>
          Cart
        </button>
      )}

      {CartShow && (
        <>
          <div className="carts d-flex flex-column">
            <TiDeleteOutline
              className="ml-auto mb-1"
              size="1.8rem"
              onClick={(e) => setCartShow(false)}
              style={{ cursor: "pointer", color: "teal" }}
            />
            {Cart.map((c) => (
              <div key={c.prod_qty + c.product.id} className="cart">
                <div className="d-flex justify-content-between">
                  <small>{c.product.name}</small>
                  <small>Qty:{c.prod_qty}</small>
                </div>
                <div className="d-flex justify-content-between">
                  <small>Price: {c.product.price}</small>
                  <button
                    className="deleteCart"
                    value={c.productId}
                    onClick={(e) => deleteCart(c.productId)}
                  >
                    {" "}
                    <TiDeleteOutline size="1.4rem" />
                  </button>
                </div>
              </div>
            ))}
            <div className="px-1 py-1">
              <small className="font-weight-bold">Total: </small>
            </div>
          </div>
        </>
      )}
    </>
  );
}
