import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItemToCart, removeItemFromCart } from '../../store/user/userSlice';
import style from './Cart.module.css';


export const Cart = () => {
    const dispatch = useDispatch();
    const { cart } = useSelector(({ user }) => user);

    const changeQuantity = (item, quantity) => {
        dispatch(addItemToCart({...item, quantity}))
    };

    const removeItem = (id) => {
        dispatch(removeItemFromCart(id))
    };

    const sumBy = (arr) => (
        arr.reduce((prev, cur) => prev + cur, 0)
    );

    return (
        <section className={style.cart}>
            <h2 className={style.title}>Your cart</h2>

            {!cart.length ? (
                <div className={style.empty}>Here is empty</div>
            ) : (
                <>
                    <div className={style.list}>
                        {cart.map(item => {
                            const { title, category, images, price, id, quantity } = item;

                            return (
                                <div className={style.item} key={id}>
                                    <div
                                        className={style.image}
                                        style={{
                                            backgroundImage: `url(${images[0]})`
                                        }}
                                    />

                                    <div className={style.info}>
                                        <h3 className={style.name}>{title}</h3>
                                        <div className={style.category}>{category.name}</div>
                                    </div>

                                    <div className={style.price}>{price}</div>

                                    <div className={style.quantity}>
                                        <div
                                            className={style.minus}
                                            onClick={() => changeQuantity(item, Math.max(1, quantity - 1))}
                                        >
                                            <svg className="icon">
                                                <use xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#minus`} />
                                            </svg>
                                        </div>

                                        <span>{quantity}</span>

                                        <div
                                            className={style.plus}
                                            onClick={() => changeQuantity(item, Math.max(1, quantity + 1))}
                                        >
                                            <svg className="icon">
                                                <use xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#plus`} />
                                            </svg>
                                        </div>
                                    </div>

                                    <div className={style.total}>{price * quantity}$</div>

                                    <div
                                        className={style.close}
                                        onClick={() => removeItem(item.id)}
                                    >
                                        <svg className="icon">
                                            <use xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#close`} />
                                        </svg>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    <div className={style.actions}>
                        <div className={style.total}>
                            TOTAL PRICE: {" "}
                            <span>
                                {sumBy(cart.map(({ quantity, price }) => 

                                    quantity * price
                                    
                                ))}$
                            </span>
                        </div>

                        <button className={style.proceed}>Proceed to checkout</button>
                    </div>
                </>
            )}
        </section>
    );
};
