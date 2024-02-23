import React, { useState, useEffect } from "react";
import "./Cart.css";

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [user, setUser] = useState(null);
  const [totalCost, setTotalCost] = useState(0);

  useEffect(() => {
    // Function to calculate the total cost
    const calculateTotalCost = () => {
      const total = cartItems.reduce(
        (acc, item) => acc + item.quantity * item.bikePrice,
        0
      );
      setTotalCost(total);
    };

    // Calculate total cost whenever cart items change
    calculateTotalCost();
  }, [cartItems]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");

        if (token) {
          // Fetch user details
          const userResponse = await fetch("http://localhost:5000/getusers", {
            headers: {
              Authorization: token,
            },
          });
          const userData = await userResponse.json();

          if (userData.status === "ok") {
            setUser(userData.user);

            // Fetch cart items for the user
            const cartItemsResponse = await fetch(
              `http://localhost:5000/get-cart-items/${userData.user.email}`,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );

            if (cartItemsResponse.ok) {
              const cartItemsData = await cartItemsResponse.json();
              setCartItems(cartItemsData.cartItems);
            } else {
              console.error("Error fetching cart items");
            }
          }
        }
      } catch (error) {
        console.error(error);
      }
    };

    // Fetch user details and cart items when the component mounts
    fetchData();
  }, []);

  const handleAdd = async (bikeId) => {
    try {
      const token = localStorage.getItem("token");

      if (token) {
        const response = await fetch(
          `http://localhost:5000/handleadd/${bikeId}/${user.email}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.ok) {
          // Fetch updated cart items
          const updatedCartResponse = await fetch(
            `http://localhost:5000/get-cart-items/${user.email}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          if (updatedCartResponse.ok) {
            const updatedCartData = await updatedCartResponse.json();
            setCartItems(updatedCartData.cartItems);
          } else {
            console.error("Error fetching updated cart items");
          }
        } else {
          console.error("Error updating item count");
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleRemove = async (bikeId) => {
    try {
      const token = localStorage.getItem("token");

      if (token) {
        const response = await fetch(
          `http://localhost:5000/handlesubtract/${bikeId}/${user.email}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.ok) {
          // Fetch updated cart items
          const updatedCartResponse = await fetch(
            `http://localhost:5000/get-cart-items/${user.email}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          if (updatedCartResponse.ok) {
            const updatedCartData = await updatedCartResponse.json();
            setCartItems(updatedCartData.cartItems);
          } else {
            console.error("Error fetching updated cart items");
          }
        } else {
          console.error("Error updating item count");
        }
      }
    } catch (error) {
      console.error(error);
    }
  };
  const handleDeleteItem = async (bikeId) => {
    try {
      const token = localStorage.getItem("token");
  
      if (token) {
        const response = await fetch(
          `http://localhost:5000/remove-item/${bikeId}/${user.email}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
  
        if (response.ok) {
          // Remove the deleted item from the cartItems state directly
          setCartItems((prevCartItems) =>
            prevCartItems.filter((item) => item.bikeId !== bikeId)
          );
        } else {
          console.error("Error deleting item");
        }
      }
    } catch (error) {
      console.error(error);
    }
  };
  
  return (
    <div className="cart-container">
      {user ? (
        <div>
          <h3>Cart Items</h3>
          {cartItems.map((item, index) => (
            <div key={item.bikeId} className="cart-item">
              <div className="image-container">
                <img
                  src={`http://localhost:5000/images/${item.bikePicture}`}
                  alt="Product Image"
                />
              </div>
              <div className="details-container">
                <p className="bike-name">{item.bikeName}</p>
                <p className="bike-name">
                  <pre
                    style={{
                      display: "inline",
                      fontSize: "24px",
                      fontWeight: "bold",
                    }}
                  >
                    ₹
                  </pre>
                  {item.bikePrice}
                </p>
                <div>
                  <button
                    className="quantity-button"
                    onClick={() => handleRemove(item.bikeId)}
                  >
                    -
                  </button>
                  <span className="quantity-display">{item.quantity}</span>
                  <button
                    className="quantity-button"
                    onClick={() => handleAdd(item.bikeId)}
                  >
                    +
                  </button>
                  <button
                    className="delete-button"
                    onClick={() => handleDeleteItem(item.bikeId)}
                  >
                    Delete
                  </button>
                </div>
                
              </div>
            </div>
          ))}
          <div className="total-cost">
            <p>Total Cost: ₹{totalCost}</p>
          </div>
        </div>
      ) : (
        <p>Nothing in cart</p>
      )}
    </div>
  );
}

export default Cart;
