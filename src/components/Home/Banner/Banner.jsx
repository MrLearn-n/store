import React from 'react'
import style from './../Home.module.css';
import bannerImg from './../../../images/banner.png';

export const Banner = () => {
    return (
        <section className={style.banner}>
            <div className={style.left}>
                <p className={style.content}>
                    NEW YEAR
                    <span>SALE</span>
                </p>
                <button className={style.more}>See more</button>
            </div>
            <div 
                className={style.right}
                style={{
                    backgroundImage: `url(${bannerImg})`
                }}
            >
                <p className={style.discount}>
                    save up to <span>50%</span> off
                </p>
            </div>
        </section>
    )
}
