import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { toggleCart, removeItem, incrementItem, decrementItem } from '../Store/Slices/CartSlices';
import Header from '../Components/Header';


const Shop = () => {



    const { isCartOpen, cartItems } = useSelector((state) => state.cart);


    const dispatch = useDispatch();


    const handleCloseCart = (close) => {
        dispatch(toggleCart(close));
    };


    const handleRemove = (itemId) => {
        dispatch(removeItem(itemId));
    };


    const handleIncrement = (itemId) => {
        dispatch(incrementItem(itemId));
    };

    const handleDecrement = (itemId) => {
        dispatch(decrementItem(itemId));
    };


    // disable the body-scroll when the Cart is open
    // useEffect(() => {
    //   const docBody = document.body;

    //   isCartOpen ? (
    //     docBody.classList.add('overflow_hide')
    //   ) : (
    //     docBody.classList.remove('overflow_hide')
    //   );

    // }, [isCartOpen]);


    const cartQuantity = cartItems.length;

    const cartTotal = cartItems.map(item => item.price * item.quantity).reduce((prevValue, currValue) => prevValue + currValue, 0);

    return (
        <div>
            <Header />
            <h1>This is Shop Page</h1>
            <div className="cart_body">
                {
                    cartQuantity === 0 ? (
                        <h2>Cart is empty</h2>
                    ) : (
                        cartItems.map(item => {
                            const { id, img, title, price, quantity } = item;
                            const itemTotal = price * quantity;

                            return (
                                <div className="cart_items" key={id}>
                                    <figure className="cart_items_img">
                                        <img src={img} alt="product-img" />
                                    </figure>

                                    <div className="cart_items_info">
                                        <h4>{title}</h4>
                                        <h3 className="price">₹ {itemTotal.toLocaleString()}</h3>
                                    </div>

                                    <div className="cart_items_quantity">
                                        <span onClick={() => handleDecrement(id)}>&#8722;</span>
                                        <b>{quantity}</b>
                                        <span onClick={() => handleIncrement(id)}>&#43;</span>
                                    </div>

                                    <div
                                        title="Remove Item"
                                        className="cart_items_delete"
                                        onClick={() => handleRemove(id)}
                                    >
                                        <span>&times;</span>
                                    </div>
                                </div>
                            );
                        })
                    )
                }
            </div>

            <div className="cart_foot">
                <h3>
                    <small>Total:</small>
                    <b>₹ {cartTotal.toLocaleString()}</b>
                </h3>

                <button
                    type="button"
                    className="checkout_btn"
                    disabled={cartQuantity === 0}
                >
                    Checkout
                </button>
            </div>
        </div>
    )
}

export default Shop