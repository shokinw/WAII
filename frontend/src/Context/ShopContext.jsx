import React, { createContext, useState, useEffect } from "react";
import all_product from "../Components/assets/all_product";

export const ShopContext = createContext(null);

const getDefaultCart = () => {
    let cart = {};
    for (let index = 0; index < all_product.length; index++) {
        cart[all_product[index].id] = 0; // ✅ use product ID, not index
    }
    return cart;
};

const ShopContextProvider = (props) => {
    const [cartItems, setCartItems] = useState(getDefaultCart());

    const addToCart = (itemId) => {
        setCartItems((prev) => ({
            ...prev,
            [itemId]: prev[itemId] + 1
        }));
    };

    const removeFromCart = (itemId) => {
        setCartItems((prev) => ({
            ...prev,
            [itemId]: prev[itemId] - 1
        }));
    };

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                const itemInfo = all_product.find((product) => product.id === Number(item));
                if (itemInfo) {
                    const numericPrice = Number(String(itemInfo.new_price).replace(/[^0-9.]/g, "")) || 0;
                    totalAmount += numericPrice * cartItems[item];
                }
            }
        }
        return totalAmount;
    };

    const getTotalCartItems=()=>{
        let totalItem =0;
        for(const item in cartItems)
        {
            if(cartItems[item]>0){
                totalItem += cartItems[item];
            }
        }
        return totalItem;
    }

    // Debugging state changes (optional)
    useEffect(() => {
        console.log("Cart updated:", cartItems);
    }, [cartItems]);

    const contextValue = {
        getTotalCartItems,
        getTotalCartAmount,
        all_product,
        cartItems,
        addToCart,
        removeFromCart
    };

    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    );
};

export default ShopContextProvider;
