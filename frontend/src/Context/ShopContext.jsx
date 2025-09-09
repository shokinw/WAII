import React, { createContext, useState, useEffect } from "react";
import all_product from "../Components/assets/all_product";

export const ShopContext = createContext(null);

// Initialize cart with product IDs
const getDefaultCart = () => {
    let cart = {};
    for (let index = 0; index < all_product.length; index++) {
        cart[all_product[index].id] = 0;
    }
    return cart;
};

// Initialize sizes per product
const getDefaultSizes = () => {
    let sizes = {};
    for (let index = 0; index < all_product.length; index++) {
        sizes[all_product[index].id] = all_product[index].sizes ? all_product[index].sizes[0] : "N/A";
    }
    return sizes;
};

const ShopContextProvider = (props) => {
    const [cartItems, setCartItems] = useState(getDefaultCart());
    const [cartSizes, setCartSizes] = useState(getDefaultSizes()); // store selected size

    // Add 1 item to cart
    const addToCart = (itemId) => {
        setCartItems(prev => ({
            ...prev,
            [itemId]: prev[itemId] + 1
        }));
    };

    // Remove 1 item from cart
    const removeFromCart = (itemId) => {
        setCartItems(prev => ({
            ...prev,
            [itemId]: prev[itemId] > 0 ? prev[itemId] - 1 : 0
        }));
    };

    // Update quantity directly
    const updateCartQuantity = (itemId, qty) => {
        setCartItems(prev => ({
            ...prev,
            [itemId]: Number(qty)
        }));
    };

    // Select product size
    const selectSize = (itemId, size) => {
        setCartSizes(prev => ({
            ...prev,
            [itemId]: size
        }));
    };

    // Clear cart after checkout
    const clearCart = () => {
        setCartItems(getDefaultCart());
        setCartSizes(getDefaultSizes());
    };

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                const itemInfo = all_product.find(product => product.id === Number(item));
                if (itemInfo) {
                    const numericPrice = Number(String(itemInfo.new_price).replace(/[^0-9.]/g, "")) || 0;
                    totalAmount += numericPrice * cartItems[item];
                }
            }
        }
        return totalAmount;
    };

    const getTotalCartItems = () => {
        let totalItem = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                totalItem += cartItems[item];
            }
        }
        return totalItem;
    };

    useEffect(() => {
        console.log("Cart updated:", cartItems);
        console.log("Sizes updated:", cartSizes);
    }, [cartItems, cartSizes]);

    const contextValue = {
        cartItems,
        cartSizes,
        all_product,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        selectSize,
        clearCart,
        getTotalCartAmount,
        getTotalCartItems
    };

    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    );
};

export default ShopContextProvider;
