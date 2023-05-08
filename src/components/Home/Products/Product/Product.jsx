import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { addItemToCart } from '../../../../store/user/userSlice';
import style from './Product.module.css';

const sizes = [4, 4.5, 5];

export const Product = (item) => {
    // console.log(item);
    const {images, title, decription, price} = item;

    const dispatch = useDispatch();
    const [currentImage, setCurrentImage] = useState();
    const [currnetSize, setCurrnetSize] = useState();

    useEffect(() => {
        if(!images.length) {
            return;
        }

        setCurrentImage(images[0]);
    }, [images])

    const addToCart = () => {
        dispatch(addItemToCart(item))
    }

    return (
        <section className={style.product}>
            <div className={style.images}>
                <div 
                    className={style.current}
                    style={{backgroundImage: `url(${currentImage})`}}
                />
                <div className={style["images-list"]}>
                    {images.map((image, i) => (
                        <div 
                            key={i}
                            className={style.image}                        
                            style={{backgroundImage: `url(${image})`}}
                            onClick={() => setCurrentImage(image)} 
                        />
                    ))}
                </div>
            </div>
            <div className={style.info}>
                <h1 className={style.title}>{title}</h1>
                <div className={style.price}>{price}$</div>
                <div className={style.color}>
                    <span>Color:</span> Green
                </div>
                <div className={style.sizes}>
                    <span>Sizes:</span>
                    <div className={style.list}>
                        {sizes.map((size) => (
                            <div 
                                key={size}
                                className={`${style.size} ${currnetSize === size ? style.active : ""}`}
                                onClick={() => setCurrnetSize(size)}
                            >
                                {size}
                            </div>
                        ))}
                    </div>
                </div>
                <p className={style.decription}>{decription}</p>
                <div className={style.actions}>
                    <button onClick={addToCart} className={style.add}>Add to cart</button>
                    <button className={style.favourite}>Add to favourite</button>
                </div>
                <div className={style.bottom}>
                    <div className={style.purchase}>19 people purchased</div>
                    <Link to='/'>
                        Return to store
                    </Link>
                </div>
            </div>
        </section>
    )
}
