import React from 'react';
import { Link } from 'react-router-dom';
import style from './Products.module.css';


export const Products = ({title, styles = {}, products = [], amount}) => {
    const list = products.filter((_, i) => i < amount);

    return (
        <section className={style.products}>
            <h2>{title}</h2>
            <div className={style.list}>
                {list.map(({ id, title, price, images, category: {name: categ} }) => (
                    <Link to={`/products/${id}`}  key={id} className={style.product}>
                        <div 
                            className={style.image} 
                            style={{
                                backgroundImage: `url(${images[0]})`
                            }}
                        />

                        <div className={style.wrapper}>
                            <h3 className={style.title}>{title}</h3>
                            <div className={style.cat}>{categ}</div>
                            <div className={style.info}>
                                <div className={style.prices}>
                                    <div className={style.price}>{price}$</div>
                                    <div className={style.oldPrice}>{Math.floor(price * 0.5)}$</div>
                                </div>
                                <div className={style.purchases}>
                                    {Math.floor(Math.random() * 20 + 5)} purchases
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    )
}
